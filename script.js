$(document).ready(function () {
    /*
     * Нав-блоки работают так
     * nav__list - хранит список активных элементов, такие как кнопки и переключаются как radio
     * nav__detail - хранит контент, который выводиться в зависимости от выбранной кнопки
     */

    $(".nav__block .nav__list .nav__list--item").on("click", function () {
        let $this = $(this);

        $this
            .addClass("active")
            .siblings()
            .removeClass("active")
            .parents(".nav__block")
            .find(".nav__detail--item")
            .removeClass("active")
            .eq($this.index())
            .addClass("active");
    });

    /*
     * Аккордион работает так
     * box__accordion--header - шапка активный элемент
     * следующий элемнт после шапки будет контентом который открывается после нажатия на шапку
     */

    $(".box__accordion .box__accordion--header").on("click", function () {
        let $this = $(this),
            check = false;

        if (!$this.hasClass("active")) check = true;

        $this
            .parent(".box__accordion")
            .find(".active")
            .removeClass("active")
            .next()
            .slideUp("fast");

        if (check) $this.addClass("active").next().slideDown("fast");
    });
});
