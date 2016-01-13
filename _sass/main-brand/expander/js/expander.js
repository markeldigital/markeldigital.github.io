ds.expander = (function() {
    var scope = this;

    scope.toggle = function(expanderElement) {
        var openClass = "ds-expander--open";
        var isOpen = expanderElement.classList.contains(openClass);
        if (isOpen) {
            expanderElement.classList.remove(openClass);
        }
        else {
            expanderElement.classList.add(openClass);
        }
    };

    scope.setup = function () {
        var expanderTriggers = document.querySelectorAll('.ds-expander__trigger');

        for (var i = 0; i < expanderTriggers.length; i++) {
            expanderTriggers[i].addEventListener('click', function (e) {
                e.preventDefault();

                var expander = e.currentTarget.parentNode;
                scope.toggle(expander);
            });
        }
    };

    return scope;
})();


window.addEventListener("load", function () {
    ds.expander.setup();
});
