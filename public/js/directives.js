'use strict';

/*
 * Directive to create yes-no radio
 */

angular.module('testApp.system').directive('radioYesno', ['$compile',
function($compile){
return {
    restrict: 'E',
    scope: {
        sel : '=selEl',
        onSel : '&selCb'
    },
    replace: true,
    template : '<div></div>',

    link : function (scope, elem, attrs) {

        scope.selectables = [];
        scope.selection = null;

        var wellStr = '<div class="col-md-6 well"></div>';

        var yesStr = '<div>Yes</div>';
        var noStr = '<div>No</div>';

        scope.check = function (e, idx) {
            if (e.isSelected) {
                e.unselect()
            } else {
                for (var i in scope.selectables) {
                    scope.selectables[i].unselect();
                }
                e.select();
            }
            
            scope.$apply(function(){
                scope.sel = scope.selection;
            });

            scope.$apply(function(){
                scope.onSel();
            });
        };

        scope.create = function (str, idx) {

            var well = angular.element(wellStr);
            var span = angular.element(str);

            well.addClass('yesno-base');
            well.isSelected = false;

            $compile(well)(scope);
            $compile(span)(scope);

            well.append(span);
            elem.append(well);

            scope.selectables.push(well);

            well.removeAllClasses = function() {
                well.removeClass('yesno-base');
                well.removeClass('yesno-over');
                well.removeClass('yesno-sel');
            }

            well.bind('mouseenter',function() {
                if(!well.isSelected) {
                    well.removeAllClasses();
                    well.addClass('yesno-over');
                }
            });

            well.bind('mouseleave',function() {
                if (!well.isSelected) {
                    well.removeAllClasses();
                    well.addClass('yesno-base');
                }
            });

            well.bind('click',function() {
                scope.check(well, idx);
            });

            well.select = function () {
                scope.selection = idx;
                well.isSelected  = true;
                well.addClass('yesno-sel');
            }

            well.unselect = function () {
                scope.selection = null;
                well.isSelected  = false;
                well.removeAllClasses();
                well.addClass('yesno-base');
            }
        }

        scope.create(yesStr, 'yes');
        scope.create(noStr, 'no');   
    }
}
}]);

/*
 *  Directive to create image-based radio
 */

angular.module('testApp.system').directive('radioImages', ['$compile',
function($compile){
return {
    restrict: 'E',
    scope: {
        qst : '=questionAttr',
        sel : '=selEl',
        onSel : '&selCb'
    },
    replace: true,
    template : '<div></div>',

    link : function (scope, elem, attrs) {

        scope.selectables = [];
        scope.selection = null;

        var divStr = '<div class="col-md-4"></div>';
        var imgStr = '<img src="" alt="" height="112" width="92">'

        scope.check = function (e, idx) {
            if (e.isSelected) {
                e.unselect()
            } else {
                for (var i in scope.selectables) {
                    scope.selectables[i].unselect();
                }
                e.select();
            }
            
            scope.$apply(function(){
                scope.sel = scope.selection;
            });

            scope.$apply(function(){
                scope.onSel();
            });
        };

        scope.create = function (url, idx) {

            var divElem = angular.element(divStr);
            var imgElem = angular.element(imgStr);

            imgElem.attr('src', "../data/faces/" + url);
            imgElem.attr('class', 'radio-base');
            imgElem.isSelected = false;

            $compile(divElem)(scope);
            $compile(imgElem)(scope);

            divElem.append(imgElem);
            elem.append(divElem);

            scope.selectables.push(imgElem);

            imgElem.bind('mouseenter',function() {
                if(!imgElem.isSelected) {
                    imgElem.attr('class', 'radio-over');
                }
            });

            imgElem.bind('mouseleave',function() {
                if (!imgElem.isSelected) {
                    imgElem.attr('class', 'radio-base');
                }
            });

            imgElem.bind('click',function() {
                scope.check(imgElem, idx);
            });

            imgElem.select = function () {
                scope.selection = idx;
                imgElem.isSelected  = true;
                imgElem.attr('class', 'radio-sel');
            }

            imgElem.unselect = function () {
                scope.selection = null;
                imgElem.isSelected  = false;
                imgElem.attr('class', 'radio-base');
            }
        }

        for (var i in scope.qst.queries) {
            var idx = parseInt(i) + 1;
            var url = scope.qst.queries[i].image.url;
            scope.create(url, idx);   
        }
    }
}
}]);