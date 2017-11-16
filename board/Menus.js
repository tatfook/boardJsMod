Menus.prototype.defaultMenuItems = ['edit', 'view', 'arrange'];

var menusInit = Menus.prototype.init;
Menus.prototype.init = function()
{
    menusInit.apply(this, arguments);

    var menus = this.menus;

    menus.arrange = new Menu(mxUtils.bind(this, function(menu, parent)
    {
        this.addMenuItems(menu, ['toFront', 'toBack', '-'], parent);
        this.addSubmenu('direction', menu, parent);
        this.addMenuItems(menu, ['turn', '-'], parent);
        this.addSubmenu('align', menu, parent);
        this.addSubmenu('distribute', menu, parent);
        menu.addSeparator(parent);
        this.addSubmenu('navigation', menu, parent);
        this.addSubmenu('insert', menu, parent);
        //this.addSubmenu('layout', menu, parent);
        this.addMenuItems(menu, ['-', 'group', 'ungroup', 'removeFromGroup', '-', 'clearWaypoints', 'autosize'], parent);
    }));

    this.menus = menus;
}