var editorUiInit = EditorUi.prototype.init;
EditorUi.prototype.init = function()
{
    editorUiInit.apply(this, arguments);

    var graph = this.editor.graph;

    this.actions.get('export').setEnabled(true);
    this.actions.get('open').setEnabled(true);
    this.actions.get('import').setEnabled(true);
    this.actions.get('save').setEnabled(true);
    this.actions.get('saveAs').setEnabled(true);

    if (!this.editor.chromeless)
    {
        var textInput = document.createElement('div');
        
        textInput.style.position   = 'absolute';
        textInput.style.whiteSpace = 'nowrap';
        textInput.style.overflow   = 'hidden';
        textInput.style.display    = 'block';
        textInput.contentEditable  = true;

        //mxUtils.setOpacity(textInput, 0);
        
        textInput.style.width  = '300px';
        textInput.style.height = '100px';
        textInput.innerHTML    = '&nbsp;';
        
        var restoreFocus = false;

        // Disables built-in cut, copy and paste shortcuts
        this.keyHandler.bindControlKey(88, null);
        this.keyHandler.bindControlKey(67, null);
        this.keyHandler.bindControlKey(86, null);

        graph.container.addEventListener('paste', mxUtils.bind(this, function(evt){
            var graph = this.editor.graph;

            if (!mxEvent.isConsumed(evt))
            {
                try
                {
                    var data = (evt.clipboardData || evt.originalEvent.clipboardData);
                    var containsText = false;
                    
                    // Workaround for asynchronous paste event processing in textInput
                    // is to ignore this event if it contains text/html/rtf (see below).
                    // NOTE: Image is not pasted into textInput so can't listen there.
                    for (var i = 0; i < data.types.length; i++)
                    {   
                        if (data.types[i].substring(0, 5) === 'text/')
                        {
                            containsText = true;
                            break;
                        }
                    }

                    
                    if (!containsText)
                    {
                        var items = data.items;

                        for (index in items)
                        {
                            var item = items[index];
                            
                            if (item.kind === 'file')
                            {
                                if (graph.isEditing())
                                {
                                    this.importFiles([item.getAsFile()], 0, 0, this.maxImageSize, function(data, mimeType, x, y, w, h)
                                    {
                                        // Inserts image into current text box
                                        graph.insertImage(data, w, h);
                                    }, function()
                                    {
                                        // No post processing
                                    }, function(file)
                                    {
                                        // Handles only images
                                        return file.type.substring(0, 6) == 'image/';
                                    }, function(queue)
                                    {
                                        // Invokes elements of queue in order
                                        for (var i = 0; i < queue.length; i++)
                                        {
                                            queue[i]();
                                        }
                                    });
                                }
                                else
                                {
                                    var pt = this.editor.graph.getInsertPoint();
                                    this.importFiles([item.getAsFile()], pt.x, pt.y, this.maxImageSize);
                                    mxEvent.consume(evt);
                                }
                                
                                break;
                            }
                        }
                    }
                }
                catch (e)
                {
                    // ignore
                }
            }
        }), false);

        mxEvent.addListener(document, 'keydown', mxUtils.bind(this, function(evt){
            var source = mxEvent.getSource(evt);

            if (graph.container != null && graph.isEnabled() && !graph.isMouseDown && !graph.isEditing() &&
            this.dialog == null && source.nodeName != 'INPUT' && source.nodeName != 'TEXTAREA')
            {
                if (evt.keyCode == 224 /* FF */ || (!mxClient.IS_MAC && evt.keyCode == 17 /* Control */) ||
                (mxClient.IS_MAC && evt.keyCode == 91 /* Meta */))
                {
                    if(!restoreFocus){
                        // Avoid autoscroll but allow handling of all pass-through ctrl shortcuts
                        textInput.style.left = (graph.container.scrollLeft + 10) + 'px';
                        textInput.style.top  = (graph.container.scrollTop + 10) + 'px';
                        
                        graph.container.appendChild(textInput);
                        restoreFocus = true;
                        
                        // Workaround for selected document content in quirks mode
                        if (mxClient.IS_QUIRKS)
                        {
                            window.setTimeout(function()
                            {
                                textInput.focus();
                                document.execCommand('selectAll', false, null);
                            }, 0);
                        }
                        else
                        {
                            textInput.focus();
                            document.execCommand('selectAll', false, null);
                        }
                    }
                }
            }
        }));

        mxEvent.addListener(document, 'keyup', mxUtils.bind(this, function(evt){
            // Workaround for asynchronous event read invalid in IE quirks mode
            var keyCode = evt.keyCode;

            // Asynchronous workaround for scroll to origin after paste if the
            // Ctrl-key is not pressed for long enough in FF on Windows
            window.setTimeout(mxUtils.bind(this, function()
            {
                if (restoreFocus && (keyCode == 224 /* FF */ || keyCode == 17 /* Control */ || keyCode == 91 /* Meta */))
                {
                    restoreFocus = false;
                    
                    if (!graph.isEditing() && this.dialog == null && graph.container != null)
                    {
                        graph.container.focus();
                    }
                    
                    textInput.parentNode.removeChild(textInput);
                }
            }), 0);
        }));

        // Clears input and restores focus and selection
        function clearInput()
        {
            window.setTimeout(function()
            {
                textInput.innerHTML = '&nbsp;';
                textInput.focus();
                document.execCommand('selectAll', false, null);
            }, 0);
        };

        mxEvent.addListener(textInput, 'copy', mxUtils.bind(this, function(evt)
        {
            if (graph.isEnabled())
            {
                mxClipboard.copy(graph);
                this.copyCells(textInput);
                clearInput();
            }
        }));
        
        mxEvent.addListener(textInput, 'cut', mxUtils.bind(this, function(evt)
        {
            if (graph.isEnabled())
            {
                this.copyCells(textInput, true);
                clearInput();
            }
        }));
        
        mxEvent.addListener(textInput, 'paste', mxUtils.bind(this, function(evt)
        {
            if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
            {
                textInput.innerHTML = '&nbsp;';
                textInput.focus();
                
                window.setTimeout(mxUtils.bind(this, function()
                {
                    this.pasteCells(evt, textInput);
                    textInput.innerHTML = '&nbsp;';
                }), 0);
            }
        }), true);

        var isSelectionAllowed = this.isSelectionAllowed;
        this.isSelectionAllowed = function(evt)
        {
            if (mxEvent.getSource(evt) == textInput)
            {
                return true;
            }

            return isSelectionAllowed.apply(this, arguments);
        };
    }

    // Updates action states which require a backend
    // if (!Editor.useLocalStorage)
    // {
    //     mxUtils.post(OPEN_URL, '', mxUtils.bind(this, function(req)
    //     {
    //         var enabled = req.getStatus() != 404;

    //         this.actions.get('open').setEnabled(enabled   || Graph.fileSupport);
    //         this.actions.get('import').setEnabled(enabled || Graph.fileSupport);
    //         this.actions.get('save').setEnabled(enabled);
    //         this.actions.get('saveAs').setEnabled(enabled);
    //         this.actions.get('export').setEnabled(enabled);
    //     }));
    // }
};

