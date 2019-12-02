#pragma once
#include "benchmarks/Connectivity/Framework/framework.h"

/* ************************* Benchmark Utils *************************** */

template<typename F>
double reduce(std::vector<double> V, F f) {
  double x = V[0];
  for (size_t i=1; i < V.size(); i++) x = f(x,V[i]);
  return x;
}

double median(std::vector<double> V) {
  std::sort(V.begin(),V.end());
  if (V.size()%2 == 1)
    return V[V.size()/2];
  else
    return (V[V.size()/2] + V[V.size()/2 - 1])/2.0;
}

double sumf(double a, double b) {return a+ b;};
double minf(double a, double b) {return (a < b) ? a : b;};
double maxf(double a, double b) {return (a > b) ? a : b;};

template<typename Graph, typename F>
auto repeat(Graph& G, size_t rounds, F test, commandLine& P) {
  std::vector<double> total;
  std::vector<double> average_batch;
  std::vector<double> thput;
  for (size_t i=0; i < rounds; i++) {
    double tot, avg, thp;
#ifdef REPORT_PATH_LENGTHS
    max_pathlen.reset();
    total_pathlen.reset();
#endif
#ifdef REPORT_MAX_TRIES
    max_uf_tries.reset();
    total_uf_tries.reset();
#endif
    std::tie(tot, avg, thp) = test(G, P);
    total.push_back(tot);
    average_batch.push_back(avg);
    thput.push_back(thp);
  }
  return std::make_tuple(total, average_batch, thput);
}

template<typename Graph, typename F>
bool run_multiple(Graph& G, size_t rounds,
		  std::string name, commandLine& P, F test) {
  std::vector<double> t; /* total */
  std::vector<double> a;
  std::vector<double> tp;
  std::tie(t, a, tp) = repeat(G, rounds, test, P);

  double mint = reduce(t, minf);
  double maxt = reduce(t, maxf);
  double medt = median(t);

  double mina = reduce(a, minf);
  double maxa = reduce(a, maxf);
  double meda = median(a);

  double mintp = reduce(tp, minf);
  double maxtp = reduce(tp, maxf);
  double medtp = median(tp);

  cout << "Test = {"
       << "\"name\": \"" << name << "\"" << std::setprecision(5)
       << ", \"rounds\":" << rounds
       << ", \"med_time\":" << medt
       << ", \"min_time\":" << mint
       << ", \"max_time\":" << maxt
       << ", \"med_batch_time\":" << meda
       << ", \"min_batch_time\":" << mina
       << ", \"max_batch_time\":" << maxa
       << ", \"med_throughput\":" << medtp
       << ", \"min_throughput\":" << mintp
       << ", \"max_throughput\":" << maxtp
       << ", \"max_path_len\":" << std::to_string(max_pathlen.get_value())
       << ", \"total_path_len\":" << std::to_string(total_pathlen.get_value())
       << ", \"max_uf_tries\":" << std::to_string(max_uf_tries.get_value())
       << ", \"total_uf_tries\":" << std::to_string(total_uf_tries.get_value())
       << "}"
       << endl;
  return 1;
}

template <class Stats>
void print_cpu_stats(Stats& stats, commandLine& P) {
  std::cout <<
    "Stats = { \"ipc\":" + std::to_string(stats.get_ipc())
    + " ,\"total_cycles\":" + std::to_string(stats.get_total_cycles())
    + " ,\"l2_hit_ratio\":" + std::to_string(stats.get_l2_hit_ratio())
    + " ,\"l3_hit_ratio\":" + std::to_string(stats.get_l3_hit_ratio())
    + " ,\"l2_misses\":" + std::to_string(stats.get_l2_misses())
    + " ,\"l2_hits\":" + std::to_string(stats.get_l2_hits())
    + " ,\"l3_misses\":" + std::to_string(stats.get_l3_misses())
    + " ,\"l3_hits\":" + std::to_string(stats.get_l3_hits())
    + " ,\"throughput\":" + std::to_string(stats.get_throughput())
    + " ,\"max_path_len\":" + std::to_string(max_pathlen.get_value())
    + " ,\"total_path_len\":" + std::to_string(total_pathlen.get_value())
    + " ,\"max_uf_tries\":" + std::to_string(max_uf_tries.get_value())
    + " ,\"total_uf_tries\":" + std::to_string(total_uf_tries.get_value())
    + "}" << std::endl;
}


static timer bt;
using uchar = unsigned char;

#define time(_var,_body)    \
  bt.start();               \
  _body;		    \
  double _var = bt.stop();

/* ************************* Connectivity wrappers *************************** */
template <class S1, class S2>
inline void cc_check(S1& correct, S2& check);

namespace connectit {

  template <class Graph, class Alg, bool provides_initial_graph, bool reorder_batch>
  auto run_abstract_alg(
      Graph& G,
      size_t n,
      pbbs::sequence<incremental_update>& updates,
      size_t batch_size,
      size_t insert_to_query,
      Alg& alg) {
    /* compute initial components */
    auto parents = pbbs::sequence<uintE>(n, [&] (size_t i) { return i; });

    alg.initialize(parents);
    if constexpr (provides_initial_graph) {
      alg.template compute_components<no_sampling>(parents);
    }

    /* process batches */
    timer tt; tt.start();
    size_t m = updates.size();
    size_t n_batches = (m + batch_size - 1) / batch_size;

    std::vector<double> batch_times;
    std::cout << "Total number of updates (all batches): " << m << std::endl;
    std::cout << "Num batches. " << n_batches << std::endl;
    std::cout << "Batch size. " << batch_size << std::endl;
    size_t updates_processed = 0;
    for (size_t i=0; i<n_batches; i++) {
      size_t start = i*batch_size;
      size_t end = std::min((i+1)*batch_size, m);
      auto update = updates.slice(start, end);

      timer tt; tt.start();
      alg.template process_batch<reorder_batch>(parents, update);
      double batch_time = tt.stop();
      if (i % 10000 == 0) {
        std::cout << "Finished : " << i << " out of " << n_batches << " batches." << std::endl;
      }
      batch_times.emplace_back(batch_time);
      updates_processed += update.size();
    }
    double t = tt.stop();
    double med_batch_time = median(batch_times);

    double throughput = static_cast<double>(updates_processed) / t;
    return std::make_tuple(t, med_batch_time, throughput);
  }

} // connectit


