var ds = function(){
    var scope = {};
    scope.prefix = 'ds';

    scope.keyboard = {
        // Note: only use these with keyup...not keypress. See: http://www.javascripter.net/faq/keycodes.htm
        tab: 9,
        space: 32,
        enter: 13,
        up: 38,
        down: 40,
        left: 37,
        right: 39
    };

    scope.respondTo = function(breakpoint, lessThanOrEqualToBreakpointCallback, greaterThanBreakpointCallback){
        if(window.innerWidth > breakpoint) {
            greaterThanBreakpointCallback();
        } else {
            lessThanOrEqualToBreakpointCallback();
        }
    };

    scope.respondToPalmVsLapAndDesk = function(palmCallback, lapAndDeskCallback, event){
        var palmBreakpoint = window.getComputedStyle(document.querySelector('html'), ':before').content;
        palmBreakpoint = Number(palmBreakpoint.replace(/['"]/g, ""));

        if(event){
            window.addEventListener(event, function() {
                scope.respondTo(palmBreakpoint, palmCallback, lapAndDeskCallback);
            }, true);
        } else {
            scope.respondTo(palmBreakpoint, palmCallback, lapAndDeskCallback);
        }
    };

    return scope;
}();