/**
 * Creates the format panel and adds overrides.
 */
EditorUi.prototype.copyCells = function(elt, removeCells)
{
    var graph = this.editor.graph;
    
    if (!graph.isSelectionEmpty())
    {
        var cells = mxUtils.sortCells(graph.model.getTopmostCells(graph.getSelectionCells()));
        
        // LATER: Add span with XML in data attribute
        // var span = document.createElement('span');
        // span.setAttribute('data-jgraph-type', 'application/vnd.jgraph.xml');
        // span.setAttribute('data-jgraph-content', mxUtils.getXml(graph.encodeCells(clones)));
        
        // Fixes cross-platform clipboard UTF8 issues by encoding as URI
        var xml = mxUtils.getXml(this.editor.graph.encodeCells(cells));
        mxUtils.setTextContent(elt, encodeURIComponent(xml));

        if (removeCells)
        {
            graph.removeCells(cells, false);
            graph.lastPasteXml = null;
        }
        else
        {
            graph.lastPasteXml = xml;
            graph.pasteCounter = 0;
        }

        elt.focus();
        document.execCommand('selectAll', false, null);
    }
    else
    {
        // Disables copy on focused element
        elt.innerHTML = '';
    }
};

/**
 * Creates the format panel and adds overrides.
 */
EditorUi.prototype.pasteCells = function(evt, elt)
{
    if (!mxEvent.isConsumed(evt))
    {
        var spans = elt.getElementsByTagName('span');

        if (spans != null && spans.length > 0 && spans[0].getAttribute('data-lucid-type') ===
            'application/vnd.lucid.chart.objects')
        {
            var content = spans[0].getAttribute('data-lucid-content');
            
            if (content != null && content.length > 0)
            {
                this.importLucidChart(content, 0, 0);
                mxEvent.consume(evt);
            }
        }
        else
        {   
            var graph  = this.editor.graph;
            var xml    = mxUtils.trim((mxClient.IS_QUIRKS || document.documentMode == 8) ? mxUtils.getTextContent(elt) : elt.textContent);
            var compat = false;

            // Workaround for junk after XML in VM
            try
            {
                var idx = xml.lastIndexOf('%3E');
                
                if (idx >= 0 && idx < xml.length - 3)
                {
                    xml = xml.substring(0, idx + 3);
                }
            }
            catch (e)
            {
                // ignore
            }

            // Checks for embedded XML content
            try
            {
                var spans = elt.getElementsByTagName('span');
                var tmp   = (spans != null && spans.length > 0) ? mxUtils.trim(decodeURIComponent(spans[0].textContent)) : decodeURIComponent(xml);
                
                if (this.isCompatibleString(tmp))
                {
                    compat = true;
                    xml    = tmp;
                }
            }
            catch (e)
            {
                // ignore
            }
            
            if (graph.lastPasteXml == xml)
            {
                graph.pasteCounter++;
            }
            else
            {
                graph.lastPasteXml = xml;
                graph.pasteCounter = 0;
            }
            
            var dx = graph.pasteCounter * graph.gridSize;
            
            if (xml != null && xml.length > 0)
            {
                if (compat || this.isCompatibleString(xml))
                {
                    graph.setSelectionCells(this.importXml(xml, dx, dx));
                }
                else
                {
                    var pt = graph.getInsertPoint();
                    
                    if (graph.isMouseInsertPoint())
                    {
                        dx = 0;
                        
                        // No offset for insert at mouse position
                        if (graph.lastPasteXml == xml && graph.pasteCounter > 0)
                        {
                            graph.pasteCounter--;
                        }
                    }
                    
                    graph.setSelectionCells(this.insertTextAt(xml, pt.x + dx, pt.y + dx, true));
                }
                
                if (!graph.isSelectionEmpty())
                {
                    graph.scrollCellToVisible(graph.getSelectionCell());
                
                    if (this.hoverIcons != null)
                    {
                        this.hoverIcons.update(graph.view.getState(graph.getSelectionCell()));
                    }
                    
                    try
                    {
                        mxEvent.consume(evt);
                    }
                    catch (e)
                    {
                        // ignore event no longer exists in async handler in IE8-
                    }
                }
            }
        }
    }
};

