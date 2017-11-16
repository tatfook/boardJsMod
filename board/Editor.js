/**
 * Helper function to extract the graph model XML node.
 */
Editor.prototype.extractGraphModel = function(node, allowMxFile)
{
    if (node != null && typeof(pako) !== 'undefined')
    {
        var tmp  = node.ownerDocument.getElementsByTagName('div');
        var divs = [];

        if (tmp != null && tmp.length > 0)
        {
            for (var i = 0; i < tmp.length; i++)
            {
                if (tmp[i].getAttribute('class') == 'mxgraph')
                {
                    divs.push(tmp[i]);
                    break;
                }	
            }
        }
        
        if (divs.length > 0)
        {
            var data = divs[0].getAttribute('data-mxgraph');

            if (data != null)
            {
                var config = JSON.parse(data);

                if (config != null && config.xml != null)
                {
                    var doc2 = mxUtils.parseXml(config.xml);
                    node = doc2.documentElement;
                }
            }
            else
            {
                var divs2 = divs[0].getElementsByTagName('div');
                
                if (divs2.length > 0)
                {
                    var data = mxUtils.getTextContent(divs2[0]);
                    data = this.graph.decompress(data);
                    
                    if (data.length > 0)
                    {
                        var doc2 = mxUtils.parseXml(data);
                        node = doc2.documentElement;
                    }
                }
            }
        }
    }

    if (node != null && node.nodeName == 'svg')
    {
        var tmp = node.getAttribute('content');
        
        if (tmp != null && tmp.charAt(0) != '<' && tmp.charAt(0) != '%')
        {
            tmp = unescape((window.atob) ? atob(tmp) : Base64.decode(cont, tmp));
        }
        
        if (tmp != null && tmp.charAt(0) == '%')
        {
            tmp = decodeURIComponent(tmp);
        }
        
        if (tmp != null && tmp.length > 0)
        {
            node = mxUtils.parseXml(tmp).documentElement;
        }
        else
        {
            throw {message: mxResources.get('notADiagramFile')};
        }
    }
    
    if (node != null && !allowMxFile)
    {
        var diagramNode = null;
        
        if (node.nodeName == 'diagram')
        {
            diagramNode = node;
        }
        else if (node.nodeName == 'mxfile')
        {
            var diagrams = node.getElementsByTagName('diagram');

            if (diagrams.length > 0)
            {
                diagramNode = diagrams[Math.max(0, Math.min(diagrams.length - 1, urlParams['page'] || 0))];
            }
        }

        if (diagramNode != null)
        {
            var tmp = this.graph.decompress(mxUtils.getTextContent(diagramNode));

            if (tmp != null && tmp.length > 0)
            {
                node = mxUtils.parseXml(tmp).documentElement;
            }
        }
    }
    
    if (node != null && node.nodeName != 'mxGraphModel' && (!allowMxFile || node.nodeName != 'mxfile'))
    {
        node = null;
    }
    
    return node;
};