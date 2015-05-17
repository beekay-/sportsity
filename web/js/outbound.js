function _gaLt(event) {
    var el = event.srcElement || event.target;
    while (el && (typeof el.tagName == 'undefined' || el.tagName.toLowerCase() != 'a' || !el.href)) {
        el = el.parentNode;
    }
    if (el && el.href) {
        var link = el.href;
        if (link.indexOf(location.host) == -1 && !link.match(/^javascript\:/i)) {
            var hitBack = function (link, target) {
                target ? window.open(link, target) : window.location.href = link;
            };
            var target = (el.target && !el.target.match(/^_(self|parent|top)$/i)) ? el.target : false;
            ga(
                "send", "event", "Outgoing Links", link,
                document.location.pathname + document.location.search, {
                    "hitCallback": hitBack(link, target)
                }
            );
            event.preventDefault ? event.preventDefault() : event.returnValue = !1;
        }

    }
}

var w = window;
w.addEventListener ? w.addEventListener("load", function () {
    document.body.addEventListener("click", _gaLt, !1)
}, !1) : w.attachEvent && w.attachEvent("onload", function () {
    document.body.attachEvent("onclick", _gaLt)
});
