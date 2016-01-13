window.addEventListener("load", function () {
    DSTabs(".ds-tabs");
});

function makeDefaultTabActiveOnPageLoad(tabsSelector, tabTriggerSelector, tabContentSelector) {
    var tabTriggers = document.querySelectorAll(tabsSelector + " " + tabTriggerSelector);
    var tabContentContainers = document.querySelectorAll(tabsSelector + " " + tabContentSelector);

    for (var i = 0; i < tabTriggers.length; i++) {
        if (tabTriggers[i].classList.contains('ds-tab-trigger--current')) {
            tabContentContainers[i].style.display = "block";
        }
    }
}

function hideAllTabs(tabContentContainers, tabTriggers) {
    for (var i = 0; i < tabContentContainers.length; i++) {
        tabContentContainers[i].style.display = "none";
    }
    for (var i = 0; i < tabTriggers.length; i++) {
        tabTriggers[i].classList.remove("ds-tab-trigger--current");
    }
}

function findClickedTabInParents(clickedElement) {
    while (clickedElement.getAttribute('href') === null && clickedElement.parentNode !== null) {
        clickedElement = clickedElement.parentNode;
    }
    return clickedElement;
}

function setTabAsActive(e) {
    var clickedElement = e.target || e.srcElement;
    var clickedTab = findClickedTabInParents(clickedElement);
    clickedTab.classList.add('ds-tab-trigger--current');
    var contentToShowSelector = clickedTab.getAttribute('href');
    var contentToShow = document.querySelector(contentToShowSelector);
    contentToShow.style.display = "block";
}

function switchTabs(e, tabsSelector, tabTriggerSelector, tabContentSelector) {
    var tabTriggers = document.querySelectorAll(tabsSelector + " " + tabTriggerSelector);
    var tabContentContainers = document.querySelectorAll(tabsSelector + " " + tabContentSelector);

    hideAllTabs(tabContentContainers, tabTriggers);
    setTabAsActive(e);
}

function setupClickHandlers(tabsSelector, tabTriggerSelector, tabContentSelector) {
    for (var i = 0; i < document.querySelectorAll(tabTriggerSelector).length; i++) {
        document.querySelectorAll(tabsSelector + " " + tabTriggerSelector)[i].addEventListener('click', function (e) {
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false; // IE8 fallback
            }
            switchTabs(e, tabsSelector, tabTriggerSelector, tabContentSelector);
        });
    }
}

function DSTabs(tabsSelector) {
    var tabTriggerSelector = ".ds-tab-trigger";
    var tabContentSelector = ".ds-tab-content";

    makeDefaultTabActiveOnPageLoad(tabsSelector, tabTriggerSelector, tabContentSelector);
    setupClickHandlers(tabsSelector, tabTriggerSelector, tabContentSelector);
}