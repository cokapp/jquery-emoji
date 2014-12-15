angular.module('cokjs.emoji')
    .directive('emojiSwitcher', function() {
        return {
            restrict: 'A',
            scope: {
                emoji: '=emojiBind'
            },          
            link: function($scope, el, attrs) {
                var config = {
                    name: attrs.emojiSwitcher,
                    basepath: attrs.emojiBasepath,
                    position: attrs.emojiPosition,
                    onselected: function(emjtext, emj){
                        $scope.emoji += emjtext;
                        $scope.$apply();
                    }
                };
                el.cokEmoji(config);
            }
        };
    })
