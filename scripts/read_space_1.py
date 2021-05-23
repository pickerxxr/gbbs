import os
import sys
import signal
import time
import subprocess

def main():
  # Read each file in Test 1; separate LDS and Approx KCore
  # store average of average error, max of average error, total batch times, and average / max batch time
  # this is stored per epsilon and delta pair
  # Configured for Test 1 (1 round)
  #program_dir = "../benchmarks/"
  #programs = [ "KCore/ApproximateKCore/KCore"]# , "KCore/JulienneDBS17/KCore"]
  #is_dynamic = [True, False, False]
  #files = ["dblp_edges", "livejournal_edges"]
  program_pres = ["plds"]
  pres = "dblp"
  #empty = "empty_h"
  num_rounds = 3
  e = [0.2, 0.4, 0.8, 1.6, 3.2, 6.4]
  d = [3, 6, 12, 24, 48, 96]
  batch_sizes = [100000] #[1000, 10000, 100000, 1000000, 10000000]#[100, 1000, 10000,100000, 1000000, 10000000]
  num_workers = [60]#[1, 2, 4, 8, 16, 32, 60]
  #read_dir = "/home/jeshi/dynamic_graph/"
  write_dir = "/home/qliu19/exp-1-space/"
  actual_batch_size = 100000
  #for b_idx, b in enumerate(batch_sizes):
  for p_idx, p in enumerate(program_pres):
    for b_idx, b in enumerate(batch_sizes):
        for eps in e:
            for delta in d:
                read_filename = write_dir + str(p) + "_" + pres + "_" + str(eps) + "_" + str(delta) + "_" + str(b) + "_60.out"
                #num_lines = sum(1 for line in open(read_dir + pres + "_edges"))
                # if you are dynamic...round changes when you see ### Application...batch changes when you see batch running time
                # if you are static...
                best_avg = 0
                best_approx_avg = 0
                max_time = 0
                best_total = 0
                best_approx_max = 0
                best_size = 0
                with open(read_filename, "r") as read_file:
                    cur_avg = 0
                    cur_max = 0
                    cur_total = 0
                    num_iterations = 0
                    total_error = 0
                    max_error = 0
                    max_size = 0
                    for line in read_file:
                        line = line.strip()
                        if "------------" in line and cur_max > 0:
                            cur_avg = best_total / num_iterations
                            avg_error = total_error/num_iterations
                            if best_avg == 0 or cur_avg < best_avg:
                                best_avg = cur_avg
                                max_time = cur_max
                                best_total = cur_total
                                best_approx_avg = avg_error
                                best_approx_max = max_error
                                best_size = max_size
                            cur_total = 0
                            cur_avg = 0
                            cur_max = 0
                            num_iterations = 0
                            total_error = 0
                            max_error = 0
                            max_size = 0
                        else:
                            split = [x.strip() for x in line.split(':')]
                            if split[0].startswith("### Insertion"):
                                cur_total += float(split[1])
                                if float(split[1]) > cur_max:
                                    cur_max = float(split[1])
                                num_iterations += 1
                            if split[0].startswith("### Per Vertex Average"):
                                total_error += float(split[1])
                            if split[0].startswith("### Per Vertex Max"):
                                if float(split[1]) > max_error:
                                    max_error = float(split[1])
                            if "Size" in split[0]:
                                if float(split[1]) > max_size:
                                    max_size = float(split[1])
                    cur_avg = best_total / num_iterations
                    avg_error = total_error/num_iterations
                    if best_avg == 0 or cur_avg < best_avg:
                        best_avg = cur_avg
                        max_time = cur_max
                        best_total = cur_total
                        best_approx_avg = avg_error
                        best_approx_max = max_error
                        best_size = max_size
                print(str(b), end = ",")
                print(str(eps), end = ",")
                print(str(delta), end = ",")
                print(str(best_size), end = ",")
                print(str(best_total), end = ",")
                print(str(best_avg), end = ",")
                print(str(max_time), end = "\n")

if __name__ == "__main__":
  main()
