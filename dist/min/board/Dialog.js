/* 2017-11-22 */
var ErrorDialog=function(e,t,n,i,l,a,d,r,o){o=null==o||o;var s=document.createElement("div");if(s.style.textAlign="center",null!=t){var c=document.createElement("div");c.style.padding="0px",c.style.margin="0px",c.style.fontSize="18px",c.style.paddingBottom="16px",c.style.marginBottom="16px",c.style.borderBottom="1px solid #c0c0c0",c.style.color="gray",mxUtils.write(c,t),s.appendChild(c)}var p=document.createElement("div");p.style.padding="6px",p.innerHTML=n,s.appendChild(p);var m=document.createElement("div");if(m.style.marginTop="16px",m.style.textAlign="right",null!=a){var g=mxUtils.button(mxResources.get("tryAgain"),function(){e.hideDialog(),a()});g.className="geBtn",m.appendChild(g),m.style.textAlign="center"}var u=mxUtils.button(i,function(){o&&e.hideDialog(),null!=l&&l()});if(u.className="geBtn",m.appendChild(u),null!=d){var x=mxUtils.button(d,function(){o&&e.hideDialog(),null!=r&&r()});x.className="geBtn gePrimaryBtn",m.appendChild(x)}this.init=function(){u.focus()},s.appendChild(m),this.container=s},ConfirmDialog=function(e,t,n,i,l,a,d,r,o){var s=document.createElement("div");s.style.textAlign="center";var c=document.createElement("div");c.style.padding="6px",c.style.overflow="auto",c.style.maxHeight="40px",mxClient.IS_QUIRKS&&(c.style.height="60px"),mxUtils.write(c,t),s.appendChild(c);var p=document.createElement("div");p.style.textAlign="center",p.style.whiteSpace="nowrap";var m=document.createElement("input");m.setAttribute("type","checkbox");var g=mxUtils.button(a||mxResources.get("cancel"),function(){e.hideDialog(),null!=i&&i(m.checked)});g.className="geBtn",null!=r&&(g.innerHTML=r+"<br>"+g.innerHTML,g.style.paddingBottom="8px",g.style.paddingTop="8px",g.style.height="auto",g.style.width="40%"),e.editor.cancelFirst&&p.appendChild(g);var u=mxUtils.button(l||mxResources.get("ok"),function(){e.hideDialog(),null!=n&&n(m.checked)});if(p.appendChild(u),null!=d?(u.innerHTML=d+"<br>"+u.innerHTML+"<br>",u.style.paddingBottom="8px",u.style.paddingTop="8px",u.style.height="auto",u.className="geBtn",u.style.width="40%"):u.className="geBtn gePrimaryBtn",e.editor.cancelFirst||p.appendChild(g),s.appendChild(p),o){p.style.marginTop="10px",(c=document.createElement("p")).style.marginTop="20px",c.appendChild(m);var x=document.createElement("span");mxUtils.write(x," "+mxResources.get("rememberThisSetting")),c.appendChild(x),s.appendChild(c),mxEvent.addListener(x,"click",function(e){m.checked=!m.checked,mxEvent.consume(e)})}else p.style.marginTop="16px";this.container=s};