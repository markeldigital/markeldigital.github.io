primaryNavigation = function(){
    var scope = {};

    var handleClick = function(){
        var primaryNavigationAndUtilityNavigationContent = document.querySelector('.primary-navigation-and-utility-navigation-content');
        var primaryNavigationAndUtilityNavigationContainer = document.querySelector('.primary-navigation-and-utility-navigation');

        if(primaryNavigationAndUtilityNavigationContainer.classList.contains('open'))
        {
            primaryNavigationAndUtilityNavigationContainer.classList.remove('open');
            primaryNavigationAndUtilityNavigationContent.classList.remove('open');
        } else {
            primaryNavigationAndUtilityNavigationContainer.classList.add('open');
            primaryNavigationAndUtilityNavigationContent.classList.add('open');
        }
    };

    scope.setup = function(){
        var mobileMenuTrigger = document.querySelector('.primary-navigation-and-utility-navigation-trigger-container a');
        mobileMenuTrigger.addEventListener('click', function(e){
            handleClick();
            e.preventDefault();
            return false;

        });
    };

    return scope;
}();

window.addEventListener("load", function () {
    primaryNavigation.setup();
});