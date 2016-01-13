ds.menu = (function(keyboard, openClass, closedClass){
    var scope = {};

    var prefix = ds.prefix + '-menu';
    var selectors = {
        menuDropdownClass: prefix,
        triggerClass: prefix + '-trigger',
        subMenuClass: prefix + '-items',
        menuItemClass: prefix + '-item',
        closedClass: closedClass,
        openClass: openClass
    };

    scope.closeAllSubMenus = function(){
        var subMenus = getSubmenuFor(document);
        for(var i=0; i < subMenus.length; i++){
            scope.closeSubMenu(subMenus[i]);
        }
    };

    scope.respondToKeyboard = function(e) {
        if(keyboard.tab) {
            scope.closeAllSubMenus();
            if(e.currentTarget.parentNode.classList.contains(selectors.subMenuClass)){
                scope.openSubMenu(e.currentTarget.parentNode);
            } else if (e.currentTarget.parentNode.classList.contains(selectors.menuDropdownClass)){
                var parentDropdown = e.currentTarget.parentNode;
                var subMenu = parentDropdown.querySelector('.' + selectors.subMenuClass);
                scope.openSubMenu(subMenu);
            }
        }
    };

    scope.closeSubMenu = function(subMenu){
        subMenu.classList.remove(selectors.openClass);
        subMenu.classList.add(selectors.closedClass);
        subMenu.setAttribute('aria-hidden', 'true');
        subMenu.parentNode.classList.remove(selectors.openClass);
        subMenu.parentNode.classList.add(selectors.closedClass);
    };

    scope.openSubMenu = function(subMenu){
        subMenu.classList.remove(selectors.closedClass);
        subMenu.classList.add(selectors.openClass);
        subMenu.removeAttribute('aria-hidden');
        subMenu.parentNode.classList.remove(selectors.closedClass);
        subMenu.parentNode.classList.add(selectors.openClass);
    };

    scope.toggleSubMenu = function(e) {
        var subMenuID = '#' + e.currentTarget.getAttribute('aria-controls');
        var subMenu = document.querySelector(subMenuID);

        if (subMenu.classList.contains(selectors.openClass)) {
            scope.closeSubMenu(subMenu);
        } else {
            scope.closeAllSubMenus();
            scope.openSubMenu(subMenu);
        }
    };

    scope.setupEventHandlersOn = function(trigger, subMenu){
        trigger.onclick = function(e){
            scope.toggleSubMenu(e);
            e.preventDefault();
        };
        trigger.onkeyup = subMenu.onkeyup = function(e){
            scope.respondToKeyboard(e); };
    };

    var openSubmenuOnFocusInFor = function(submenu) {
        submenu.addEventListener('focusin', function(e){ scope.openSubMenu(submenu); });
    };


    var closeSubmenuWhenNotChromeWhenMenuLosesFocusFor = function(menu, submenu) {
        if (window.navigator.appVersion.indexOf('Chrome') === -1) {
            menu.addEventListener('focusout', function(e){ scope.closeSubMenu(submenu); });
        }
    };

    scope.setupLoseFocusHandlersOn = function(menu, subMenu){
        openSubmenuOnFocusInFor(subMenu);
        closeSubmenuWhenNotChromeWhenMenuLosesFocusFor(menu, subMenu);
    };

    scope.setAccessibilityAttributesOn = function(trigger, subMenu, subMenuItems, dropDownSequenceNumber){
        // Show that there is a dropdown to non-visual devices
        trigger.setAttribute('aria-haspopup', 'true');
        subMenu.setAttribute('role', 'menu'); // Marks it as a sub-menu

        // Show which dropdown the trigger controls
        subMenu.setAttribute('id', 'ds-sub-menu-' + dropDownSequenceNumber);
        trigger.setAttribute('aria-controls', 'ds-sub-menu-' + dropDownSequenceNumber);

        // Set trigger to be the label for the dropdown
        trigger.setAttribute('id', 'ds-menu-trigger-' + dropDownSequenceNumber);
        subMenu.setAttribute('aria-labelledby', 'ds-menu-trigger-' + dropDownSequenceNumber);

        for (var j=0; j < subMenuItems.length; j++) {
            subMenuItems[j].setAttribute('role', 'menuitem');
        }
    };

    var getDropdownsBy = function(selector) {
        return document.querySelectorAll('.' + selector);
    };

    var getTriggerFor = function(element) {
        return element.querySelector('.' + selectors.triggerClass);
    };

    var getSubmenuFor = function(element) {
        return element.querySelector('.' + selectors.subMenuClass);
    };

    var getSubmenuItemsFor = function(element) {
        return element.querySelectorAll('.' + selectors.menuItemClass);
    };

    var removeFromTabIndex = function(element) {
        element.setAttribute('tabIndex', '-1')
    };

    var setupMenu = function(menu, index) {
        removeFromTabIndex(menu);

        var trigger = getTriggerFor(menu);
        var subMenu = getSubmenuFor(menu);
        var subMenuItems = getSubmenuItemsFor(subMenu);

        scope.closeAllSubMenus();
        scope.setAccessibilityAttributesOn(trigger, subMenu, subMenuItems, index);
        scope.setupEventHandlersOn(trigger, subMenu);
        scope.setupLoseFocusHandlersOn(menu, subMenu);
    };

    scope.setup = function(){
         var dropdowns = getDropdownsBy(selectors.menuDropdownClass);
        for(var i=0; i < dropdowns.length; i++){
            setupMenu(dropdowns[i], i);
        }
    };

    return scope;
})(ds.keyboard, ds.prefix + '-open', ds.prefix + '-closed');

window.addEventListener("load", function () {
    ds.menu.setup();
});
