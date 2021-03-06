define(['angular','js.cookie','baseSet', 'jquery', 'sweetalert','Ps'], function(angular,Cookies,baseSet,$,swal) {
	'use strict';
	var userInfo =Cookies.getJSON('user')?Cookies.getJSON('user'):{};
	console.log(userInfo);
	var appServices = angular.module('app.services', []);
	appServices.service('login', function($http, $rootScope) {
		this.check=function(fn){
//			if(userInfo!=null&&userInfo!=undefined&&userInfo!=''&&userInfo.token){
				fn(userInfo.token);
//			}else{
//				window.location.href='login.html';
//			};
		};
		this.logout=function(e){
			Cookies.remove('user');
			window.location.href='login.html';
		}
	});
	appServices.service('appHttp', function($http,login){
		this.appGet = function(obj) {
			var suc = obj.success ? obj.success : function(e) {
				console.log(e);
			};
			var com = obj.complete ? obj.complete : function(e) {
			};
			var err = obj.error ? obj.error : function(e) {
				console.log(e);
			};
			delete obj.success;
			delete obj.complete;
			delete obj.error;
			login.check(function(token){
				var getModel = {
					url: '',
					method: 'GET',
					params: '',
					headers: {
						 token: token
					}
				};
				getModel = angular.merge({},getModel, obj);
				$http(getModel).then(function(response) {
					if(response.data.code == 0) {
						suc(response.data.data);
						if(getModel.deferred){
							getModel.deferred.resolve(response.data.data);
						}
					} else {
						if(response.data.code == -1000) {
							swal({
								title: '登录信息异常,请重新登录',
								confirmButtonText: '确定',
								onClose: function() {
									window.location.href = 'login.html';
								}
							});
						} else {
							swal({
								title: '错误信息',
								text: response.data.message,
								type: 'error',
								confirmButtonText: '确定'
							}).then(function () {
								$('.inline-loading').remove();
							});
						}
					}
					com(response);
				}, function(response) {
					console.log(response);
					swal({
						title: '错误信息',
						text: '服务器/网络错误，请稍后再试。',
						type: 'error',
						confirmButtonText: '确定',
						debug:true,
						errorInfo:JSON.stringify(response)
					}).then(function () {
						console.log(666)
						$('.inline-loading').remove();
					});
					err(response);
				});
			});
		};
		this.appDel = function(obj) {
			var suc = obj.success ? obj.success : function(e) {
				console.log(e);
			};
			var com = obj.complete ? obj.complete : function(e) {
			};
			var err = obj.error ? obj.error : function(e) {
				console.log(e);
			};
			delete obj.success;
			delete obj.complete;
			delete obj.error;
			login.check(function(token,id){
				var delModel = {
					url: '',
					method: 'DELETE',
					params: '',
					headers: {
//						'token': token
					}
				};
				delModel = angular.merge({},delModel, obj);
				$http(delModel).then(function(response) {
					if(response.data.code == 0) {
						suc(response.data.data);
						if(delModel.deferred){
							delModel.deferred.resolve(666);
						}
					} else {
						if(response.data.code == -1000) {
							swal({
								title: '登录信息异常,请重新登录',
								confirmButtonText: '确定',
								onClose: function() {
									window.location.href = 'login.html';
								}
							});
						} else {
							swal({
								title: '错误信息',
								text: response.data.message,
								type: 'error',
								confirmButtonText: '确定'
							}).then(function () {
								$('.inline-loading').remove();
							});
						}
					}
					com(response);
				}, function(response) {
					console.log(response);
					swal({
						title: '错误信息',
						text: '服务器/网络错误，请稍后再试。',
						type: 'error',
						confirmButtonText: '确定',
						debug:true,
						errorInfo:JSON.stringify(response)
					}).then(function () {
						$('.inline-loading').remove();
					});
					err(response);
				});
			});
		};
		this.appPost = function(obj) {
			var suc = obj.success ? obj.success : function(e) {
				console.log(e);
			};
			var com = obj.complete ? obj.complete : function(e) {
//				console.log(e);
			};
			var err = obj.error ? obj.error : function(e) {
				console.log(e);
			};
			delete obj.success;
			delete obj.complete;
			delete obj.error;
			login.check(function(token){
				var getModel = {
					url: '',
					method: 'POST',
					data: '',
					headers: {
						token: token
					}
				};
				getModel = angular.merge({},getModel, obj);
				$http(getModel).then(function(response) {
					if(response.data.code == 0) {
						suc(response.data.data);
					} else {
						if(response.data.code == -1000) {
							swal({
								title: '登录信息异常,请重新登录',
								confirmButtonText: '确定',
								onClose: function() {
									window.location.href = 'login.html';
								}
							});
						} else {
							swal({
								title: '错误信息',
								text: response.data.message,
								type: 'error',
								confirmButtonText: '确定'
							}).then(function () {
								$('.inline-loading').remove();
							});
						}
					}
					com(response);
				}, function(response){
					console.log(response);
					swal({
						title: '错误信息',
						text: '服务器/网络错误，请稍后再试。',
						type: 'error',
						confirmButtonText: '确定',
						debug:true,
						errorInfo:JSON.stringify(response)
					}).then(function (){
						$('.inline-loading').remove();
					});
					err(response);
				});
			});
		}
	});
	appServices.service('appApi', ['$q','appHttp', function($q,appHttp) {
		this.getProject = function(suc,com,err) {
			appHttp.appGet({
				url: baseSet.postServer + 'mockService/dynamicForm',
				success: suc,
				complete: com,
				error: err
			})
		};
		this.getDataTable = function(suc,com,err) {
			appHttp.appGet({
				url: baseSet.postServer + 'mockService/dataTable',
				success: suc,
				complete: com,
				error: err
			})
		};
	}]);
	appServices.service('debug',function() {
		$(document).off('click','.icon-debug',function(){});
		$(document).on('click','.icon-debug',function(){
			swal({
				title: '错误信息',
				text: JSON.stringify($(this).data('config')),
				type: 'error',
				confirmButtonText: '确定',
				debug:false
			});
		});
	});
	appServices.service('ArrayhasObj',function() {
		Array.prototype.hasObj = function(obj){
			var result = -1;
			this.forEach((item,index)=>{
				if(JSON.stringify(item)==JSON.stringify(obj)){
					result = index;
				}
			});
			return result;
		};
	});
	appServices.service('dropdownMenuScrollbar',function($rootScope){
		$(document).on('shown.bs.dropdown','.dropdown',function(){
			var $list = $(this).find('ul').parent('div');
			var $bar = $list.find('.ps-scrollbar-y');
			var listHiehgt = $list.find('ul').height();
			var $input = $(this).find('input');
			if($list.find('li').length==0||$list.outerHeight()<205) return;
			if($input.length>0){
				$input.on('input',function(){
					$list.perfectScrollbar('update');
				});
			};
			if($list.find('.ps-scrollbar-y-rail').length>0){
				$list.perfectScrollbar('update');
			}else{
				$list.perfectScrollbar({
	        		suppressScrollX: true
	        	});
//	        	if($bar.height()==0&&listHiehgt>205){
//	        		console.log($list.find('ul').height());
//					$bar.height((205/listHiehgt)*205);
//					$list.addClass('ps-active-y');
//				}
			};
		});
	});
});