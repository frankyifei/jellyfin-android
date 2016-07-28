define(["browser","layoutManager","scrollStyles"],function(e,t){function n(e,t,n,o){var r=o;l||(r=o.capture),e.addEventListener(t,n,r)}function o(e,t,n,o){var r=o;l||(r=o.capture),e.removeEventListener(t,n,r)}function r(e){return null==e?String(e):"object"==typeof e||"function"==typeof e?Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase()||"object":typeof e}function i(e,t){e.preventDefault(),t&&e.stopPropagation()}function a(e){i(e,1),this.removeEventListener(e.type,a)}function s(e,t,n){return t>e?t:e>n?n:e}var l=!1;try{var d=Object.defineProperty({},"capture",{get:function(){l=!0}});window.addEventListener("test",null,d)}catch(c){}var u="sly",f=u,h=["touchstart","mousedown"],p=["mousemove","mouseup"],g=["touchmove","touchend"],v=document.implementation.hasFeature("Event.wheel","3.0")?"wheel":"mousewheel",m=["INPUT","SELECT","TEXTAREA"],y=Math.abs,w=Math.sqrt,S=Math.pow,E=Math.round,z=Math.max,L=(Math.min,function(l,d){function c(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}function u(e){$=L(F,A.horizontal?"width":"height");var t=A.scrollWidth||Math.max(U[A.horizontal?"offsetWidth":"offsetHeight"],U[A.horizontal?"scrollWidth":"scrollHeight"]);G.start=0,G.end=z(t-$,0),e||x(s(G.dest,G.start,G.end))}function L(e,t,n){var o=!0,r="width"===t?e.offsetWidth:e.offsetHeight,i=getComputedStyle(e,null),a="border-box"===i.getPropertyValue("box-sizing");if(0>=r||null==r){if((0>r||null==r)&&(r=e.style[t]),rt.test(r))return r;o=a&&(support.boxSizingReliable()||r===e.style[t]),r=parseFloat(r)||0}return r+b(e,t,n||(a?"border":"content"),o,i)}function b(e,t,n,o){for(var r=n===(o?"border":"content")?4:"width"===t?1:0,i=0;4>r;r+=2);return i}function T(e,t,n){!n&&e.scrollTo?A.horizontal?e.scrollTo(t,0):e.scrollTo(0,t):A.horizontal?e.scrollLeft=Math.round(t):e.scrollTop=Math.round(t)}function x(e,t){return et.init&&et.slidee&&A.elasticBounds?e>G.end?e=G.end+(e-G.end)/6:e<G.start&&(e=G.start+(e-G.start)/6):e=s(e,G.start,G.end),J?(_.from=G.cur,_.to=e,_.tweesing=et.tweese||et.init&&!et.slidee,_.immediate=!_.tweesing&&(t||et.init&&et.slidee||!A.speed),et.tweese=0,void(e!==G.dest&&(G.dest=e,X(_)))):void T(U,e,t)}function X(){if(J){var t=getComputedStyle(U,null).getPropertyValue("transform").match(/([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/);t&&(G.cur=-1*parseInt(A.horizontal?t[1]:t[2]));var n;_.to=E(_.to),n=A.horizontal?[{transform:"translate3d("+-E(G.cur||_.from)+"px, 0, 0)",offset:0},{transform:"translate3d("+-E(_.to)+"px, 0, 0)",offset:1}]:[{transform:"translate3d(0, "+-E(G.cur||_.from)+"px, 0)",offset:0},{transform:"translate3d(0, "+-E(_.to)+"px, 0)",offset:1}];var o=A.speed;_.immediate&&(o=A.immediateSpeed||50,e.animate||(A.immediateSpeed=0));var r={duration:o,iterations:1,fill:"both"};(!_.immediate||e.animate)&&(r.easing="ease-out");var i=U.animate(n,r);i.onfinish=function(){G.cur=_.to,document.dispatchEvent(it)}}}function Y(e){var t=document,n=[];if(!t)return n;for(var o,r,i=t.documentElement,a={clientTop:i.clientTop,clientLeft:i.clientLeft},s=t.defaultView,l={pageXOffset:s.pageXOffset,pageYOffset:s.pageYOffset},d=0,c=e.length;c>d;d++)r=e[d],o=r.getBoundingClientRect?r.getBoundingClientRect():{top:0,left:0},n[d]={top:o.top+l.pageYOffset-a.clientTop,left:o.left+l.pageXOffset-a.clientLeft};return n}function C(e,t,n){if("boolean"===r(t)&&(n=t,t=void 0),void 0===t)x(G[e],n);else{var o=q.getPos(t);o&&x(o[e],n,!0)}}function D(){for(var e=1;e<arguments.length;e++)for(var t in arguments[e])arguments[e].hasOwnProperty(t)&&(arguments[0][t]=arguments[e][t]);return arguments[0]}function O(){et.history[0]=et.history[1],et.history[1]=et.history[2],et.history[2]=et.history[3],et.history[3]=et.delta}function P(e){et.released=0,et.source=e,et.slidee="slidee"===e}function k(e){M(e,"slidee")}function M(e,t){var n="touchstart"===e.type,o="slidee"===t;et.init||!n&&W(e.target)||(!o||(n?A.touchDragging:A.mouseDragging&&e.which<2))&&(n||i(e),P(t),et.init=0,et.source=e.target,et.touch=n,et.pointer=n?e.touches[0]:e,et.initX=et.pointer.pageX,et.initY=et.pointer.pageY,et.initPos=o?G.cur:K.cur,et.start=+new Date,et.time=0,et.path=0,et.delta=0,et.locked=0,et.history=[0,0,0,0],et.pathToLock=o?n?30:10:0,n?g.forEach(function(e){document.addEventListener(e,B)}):p.forEach(function(e){document.addEventListener(e,B)}),o&&U.classList.add(A.draggedClass),o&&(nt=setInterval(O,10)))}function B(e){if(et.released="mouseup"===e.type||"touchend"===e.type,et.pointer=et.touch?e[et.released?"changedTouches":"touches"][0]:e,et.pathX=et.pointer.pageX-et.initX,et.pathY=et.pointer.pageY-et.initY,et.path=w(S(et.pathX,2)+S(et.pathY,2)),et.delta=A.horizontal?et.pathX:et.pathY,et.released||!(et.path<1)){if(!et.init){if(et.path<A.dragThreshold)return et.released?N():void 0;if(!(A.horizontal?y(et.pathX)>y(et.pathY):y(et.pathX)<y(et.pathY)))return N();et.init=1}i(e),!et.locked&&et.path>et.pathToLock&&et.slidee&&(et.locked=1,et.source.addEventListener("click",a)),et.released&&(N(),A.releaseSwing&&et.slidee&&(et.swing=(et.delta-et.history[0])/40*300,et.delta+=et.swing,et.tweese=y(et.swing)>10)),x(et.slidee?E(et.initPos-et.delta):handleToSlidee(et.initPos+et.delta))}}function N(){clearInterval(nt),et.released=!0,et.touch?g.forEach(function(e){document.removeEventListener(e,B)}):p.forEach(function(e){document.removeEventListener(e,B)}),et.slidee&&U.classList.remove(A.draggedClass),setTimeout(function(){et.source.removeEventListener("click",a)}),et.init=0}function W(e){for(;e;){if(-1!=m.indexOf(e.tagName))return!0;e=e.parentNode}return!1}function j(e){return tt.curDelta=(A.horizontal?e.deltaY||e.deltaX:e.deltaY)||-e.wheelDelta,J&&(tt.curDelta/=1===e.deltaMode?3:100),tt.curDelta}function H(e){if(e[f]=q,A.scrollBy&&G.start!==G.end){var t=j(e);t>0&&G.dest<G.end||0>t&&G.dest>G.start,J?q.slideBy(A.scrollBy*t):A.horizontal?U.scrollLeft+=12*t:U.scrollTop+=12*t}}function R(){u(!1)}function I(){A.horizontal?this.scrollLeft=0:this.scrollTop=0}var A=D({},{slidee:null,horizontal:!1,scrollSource:null,scrollBy:0,scrollHijack:300,dragSource:null,mouseDragging:1,touchDragging:1,releaseSwing:!1,swingSpeed:.2,elasticBounds:!1,dragThreshold:3,intervactive:null,speed:0,draggedClass:"dragged",activeClass:"active",disabledClass:"disabled"},d),V="scrollBehavior"in document.documentElement.style;e.operaTv?d.enableNativeScroll=!1:e.edge&&!e.xboxOne?d.enableNativeScroll=!1:V&&e.firefox?d.enableNativeScroll=!0:d.requireAnimation?d.enableNativeScroll=!1:(t.mobile||t.desktop||!e.animate)&&(d.enableNativeScroll=!0);var q=this;q.options=A;var F=l,U=A.slidee?A.slidee:c(F.firstChild)[0],$=0,G={start:0,center:0,end:0,cur:0,dest:0},J=!d.enableNativeScroll,K={start:0,end:0,cur:0},Q=A.scrollSource?A.scrollSource:F,Z=A.dragSource?A.dragSource:F,_={},et={released:1},tt={last:0,delta:0,resetTime:200},nt=0;l=F,q.initialized=0,q.frame=l,q.slidee=U,q.options=A,q.dragging=et;var ot=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,rt=new RegExp("^("+ot+")(?!px)[a-z%]+$","i");q.reload=function(){u()};var it=new CustomEvent("scroll");q.getPos=function(e){var t=Y([U,e]),n=t[0],o=t[1],r=A.horizontal?o.left-n.left:o.top-n.top,i=e[A.horizontal?"offsetWidth":"offsetHeight"],a=A.centerOffset||0;return J||(a=0,r+=A.horizontal?U.scrollLeft:U.scrollTop),{start:r,center:r+a-$/2+i/2,end:r-$+i,size:i}},q.slideBy=function(e,t){e&&x(G.dest+e,t)},q.slideTo=function(e,t){x(e,t)},q.toStart=function(e,t){C("start",e,t)},q.toEnd=function(e,t){C("end",e,t)},q.toCenter=function(e,t){C("center",e,t)},q.destroy=function(){return window.removeEventListener("resize",R,!0),o(F,"scroll",I,{passive:!0}),o(Q,v,H,{passive:!0}),q.initialized=0,q},q.init=function(){if(!q.initialized){if(l.sly)throw new Error("There is already a Sly instance on this element");l.sly=!0;var e=[];return U&&e.push(U),J?U.style["will-change"]="transform":U.classList.add(A.horizontal?t.desktop?"smoothScrollX":"hiddenScrollX":t.desktop?"smoothScrollY":"hiddenScrollY"),J?(h.forEach(function(e){Z.addEventListener(e,k)}),A.scrollWidth||window.addEventListener("resize",R,!0),A.horizontal||n(F,"scroll",I,{passive:!0}),n(Q,v,H,{passive:!0})):A.horizontal&&n(Q,v,H,{passive:!0}),q.initialized=1,u(!0),q}}});return L.create=function(e,t){var n=new L(e,t);return Promise.resolve(n)},L});