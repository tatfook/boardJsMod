/**
 * 
 */
var ErrorDialog = function(editorUi, title, message, buttonText, fn, retry, buttonText2, fn2, hide)
{
    hide = (hide != null) ? hide : true;
    
    var div = document.createElement('div');
    div.style.textAlign = 'center';

    if (title != null)
    {
        var hd = document.createElement('div');
        hd.style.padding = '0px';
        hd.style.margin = '0px';
        hd.style.fontSize = '18px';
        hd.style.paddingBottom = '16px';
        hd.style.marginBottom = '16px';
        hd.style.borderBottom = '1px solid #c0c0c0';
        hd.style.color = 'gray';
        mxUtils.write(hd, title);
        div.appendChild(hd);
    }

    var p2 = document.createElement('div');
    p2.style.padding = '6px';
    p2.innerHTML = message;
    div.appendChild(p2);
    
    var btns = document.createElement('div');
    btns.style.marginTop = '16px';
    btns.style.textAlign = 'right';
    
    if (retry != null)
    {
        var retryBtn = mxUtils.button(mxResources.get('tryAgain'), function()
        {
            editorUi.hideDialog();
            retry();
        });
        retryBtn.className = 'geBtn';
        btns.appendChild(retryBtn);
        
        btns.style.textAlign = 'center';
    }
    
    var btn = mxUtils.button(buttonText, function()
    {
        if (hide)
        {
            editorUi.hideDialog();
        }
        
        if (fn != null)
        {
            fn();
        }
    });
    btn.className = 'geBtn';
    
    btns.appendChild(btn);
    
    if (buttonText2 != null)
    {
        var mainBtn = mxUtils.button(buttonText2, function()
        {
            if (hide)
            {
                editorUi.hideDialog();
            }
            
            if (fn2 != null)
            {
                fn2();
            }
        });
        mainBtn.className = 'geBtn gePrimaryBtn';
        btns.appendChild(mainBtn);
    }
    
    this.init = function()
    {
        btn.focus();
    };
    
    div.appendChild(btns);

    this.container = div;
};