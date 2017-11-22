/* 2017-11-22 */
function getAdvancePercentage(t,e){return t/1e3*e}function getLineOpacity(t,e,i){var n=e-(t+1)/i.lines*i.direction;(n<0||n>1)&&(n+=i.direction);var r=1-n/(i.trail/100);return r<0?i.opacity:r*(1-i.opacity)+i.opacity}function createEl(t,e){void 0===e&&(e={});var i=document.createElement(t);for(var n in e)i[n]=e[n];return i}function vendor(t,e){if(void 0!==t.style[e])return e;var i="ms"+e.charAt(0).toUpperCase()+e.slice(1);return void 0!==t.style[i]?i:""}function css(t,e){for(var i in e)t.style[vendor(t,i)||i]=e[i];return t}function getColor(t,e){return"string"==typeof t?t:t[e%t.length]}function drawLines(t,e){for(var i=0;i<e.lines;i++){var n=css(createEl("div"),{position:"absolute",top:1+~(e.scale*e.width/2)+"px",opacity:e.opacity});e.shadow&&n.appendChild(css(fill("#000","0 0 4px #000",e,i),{top:"2px"})),n.appendChild(fill(getColor(e.color,i),"0 0 1px rgba(0,0,0,.1)",e,i)),t.appendChild(n)}return t}function fill(t,e,i,n){return css(createEl("div"),{position:"absolute",width:i.scale*(i.length+i.width)+"px",height:i.scale*i.width+"px",background:t,boxShadow:e,transformOrigin:"left",transform:"rotate("+~~(360/i.lines*n+i.rotate)+"deg) translate("+i.scale*i.radius+"px,0)",borderRadius:(i.corners*i.scale*i.width>>1)+"px"})}var __assign=this&&this.__assign||Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++){e=arguments[i];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},defaults={lines:12,length:7,width:5,radius:10,scale:1,corners:1,color:"#000",opacity:.25,rotate:0,direction:1,speed:1,trail:100,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",shadow:!1,position:"absolute"},Spinner=function(){function t(t){void 0===t&&(t={}),this.opts=__assign({},defaults,t)}return t.prototype.spin=function(t){var e=this;this.stop(),this.el=createEl("div",{className:this.opts.className}),this.el.setAttribute("role","progressbar"),css(this.el,{position:this.opts.position,width:0,zIndex:this.opts.zIndex,left:this.opts.left,top:this.opts.top}),t&&t.insertBefore(this.el,t.firstChild||null);var i,n;"undefined"!=typeof requestAnimationFrame?(i=requestAnimationFrame,n=function(){return performance.now()}):(i=function(t){return setTimeout(t,1e3/e.opts.fps)},n=function(){return Date.now()});var r,o=0,s=function(){var t=n();void 0===r&&(r=t-1),o+=getAdvancePercentage(t-r,e.opts.speed),r=t,o>1&&(o-=Math.floor(o));for(var a=0;a<e.opts.lines;a++)if(a<e.el.childNodes.length){var l=getLineOpacity(a,o,e.opts);e.el.childNodes[a].style.opacity=l.toString()}e.animateId=e.el?i(s):void 0};return drawLines(this.el,this.opts),s(),this},t.prototype.stop=function(){return this.el&&("undefined"!=typeof requestAnimationFrame?cancelAnimationFrame(this.animateId):clearTimeout(this.animateId),this.el.parentNode&&this.el.parentNode.removeChild(this.el),this.el=void 0),this},t}();