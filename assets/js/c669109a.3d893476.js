(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{107:function(e,a,t){"use strict";t.r(a),t.d(a,"frontMatter",(function(){return r})),t.d(a,"metadata",(function(){return c})),t.d(a,"toc",(function(){return p})),t.d(a,"default",(function(){return o}));var n=t(3),m=t(7),s=(t(0),t(120)),r={id:"strongly_connected_components",title:"Strongly Connected Components"},c={unversionedId:"benchmarks/connectivity/strongly_connected_components",id:"benchmarks/connectivity/strongly_connected_components",isDocsHomePage:!1,title:"Strongly Connected Components",description:"Problem Specification",source:"@site/docs/benchmarks/connectivity/strongly_connected_components.md",slug:"/benchmarks/connectivity/strongly_connected_components",permalink:"/gbbs/docs/benchmarks/connectivity/strongly_connected_components",version:"current",sidebar:"docs",previous:{title:"Spanning Forest",permalink:"/gbbs/docs/benchmarks/connectivity/spanning_forest"},next:{title:"Maximal Independent Set",permalink:"/gbbs/docs/benchmarks/covering/maximal_independent_set"}},p=[{value:"Problem Specification",id:"problem-specification",children:[]},{value:"Algorithm Implementations",id:"algorithm-implementations",children:[]},{value:"Cost Bounds",id:"cost-bounds",children:[]},{value:"References",id:"references",children:[]}],b={toc:p};function o(e){var a=e.components,t=Object(m.a)(e,["components"]);return Object(s.b)("wrapper",Object(n.a)({},b,t,{components:a,mdxType:"MDXLayout"}),Object(s.b)("h2",{id:"problem-specification"},"Problem Specification"),Object(s.b)("h4",{id:"input"},"Input"),Object(s.b)("p",null,Object(s.b)("span",{parentName:"p",className:"math math-inline"},Object(s.b)("span",{parentName:"span",className:"katex"},Object(s.b)("span",{parentName:"span",className:"katex-mathml"},Object(s.b)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},Object(s.b)("semantics",{parentName:"math"},Object(s.b)("mrow",{parentName:"semantics"},Object(s.b)("mi",{parentName:"mrow"},"G"),Object(s.b)("mo",{parentName:"mrow"},"="),Object(s.b)("mo",{parentName:"mrow",stretchy:"false"},"("),Object(s.b)("mi",{parentName:"mrow"},"V"),Object(s.b)("mo",{parentName:"mrow",separator:"true"},","),Object(s.b)("mi",{parentName:"mrow"},"E"),Object(s.b)("mo",{parentName:"mrow",stretchy:"false"},")")),Object(s.b)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"G=(V, E)")))),Object(s.b)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},Object(s.b)("span",{parentName:"span",className:"base"},Object(s.b)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),Object(s.b)("span",{parentName:"span",className:"mord mathdefault"},"G"),Object(s.b)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2777777777777778em"}}),Object(s.b)("span",{parentName:"span",className:"mrel"},"="),Object(s.b)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2777777777777778em"}})),Object(s.b)("span",{parentName:"span",className:"base"},Object(s.b)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),Object(s.b)("span",{parentName:"span",className:"mopen"},"("),Object(s.b)("span",{parentName:"span",className:"mord mathdefault",style:{marginRight:"0.22222em"}},"V"),Object(s.b)("span",{parentName:"span",className:"mpunct"},","),Object(s.b)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.16666666666666666em"}}),Object(s.b)("span",{parentName:"span",className:"mord mathdefault",style:{marginRight:"0.05764em"}},"E"),Object(s.b)("span",{parentName:"span",className:"mclose"},")"))))),", an undirected graph on ",Object(s.b)("span",{parentName:"p",className:"math math-inline"},Object(s.b)("span",{parentName:"span",className:"katex"},Object(s.b)("span",{parentName:"span",className:"katex-mathml"},Object(s.b)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},Object(s.b)("semantics",{parentName:"math"},Object(s.b)("mrow",{parentName:"semantics"},Object(s.b)("mi",{parentName:"mrow"},"n")),Object(s.b)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"n")))),Object(s.b)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},Object(s.b)("span",{parentName:"span",className:"base"},Object(s.b)("span",{parentName:"span",className:"strut",style:{height:"0.43056em",verticalAlign:"0em"}}),Object(s.b)("span",{parentName:"span",className:"mord mathdefault"},"n")))))," vertices. The input graph can\neither be weighted or unweighted."),Object(s.b)("h4",{id:"output"},"Output"),Object(s.b)("p",null,Object(s.b)("span",{parentName:"p",className:"math math-inline"},Object(s.b)("span",{parentName:"span",className:"katex"},Object(s.b)("span",{parentName:"span",className:"katex-mathml"},Object(s.b)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},Object(s.b)("semantics",{parentName:"math"},Object(s.b)("mrow",{parentName:"semantics"},Object(s.b)("mi",{parentName:"mrow",mathvariant:"script"},"L")),Object(s.b)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\mathcal{L}")))),Object(s.b)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},Object(s.b)("span",{parentName:"span",className:"base"},Object(s.b)("span",{parentName:"span",className:"strut",style:{height:"0.68333em",verticalAlign:"0em"}}),Object(s.b)("span",{parentName:"span",className:"mord"},Object(s.b)("span",{parentName:"span",className:"mord mathcal"},"L")))))),", a ",Object(s.b)("a",{parentName:"p",href:"/docs/benchmarks/definitions"},"mapping")," from each\nvertex to the label of its strongly connected component."),Object(s.b)("h2",{id:"algorithm-implementations"},"Algorithm Implementations"),Object(s.b)("p",null,"We present the first implementation of the SCC algorithm from Blelloch\net al. ","[1]",".\nThe code for our implementation is available\n",Object(s.b)("a",{parentName:"p",href:"https://github.com/ldhulipala/gbbs/tree/master/benchmarks/StronglyConnectedComponents/RandomGreedyBGSS16"},"here"),"."),Object(s.b)("h2",{id:"cost-bounds"},"Cost Bounds"),Object(s.b)("p",null,"The algorithm runs in ",Object(s.b)("span",{parentName:"p",className:"math math-inline"},Object(s.b)("span",{parentName:"span",className:"katex"},Object(s.b)("span",{parentName:"span",className:"katex-mathml"},Object(s.b)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},Object(s.b)("semantics",{parentName:"math"},Object(s.b)("mrow",{parentName:"semantics"},Object(s.b)("mi",{parentName:"mrow"},"O"),Object(s.b)("mo",{parentName:"mrow",stretchy:"false"},"("),Object(s.b)("mi",{parentName:"mrow"},"m"),Object(s.b)("mi",{parentName:"mrow"},"log"),Object(s.b)("mo",{parentName:"mrow"},"\u2061"),Object(s.b)("mi",{parentName:"mrow"},"n"),Object(s.b)("mo",{parentName:"mrow",stretchy:"false"},")")),Object(s.b)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"O(m\\log n)")))),Object(s.b)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},Object(s.b)("span",{parentName:"span",className:"base"},Object(s.b)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),Object(s.b)("span",{parentName:"span",className:"mord mathdefault",style:{marginRight:"0.02778em"}},"O"),Object(s.b)("span",{parentName:"span",className:"mopen"},"("),Object(s.b)("span",{parentName:"span",className:"mord mathdefault"},"m"),Object(s.b)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.16666666666666666em"}}),Object(s.b)("span",{parentName:"span",className:"mop"},"lo",Object(s.b)("span",{parentName:"span",style:{marginRight:"0.01389em"}},"g")),Object(s.b)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.16666666666666666em"}}),Object(s.b)("span",{parentName:"span",className:"mord mathdefault"},"n"),Object(s.b)("span",{parentName:"span",className:"mclose"},")")))))," expected work and\n",Object(s.b)("span",{parentName:"p",className:"math math-inline"},Object(s.b)("span",{parentName:"span",className:"katex"},Object(s.b)("span",{parentName:"span",className:"katex-mathml"},Object(s.b)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},Object(s.b)("semantics",{parentName:"math"},Object(s.b)("mrow",{parentName:"semantics"},Object(s.b)("mi",{parentName:"mrow"},"O"),Object(s.b)("mo",{parentName:"mrow",stretchy:"false"},"("),Object(s.b)("mrow",{parentName:"mrow"},Object(s.b)("mi",{parentName:"mrow",mathvariant:"sans-serif"},"d"),Object(s.b)("mi",{parentName:"mrow",mathvariant:"sans-serif"},"i"),Object(s.b)("mi",{parentName:"mrow",mathvariant:"sans-serif"},"a"),Object(s.b)("mi",{parentName:"mrow",mathvariant:"sans-serif"},"m")),Object(s.b)("mo",{parentName:"mrow",stretchy:"false"},"("),Object(s.b)("mi",{parentName:"mrow"},"G"),Object(s.b)("mo",{parentName:"mrow",stretchy:"false"},")"),Object(s.b)("mi",{parentName:"mrow"},"log"),Object(s.b)("mo",{parentName:"mrow"},"\u2061"),Object(s.b)("mi",{parentName:"mrow"},"n"),Object(s.b)("mo",{parentName:"mrow",stretchy:"false"},")")),Object(s.b)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"O(\\mathsf{diam}(G) \\log n)")))),Object(s.b)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},Object(s.b)("span",{parentName:"span",className:"base"},Object(s.b)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),Object(s.b)("span",{parentName:"span",className:"mord mathdefault",style:{marginRight:"0.02778em"}},"O"),Object(s.b)("span",{parentName:"span",className:"mopen"},"("),Object(s.b)("span",{parentName:"span",className:"mord"},Object(s.b)("span",{parentName:"span",className:"mord mathsf"},"d"),Object(s.b)("span",{parentName:"span",className:"mord mathsf"},"i"),Object(s.b)("span",{parentName:"span",className:"mord mathsf"},"a"),Object(s.b)("span",{parentName:"span",className:"mord mathsf"},"m")),Object(s.b)("span",{parentName:"span",className:"mopen"},"("),Object(s.b)("span",{parentName:"span",className:"mord mathdefault"},"G"),Object(s.b)("span",{parentName:"span",className:"mclose"},")"),Object(s.b)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.16666666666666666em"}}),Object(s.b)("span",{parentName:"span",className:"mop"},"lo",Object(s.b)("span",{parentName:"span",style:{marginRight:"0.01389em"}},"g")),Object(s.b)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.16666666666666666em"}}),Object(s.b)("span",{parentName:"span",className:"mord mathdefault"},"n"),Object(s.b)("span",{parentName:"span",className:"mclose"},")")))))," depth w.h.p. A detailed proof of the\nalgorithm's theoretical costs can be found in ","[1]","."),Object(s.b)("h2",{id:"references"},"References"),Object(s.b)("p",null,"[1]"," Guy Blelloch, Yan Gu, Julian Shun, and Yihan Sun",Object(s.b)("br",null),"\n",Object(s.b)("em",{parentName:"p"},"Parallelism in Randomized Incremental Algorithms"),Object(s.b)("br",null),"\nProceedings of the ACM Symposium on Parallelism in Algorithms and Architectures (SPAA), pp. 467-478, 2016."))}o.isMDXComponent=!0},120:function(e,a,t){"use strict";t.d(a,"a",(function(){return i})),t.d(a,"b",(function(){return O}));var n=t(0),m=t.n(n);function s(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function r(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function c(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?r(Object(t),!0).forEach((function(a){s(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function p(e,a){if(null==e)return{};var t,n,m=function(e,a){if(null==e)return{};var t,n,m={},s=Object.keys(e);for(n=0;n<s.length;n++)t=s[n],a.indexOf(t)>=0||(m[t]=e[t]);return m}(e,a);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)t=s[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(m[t]=e[t])}return m}var b=m.a.createContext({}),o=function(e){var a=m.a.useContext(b),t=a;return e&&(t="function"==typeof e?e(a):c(c({},a),e)),t},i=function(e){var a=o(e.components);return m.a.createElement(b.Provider,{value:a},e.children)},l={inlineCode:"code",wrapper:function(e){var a=e.children;return m.a.createElement(m.a.Fragment,{},a)}},N=m.a.forwardRef((function(e,a){var t=e.components,n=e.mdxType,s=e.originalType,r=e.parentName,b=p(e,["components","mdxType","originalType","parentName"]),i=o(t),N=n,O=i["".concat(r,".").concat(N)]||i[N]||l[N]||s;return t?m.a.createElement(O,c(c({ref:a},b),{},{components:t})):m.a.createElement(O,c({ref:a},b))}));function O(e,a){var t=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var s=t.length,r=new Array(s);r[0]=N;var c={};for(var p in a)hasOwnProperty.call(a,p)&&(c[p]=a[p]);c.originalType=e,c.mdxType="string"==typeof e?e:n,r[1]=c;for(var b=2;b<s;b++)r[b]=t[b];return m.a.createElement.apply(null,r)}return m.a.createElement.apply(null,t)}N.displayName="MDXCreateElement"}}]);