/**
 * Returns true if the given string contains a compatible graph model.
 */
EditorUi.prototype.isCompatibleString = function(data)
{
    try
    {
        var doc  = mxUtils.parseXml(data);
        var node = this.editor.extractGraphModel(doc.documentElement, true);
        console.log(node);
        return node != null && node.getElementsByTagName('parsererror').length == 0;
    }
    catch (e)
    {
        console.log(e);
        // ignore
    }
    
    return false;
};

/**
 * Imports the given XML into the existing diagram.
 * TODO: Make this function asynchronous
 */
EditorUi.prototype.insertTextAt = function(text, dx, dy, html, asImage, crop, resizeImages)
{
    crop = (crop != null) ? crop : true;
    resizeImages = (resizeImages != null) ? resizeImages : true;
    
    // Handles special case for Gliffy data which requires async server-side for parsing
    if (text != null)
    {
        if (Graph.fileSupport && !this.isOffline() && new XMLHttpRequest().upload && this.isRemoteFileFormat(text))
        {
            // Fixes possible parsing problems with ASCII 160 (non-breaking space)
            this.parseFile(new Blob([text.replace(/\s+/g,' ')], {type: 'application/octet-stream'}), mxUtils.bind(this, function(xhr)
            {
                if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status <= 299)
                {
                    this.editor.graph.setSelectionCells(this.insertTextAt(xhr.responseText, dx, dy, true));
                }
            }));
            
            // Returns empty cells array as it is aysynchronous
            return [];
        }
        // Handles special case of data URI which requires async loading for finding size
        else if (text.substring(0, 5) == 'data:' || (!this.isOffline() && (asImage || (/\.(gif|jpg|jpeg|tiff|png|svg)$/i).test(text))))
        {
            var graph = this.editor.graph;
            
            // Checks for embedded XML in PNG
            if (text.substring(0, 22) == 'data:image/png;base64,')
            {
                var xml = this.extractGraphModelFromPng(text);
                var result = this.importXml(xml, dx, dy, crop, true); 
                
                if (result.length > 0)
                {
                    return result;
                }
            }
            
            // Tries to extract embedded XML from SVG data URI
            if (text.substring(0, 19) == 'data:image/svg+xml;')
            {
                try
                {
                    var xml = null;
                    
                    if (text.substring(0, 26) == 'data:image/svg+xml;base64,')
                    {
                        xml = text.substring(text.indexOf(',') + 1);
                        xml = (window.atob && !mxClient.IS_SF) ? atob(xml) : Base64.decode(xml, true);
                    }
                    else
                    {
                        xml = decodeURIComponent(text.substring(text.indexOf(',') + 1));
                    }
                    
                    var result = this.importXml(xml, dx, dy, crop, true); 

                    if (result.length > 0)
                    {
                        return result;
                    }
                }
                catch (e)
                {
                    // Ignore
                }
            }
            
            this.loadImage(text, mxUtils.bind(this, function(img)
            {
                if (text.substring(0, 5) == 'data:')
                {
                    this.resizeImage(img, text, mxUtils.bind(this, function(data2, w2, h2)
                    {
                        graph.setSelectionCell(graph.insertVertex(null, null, '', graph.snap(dx), graph.snap(dy),
                                w2, h2, 'shape=image;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;' +
                                'verticalAlign=top;aspect=fixed;imageAspect=0;image=' + this.convertDataUri(data2) + ';'));
                    }), resizeImages, this.maxImageSize);
                }
                else
                {
                    var s = Math.min(1, Math.min(this.maxImageSize / img.width, this.maxImageSize / img.height));
                    var w = Math.round(img.width * s);
                    var h = Math.round(img.height * s);
                    
                    graph.setSelectionCell(graph.insertVertex(null, null, '', graph.snap(dx), graph.snap(dy),
                            w, h, 'shape=image;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;' +
                            'verticalAlign=top;aspect=fixed;imageAspect=0;image=' + text + ';'));
                }
            }), mxUtils.bind(this, function()
            {
                var cell = null;
                
                // Inserts invalid data URIs as text
                graph.getModel().beginUpdate();
                try
                {
                    cell = graph.insertVertex(graph.getDefaultParent(), null, text,
                            graph.snap(dx), graph.snap(dy), 1, 1, 'text;' + ((html) ? 'html=1;' : ''));
                    graph.updateCellSize(cell);
                    graph.fireEvent(new mxEventObject('textInserted', 'cells', [cell]));
                }
                finally
                {
                    graph.getModel().endUpdate();
                }

                graph.setSelectionCell(cell);
            }));
            
            return [];
        }
        else
        {
            text = this.editor.graph.zapGremlins(mxUtils.trim(text));
        
            if (this.isCompatibleString(text))
            {
                return this.importXml(text, dx, dy, crop);
            }
            else if (text.length > 0)
            {
                if (text.substring(0, 26) == '{"state":"{\\"Properties\\":')
                {
                    this.importLucidChart(text, dx, dy, crop);
                }
                else
                {
                    var graph = this.editor.graph;
                    var cell = null;
                    
                    graph.getModel().beginUpdate();
                    try
                    {
                        // Fires cellsInserted to apply the current style to the inserted text.
                        // This requires the value to be empty when the event is fired.
                        cell = graph.insertVertex(graph.getDefaultParent(), null, '',
                                graph.snap(dx), graph.snap(dy), 1, 1, 'text;' + ((html) ? 'html=1;' : ''));
                        graph.fireEvent(new mxEventObject('textInserted', 'cells', [cell]));
                        
                        // Apply value and updates the cell size to fit the text block
                        cell.value = text;
                        graph.updateCellSize(cell);
                        
                        // See http://stackoverflow.com/questions/6927719/url-regex-does-not-work-in-javascript
                        var regexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;
                        
                        if (regexp.test(cell.value))
                        {
                            graph.setLinkForCell(cell, cell.value);
                        }
                        
                        // Adds spacing
                        cell.geometry.width += graph.gridSize;
                        cell.geometry.height += graph.gridSize;
                    }
                    finally
                    {
                        graph.getModel().endUpdate();
                    }
                    
                    return [cell];
                }
            }
        }
    }
    
    return [];
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
EditorUi.prototype.isOfflineApp = function()
{
    return (urlParams['offline'] == '1');
};

