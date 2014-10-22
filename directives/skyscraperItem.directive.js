(function () {
    'use strict';

    angular
        .module('pg.skyscrapers')
        .directive('skyscraperItem', skyscraperItemDirective);

    skyscraperItemDirective.$inject = ['$timeout'];

    function skyscraperItemDirective($timeout) {
        return {
            restrict: 'EA',
            replace: true,
            require: '^skyscraper',
            link: function ($scope, $element, $attrs, skyscraperController) {
                $timeout(function () {
                    skyscraperController.addItem($element);
                });
                $scope.$on('$destroy', function () {
                    skyscraperController.removeItem($element);
                });
            }
        };
    }
})();