function _gaLt(event){
    var el = event.srcElement || event.target;
    while(el && (typeof el.tagName == 'undefined' || el.tagName.toLowerCase() != 'a' || !el.href))
        el = el.parentNode;
    if(el && el.href){
        if(el.href.indexOf(location.host) == -1){
            var hitBack = function(link, target){
                target ? window.open(link, target) : window.location.href = link;
            };
            var link = el.href;
            var target = (el.target && !el.target.match(/^_(self|parent|top)$/i)) ? el.target : false;
            ga(
                "send", "event", "Outgoing Links", link,
                document.location.pathname + document.location.search,
                {"hitCallback": hitBack(link, target)}
            );
            event.preventDefault ? event.preventDefault() : event.returnValue = !1;
        }
    }
}
window.addEventListener ? document.body.addEventListener("click",_gaLt,!1)
: window.attachEvent && document.body.attachEvent("onclick",_gaLt);