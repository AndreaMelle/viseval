'use strict';


angular.module('common', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'ngTable', 'common.participants', 'common.questions']);

angular.module('adminApp', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'ngTable', 'adminApp.system', 'common.participants', 'common.questions']);

angular.module('testApp', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'ngTable', 'testApp.system', 'common.participants', 'common.questions']);

angular.module('adminApp.system', []);
angular.module('testApp.system', []);

angular.module('common.participants', []);
angular.module('common.questions', []);