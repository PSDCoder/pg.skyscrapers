(function () {
    'use strict';

    angular
        .module('pg.skyscrapers')
        .directive('skyscraperItem', skyscraperItemDirective);

    function skyscraperItemDirective() {
        return {
            restrict: 'EA',
            replace: true,
            require: '^skyscraper',
            link: function ($scope, $element, $attrs, skyscraperController) {
                skyscraperController.addItem($element);

                $scope.$on('$destroy', function () {
                    skyscraperController.removeItem($element);
                });
            }
        };
    }
})();