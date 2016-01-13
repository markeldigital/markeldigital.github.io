function scrollAndExpand() {

    var scrollTriggers = document.getElementsByClassName("scroll-and-expand");

    for (var i = 0; i < scrollTriggers.length; i++) {
        scrollTriggers[i].addEventListener("click", function (e) {
            var questionIdToExpand = e.currentTarget.getAttribute("href");
            var question = document.querySelector(questionIdToExpand);
            if (!question.classList.contains('ds-expander--open')) {
                question.classList.add('ds-expander--open');
            }
        }, false);
    }
};

window.addEventListener("load", function () {
    scrollAndExpand();
});