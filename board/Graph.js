/**
 * Adds rack child layout style.
 */
var graphInit = Graph.prototype.init;
Graph.prototype.init = function()
{
    graphInit.apply(this, arguments);

    // Override insert location for current mouse point
    var mouseEvent = null;
    
    function setMouseEvent(evt)
    {
        mouseEvent = evt;
        
        // Workaround for member not found in IE8-
        if (mxClient.IS_QUIRKS || document.documentMode == 7 || document.documentMode == 8)
        {
            mouseEvent = mxUtils.clone(evt);
        }
    };
    
    mxEvent.addListener(this.container, 'mouseenter', setMouseEvent);
    mxEvent.addListener(this.container, 'mousemove', setMouseEvent);
    
    mxEvent.addListener(this.container, 'mouseleave', function(evt)
    {
        mouseEvent = null;
    });
            
    // Extends getInsertPoint to use the current mouse location
    this.isMouseInsertPoint = function()
    {
        return mouseEvent != null;
    };
    
    var getInsertPoint = this.getInsertPoint;
    
    this.getInsertPoint = function()
    {
        if (mouseEvent != null)
        {
            return this.getPointForEvent(mouseEvent);
        }
        
        return getInsertPoint.apply(this, arguments);
    };
    
    var layoutManagerGetLayout = this.layoutManager.getLayout;
    
    this.layoutManager.getLayout = function(cell)
    {
        var state = this.graph.view.getState(cell);
        var style = (state != null) ? state.style : this.graph.getCellStyle(cell);
        
        // mxRackContainer may be undefined as it is dynamically loaded at render time
        if (typeof(mxRackContainer) != 'undefined' && style['childLayout'] == 'rack')
        {
            var rackLayout = new mxStackLayout(this.graph, false);
            
            rackLayout.setChildGeometry = function(child, geo)
            {
                var unitSize = 20;
                
                geo.height = Math.max(geo.height, unitSize);
                
                if (geo.height / unitSize > 1)
                {
                    var mod = geo.height % unitSize;
                    geo.height += mod > unitSize / 2 ? (unitSize - mod) : -mod;
                }
        
                this.graph.getModel().setGeometry(child, geo);
            };
        
            rackLayout.fill         = true;
            rackLayout.unitSize     = mxRackContainer.unitSize | 20;
            rackLayout.marginLeft   = style['marginLeft'] || 0;
            rackLayout.marginRight  = style['marginRight'] || 0;
            rackLayout.marginTop    = style['marginTop'] || 0;
            rackLayout.marginBottom = style['marginBottom'] || 0;
            rackLayout.resizeParent = false;
            
            return rackLayout;
        }
        
        return layoutManagerGetLayout.apply(this, arguments);
    }
};