/* 2017-11-21 */
Menus.prototype.defaultMenuItems=["edit","view","arrange"];var menusInit=Menus.prototype.init;Menus.prototype.init=function(){menusInit.apply(this,arguments);var t=this.menus;t.arrange=new Menu(mxUtils.bind(this,function(t,e){this.addMenuItems(t,["toFront","toBack","-"],e),this.addSubmenu("direction",t,e),this.addMenuItems(t,["turn","-"],e),this.addSubmenu("align",t,e),this.addSubmenu("distribute",t,e),t.addSeparator(e),this.addSubmenu("navigation",t,e),this.addSubmenu("insert",t,e),this.addMenuItems(t,["-","group","ungroup","removeFromGroup","-","clearWaypoints","autosize"],e)})),this.menus=t};