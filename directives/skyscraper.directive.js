(function () {
    'use strict';

    angular
        .module('pg.skyscrapers')
        .directive('skyscraper', skyscraperDirective);

    skyscraperDirective.$inject = ['SkyscrapersUtils'];

    function skyscraperDirective(SkyscrapersUtils) {
        return {
            restrict: 'EA',
            replace: true,
            controller: 'SkyscraperContainerCtrl',
            controllerAs: 'ctrl',
            link: {
                pre: function ($scope, $element, $attrs) {
                    var $window = angular.element(window);
                    var $iframe;
                    var $iframeWindow;
                    var debouncedResizeHandler = SkyscrapersUtils.debounce(function () {
                        $scope.ctrl.layout();
                    }, 100);

                    $scope.ctrl.setContainer($element);

                    if ($attrs.skyscraperVisibleClass) {
                        $scope.ctrl.setVisibleClass($attrs.skyscraperVisibleClass);
                    }

                    $attrs.$observe('skyscraperColumnWidth', handleWidth);

                    function handleWidth(value) {
                        var columnWidth = parseInt(value, 10);

                        if (!isNaN(columnWidth)) {
                            $scope.ctrl.layout(columnWidth);
                        }
                    }

                    //on resize
                    $window.on('resize', debouncedResizeHandler);
                    $iframe = angular.element('<iframe></iframe>');
                    $iframe
                        .css({
                            position: 'absolute',
                            width: '100%',
                            height: 0,
                            margin: 0,
                            padding: 0,
                            border: 'none',
                            overflow: 'hidden',
                            opacity: 0
                        })
                        .on('load', function() {
                            $iframeWindow = angular.element($iframe[0].contentWindow);
                            $iframeWindow.on('resize', debouncedResizeHandler);
                        });
                    $element.append($iframe);

                }
            }
        };
    }
})();