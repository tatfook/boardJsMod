var diagramFormatPanelAddView = DiagramFormatPanel.prototype.addView;
DiagramFormatPanel.prototype.addView = function(div)
{
    diagramFormatPanelAddView.apply(this, arguments);
    div.removeChild(div.lastChild);
    
    return div;
}