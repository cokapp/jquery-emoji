angular.module('cokjs.emoji')
    .directive('emojiParser', function() {
        var cokEmoji = null;

        return {
            restrict: 'A',
            scope: {
                emoji: '=emojiBind'
            },
            link: function($scope, el, attrs) {
                $scope.emoji = '';
                $scope.$watch('emoji', function(newValue, oldValue) {
                    if (!cokEmoji) {
                        cokEmoji = $.cokEmoji.cache(attrs.emojiParser);
                    }

                    var html;
                    if (attrs.emojiParseto === 'image') {
                        html = cokEmoji.translate($scope.emoji, false);
                    } else {
                        html = cokEmoji.translate($scope.emoji, true);
                    }
                    el.html(html);

                }, false);
            }
        };
    })
