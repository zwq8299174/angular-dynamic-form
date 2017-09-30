define(['angular', 'text!tpl/demo.html', 'require', 'nprogress', 'sweetalert'], function(angular, tpl, require, NProgress, swal) {
	function controller($scope, appApi, dataFormat) {
		NProgress.done();
		$scope.formModel = {};
		$scope.filterBarModel = {};
		$scope.drapListSearch = function(name) {
			return $scope.inputKey == undefined || $scope.inputKey == '' || name.indexOf($scope.inputKey) > -1;
		};
		$scope.itemClick = (e, n, i) => {
			if(i == $scope.filterBarModel.id) {
				e.stopPropagation();
				e.preventDefault();
				return;
			};
			$scope.filterBarModel.id = i;
			$scope.filterBarModel.name = n;
			$scope.filterData = getfilterData($scope.filterBarModel.id);
		};
		appApi.getProject((data)=>{
			$scope.filterModel = data;
			$scope.filterBarModel.id = data[0].id;
			$scope.filterBarModel.name = data[0].name;
			$scope.filterData = getfilterData($scope.filterBarModel.id);
		});
		function getfilterData(id) {
			var tmp;
			$scope.filterModel.forEach(function(item, index) {
				if(item.id == id) {
					tmp = $.extend(true, {}, item);
					$scope.formModel = $.extend(true, {}, item);
				}
			});
			initFormModel();
			return tmp;
		};
		function initFormModel() {
			$scope.formModel.items.forEach((item, index) => {
				item.conditions = [];
				if(index == 1) {
					item.conditions.push({
						id: 3,
						display: '近14天',
						val: 'last14D'
					});
				}
			});
		};
		//$scope.filterData = getfilterData($scope.filterBarModel.id);
		console.log($scope.filterData);
		$scope.Query = () => {
			console.log($scope.formModel);
		}
	};
	return {controller: controller, tpl: tpl};
});