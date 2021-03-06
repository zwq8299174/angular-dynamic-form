'use strict';

define(['angular'], function (angular) {
  try {
    var module = angular.module('app.template');
  } catch (e) {
    var module = angular.module('app.template', []);
  };
  angular.module('app.template').run(['$templateCache', function ($templateCache) {
    $templateCache.put('data-table.html', '<div class="module-wrapper data-table"><div class="row"><div class="col-xs-12"><div class="x_panel"><div class="x_title"><h2>data-table</h2></div><div class="x_content"><ng-table cless="demo-data-table" data="data" opts="opts" name="tableName" dt="dt"></ng-table></div></div></div></div></div>');
  }]);

  angular.module('app.template').run(['$templateCache', function ($templateCache) {
    $templateCache.put('demo.html', '<div class="module-wrapper demo"><div class="row"><div class="col-xs-12"><div class="x_panel"><div class="x_title"><h2>DEMO</h2></div><div class="x_content"><div class="filter-bar form-line clearfix"><div class="form-left"><div class="form-tag">项目</div></div><div class="form-right"><div class="form-item no-border only col-md-2 col-sm-12 col-xs-12"><div class="channel-drapdown dropdown select form-content transition-02"><a href="#" class="dropdown-toggle clearfix" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false"><span class="val pull-left" ng-bind="filterBarModel.name"></span><div class="pull-right"><span class="caret icon-arrow"></span></div></a><div class="dropdown-menu search animated fadeInUpSmall fast" role="menu"><ng-input class="sm" icon-left="&#xe623;" model="inputKey" type="text" placeholder="搜索项目"></ng-input><div class="dropdown-list clearfix"><ul class="clearfix"><li role="presentation" ng-repeat="item in filterModel" ng-bind="item.name" ng-click="itemClick($event,item.name,item.id)" ng-show="drapListSearch(item.name)" ng-class="{\'active\':filterBarModel.id===item.id}"></li></ul></div></div></div></div></div></div><div class="fliter-bar-wrapper" ng-repeat="item in filterData.items" ng-init="itemIndex = $index"><flt-checkbox ng-if="item.type==\'checkbox\'" model="formModel.items[itemIndex]" data="item"></flt-checkbox><flt-radio ng-if="item.type==\'radio\'" model="formModel.items[itemIndex]" data="item"></flt-radio><flt-checkbox-input ng-if="item.type==\'checkboxInput\'" model="formModel.items[itemIndex]" data="item"></flt-checkbox-input><flt-radio-date ng-if="item.type==\'radioDate\'" model="formModel.items[itemIndex]" data="item"></flt-radio-date><flt-select ng-if="item.type==\'select\'" model="formModel.items[itemIndex]" data="item"></flt-select><flt-input ng-if="item.type==\'input\'" model="formModel.items[itemIndex]" data="item"></flt-input></div><div class="filter-bar form-line clearfix"><div class="form-item col-md-2 col-sm-12 col-xs-12"><button type="submit" class="btn btn-success btn-query" ng-click="Query($event)"><span>查询</span> <i class="icon-loading"></i></button></div></div></div></div></div></div></div>');
  }]);
});