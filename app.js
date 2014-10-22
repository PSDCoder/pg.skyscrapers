angular
    .module('skyscrapers', ['pg-skyscrapers'])
    .service('ImagesLoader', function () {
        this.getImages = function (num) {
            var images = [];

            for (var i = 0; i < num; i++) {
                images.push({
                    url: 'http://lorempixel.com/500/' + Math.ceil(Math.random() * 800 + 401)
                });
            }

            return images;
        };
    })
    .controller('ImagesGrid', function ($scope, ImagesLoader, $timeout) {
        $scope.images = [];
        $scope.loading = false;
        $scope.loadMore = function (num) {
            if ($scope.loading) {
                return;
            }

            $scope.loading = true;
            $scope.$evalAsync(function () {
                angular.forEach(ImagesLoader.getImages(num), function (item) {
                    $scope.images.push(item);
                });
                $timeout(function () {
                    $scope.loading = false;
                }, 1000);
            });
        };

        $scope.loadMore(20);
    })
    .directive('scrollLoader', ['SkyscrapersUtils', function (SkyscrapersUtils) {
        return {
            restrict: 'A',
            scope: {
                callback: '&scrollLoaderCallback',
                onDocument: '@scrollLoaderOnDocument',
                offset: '@scrollLoaderOffset'
            },
            link: function($scope, $element) {
                if (!$scope.offset) {
                    throw new Error('"scrollLoaderOffset" is obligatory parameter');
                }

                if (!$scope.callback) {
                    throw new Error('"scrollLoaderCallback" is obligatory parameter');
                }

                var $document = angular.element(document);
                var $window = angular.element(window);
                var offset = parseInt($scope.offset, 10);
                var getEementBottom = function () {
                    return $scope.onDocument === 'true' ? $document.height() : ($element.offset().top + $element.outerHeight());
                };
                var getScroll = function () {
                    return $document.scrollTop() + $window.height();
                };

                $window.on('scroll', SkyscrapersUtils.throttle(function () {
                    if (getEementBottom() - getScroll() < offset) {
                        $scope.callback();
                    }
                }, 100));
            }
        };
    }]);
