(function () {
    'use strict';

    angular
        .module('pg.skyscrapers')
        .directive('skyscraperSizer', skyscraperSizerDirective);

    skyscraperSizerDirective.$inject = ['SkyscrapersUtils'];

    function skyscraperSizerDirective(SkyscrapersUtils) {
        return {
            restrict: 'EA',
            replace: true,
            require: '^skyscraper',
            link: {
                pre: function ($scope, $element, $attrs, skyscraperController) {
                    skyscraperController.setSizer($element);
                }
            }
        };
    }
})();