/**
 * Returns true if this offline app is offline.
 */
EditorUi.prototype.isOffline = function()
{
    return this.isOfflineApp() || !navigator.onLine || urlParams['stealth'] == '1';
};

/**
 * Returns true for Gliffy or GraphML data or .vsdx filenames.
 */
EditorUi.prototype.isRemoteFileFormat = function(data, filename)
{
    return /(\.*<graphml xmlns=\".*)/.test(data) ||
        /(\"contentType\":\s*\"application\/gliffy\+json\")/.test(data) ||
        (filename != null && /(\.vsdx)($|\?)/i.test(filename)) ||
        (filename != null && /(\.vssx)($|\?)/i.test(filename));
};

EditorUi.prototype.getCurrentCompressData = function()
{
    var currentGraphElement = this.editor.getGraphXml();

    if(currentGraphElement && currentGraphElement.childNodes[0] &&
    currentGraphElement.childNodes[0].childNodes.length <= 2){
        return null;
    }

    var currentGraphXml     = mxUtils.getXml(currentGraphElement);
    var currentCompressText = this.editor.graph.compress(this.editor.graph.zapGremlins(currentGraphXml));

    var container = document.createElement("div");
    var diagram   = document.createElement("diagram");

    diagram.innerText = currentCompressText;
    diagram.setAttribute("version", this.version); 

    container.appendChild(diagram);

    return container.innerHTML;
}

// var updatePasteActionStates = EditorUi.prototype.updatePasteActionStates;
// EditorUi.prototype.updatePasteActionStates = function(){
//     updatePasteActionStates.call(this, arguments);

//     var paste = this.actions.get('paste');
//     paste.setEnabled(true);
// }