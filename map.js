$(document).ready(function () {
    /****************** Карта ******************/

    $(function () {
        //Запускаем основную функцию
        ymap();
    });

    //JS код для карт на главной странице!!!
    //Переменная для включения/отключения индикатора загрузки
    let spinner = $(".map").children(".loader"),
    //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
        check_if_load = false;

    //Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
    function init() {
        $("#map-yandex").html(
            '<iframe src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=1734826897" style="width:100%;height:640px;border:none;" scroll="false"></iframe>'
        );
    }

    // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
    function waitForTilesLoad(layer) {
        return new ymaps.vow.Promise(function (resolve, reject) {
            let tc = getTileContainer(layer),
                readyAll = true;
            tc.tiles.each(function (tile, number) {
                if (!tile.isReady()) {
                    readyAll = false;
                }
            });
            if (readyAll) {
                resolve();
            } else {
                tc.events.once("ready", function () {
                    resolve();
                });
            }
        });
    }

    function getTileContainer(layer) {
        for (let k in layer) {
            if (layer.hasOwnProperty(k)) {
                if (
                    layer[k] instanceof
                    ymaps.layer.tileContainer.CanvasContainer ||
                    layer[k] instanceof ymaps.layer.tileContainer.DomContainer
                ) {
                    return layer[k];
                }
            }
        }
        return null;
    }

    // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
    function loadScript(url, callback) {
        let script = document.createElement("script");

        if (script.readyState) {
            // IE
            script.onreadystatechange = function () {
                if (
                    script.readyState == "loaded" ||
                    script.readyState == "complete"
                ) {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            // Другие браузеры
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    // Основная функция, которая проверяет когда мы навели на блок с классом map
    function ymap() {
        $(".map").mouseenter(function () {
            if (!check_if_load) {
                // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

                // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                check_if_load = true;

                // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                spinner.addClass("is-active");

                // Загружаем API Яндекс.Карт
                loadScript(
                    "https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1",
                    function () {
                        // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
                        ymaps.load(init);
                    }
                );
            }
        });
    }
});