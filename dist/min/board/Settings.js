/* 2017-11-22 */
var mxSettings={currentVersion:16,defaultFormatWidth:screen.width<600?"0":"240",key:".drawio-config",getLanguage:function(){return mxSettings.settings.language},setLanguage:function(t){mxSettings.settings.language=t},getUi:function(){return mxSettings.settings.ui},setUi:function(t){mxSettings.settings.ui=t},getShowStartScreen:function(){return mxSettings.settings.showStartScreen},setShowStartScreen:function(t){mxSettings.settings.showStartScreen=t},getGridColor:function(){return mxSettings.settings.gridColor},setGridColor:function(t){mxSettings.settings.gridColor=t},getAutosave:function(){return mxSettings.settings.autosave},setAutosave:function(t){mxSettings.settings.autosave=t},getResizeImages:function(){return mxSettings.settings.resizeImages},setResizeImages:function(t){mxSettings.settings.resizeImages=t},getOpenCounter:function(){return mxSettings.settings.openCounter},setOpenCounter:function(t){mxSettings.settings.openCounter=t},getLibraries:function(){return mxSettings.settings.libraries},setLibraries:function(t){mxSettings.settings.libraries=t},addCustomLibrary:function(t){mxSettings.load(),mxUtils.indexOf(mxSettings.settings.customLibraries,t)<0&&("L.scratchpad"===t?mxSettings.settings.customLibraries.splice(0,0,t):mxSettings.settings.customLibraries.push(t)),mxSettings.save()},removeCustomLibrary:function(t){mxSettings.load(),mxUtils.remove(t,mxSettings.settings.customLibraries),mxSettings.save()},getCustomLibraries:function(){return mxSettings.settings.customLibraries},getPlugins:function(){return mxSettings.settings.plugins},setPlugins:function(t){mxSettings.settings.plugins=t},getRecentColors:function(){return mxSettings.settings.recentColors},setRecentColors:function(t){mxSettings.settings.recentColors=t},getFormatWidth:function(){return parseInt(mxSettings.settings.formatWidth)},setFormatWidth:function(t){mxSettings.settings.formatWidth=t},getCurrentEdgeStyle:function(){return mxSettings.settings.currentEdgeStyle},setCurrentEdgeStyle:function(t){mxSettings.settings.currentEdgeStyle=t},getCurrentVertexStyle:function(){return mxSettings.settings.currentVertexStyle},setCurrentVertexStyle:function(t){mxSettings.settings.currentVertexStyle=t},isCreateTarget:function(){return mxSettings.settings.createTarget},setCreateTarget:function(t){mxSettings.settings.createTarget=t},getPageFormat:function(){return mxSettings.settings.pageFormat},setPageFormat:function(t){mxSettings.settings.pageFormat=t},init:function(){mxSettings.settings={language:"",libraries:Sidebar.prototype.defaultEntries,customLibraries:Editor.defaultCustomLibraries,plugins:[],recentColors:[],formatWidth:mxSettings.defaultFormatWidth,currentEdgeStyle:Graph.prototype.defaultEdgeStyle,currentVertexStyle:Graph.prototype.defaultVertexStyle,createTarget:!1,pageFormat:mxGraph.prototype.pageFormat,search:!0,showStartScreen:!0,gridColor:mxGraphView.prototype.gridColor,autosave:!EditorUi.isElectronApp,resizeImages:null,openCounter:0,version:mxSettings.currentVersion,isNew:!0}},save:function(){if(isLocalStorage&&"undefined"!=typeof JSON)try{delete mxSettings.settings.isNew,mxSettings.settings.version=mxSettings.currentVersion,localStorage.setItem(mxSettings.key,JSON.stringify(mxSettings.settings))}catch(t){}},load:function(){isLocalStorage&&"undefined"!=typeof JSON&&mxSettings.parse(localStorage.getItem(mxSettings.key)),null==mxSettings.settings&&mxSettings.init()},parse:function(t){null!=t&&(mxSettings.settings=JSON.parse(t),null==mxSettings.settings.plugins&&(mxSettings.settings.plugins=[]),null==mxSettings.settings.recentColors&&(mxSettings.settings.recentColors=[]),null==mxSettings.settings.libraries&&(mxSettings.settings.libraries=Sidebar.prototype.defaultEntries),null==mxSettings.settings.customLibraries&&(mxSettings.settings.customLibraries=Editor.defaultCustomLibraries),null==mxSettings.settings.ui&&(mxSettings.settings.ui=""),null==mxSettings.settings.formatWidth&&(mxSettings.settings.formatWidth=mxSettings.defaultFormatWidth),null!=mxSettings.settings.lastAlert&&delete mxSettings.settings.lastAlert,null==mxSettings.settings.currentEdgeStyle?mxSettings.settings.currentEdgeStyle=Graph.prototype.defaultEdgeStyle:mxSettings.settings.version<=10&&(mxSettings.settings.currentEdgeStyle.orthogonalLoop=1,mxSettings.settings.currentEdgeStyle.jettySize="auto"),null==mxSettings.settings.currentVertexStyle&&(mxSettings.settings.currentVertexStyle=Graph.prototype.defaultVertexStyle),null==mxSettings.settings.createTarget&&(mxSettings.settings.createTarget=!1),null==mxSettings.settings.pageFormat&&(mxSettings.settings.pageFormat=mxGraph.prototype.pageFormat),null==mxSettings.settings.search&&(mxSettings.settings.search=!0),null==mxSettings.settings.showStartScreen&&(mxSettings.settings.showStartScreen=!0),null==mxSettings.settings.gridColor&&(mxSettings.settings.gridColor=mxGraphView.prototype.gridColor),null==mxSettings.settings.autosave&&(mxSettings.settings.autosave=!0),null!=mxSettings.settings.scratchpadSeen&&delete mxSettings.settings.scratchpadSeen)},clear:function(){isLocalStorage&&localStorage.removeItem(mxSettings.key)}};("undefined"==typeof mxLoadSettings||mxLoadSettings)&&mxSettings.load();