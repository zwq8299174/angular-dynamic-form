define(['angular', 'text!tpl/data-table.html', 'require', 'nprogress'], function(angular, tpl, require, NProgress) {
	function controller($scope, appApi) {
		NProgress.done();
		$scope.formModel = {};
		$scope.tableName = '游戏配置表';
		$scope.opts = {
			columns: [
				{data: null,name:'操作'},//null表示有特殊情况，是按钮，或者返回的数据需要处理等等
				{data: 'id',name:'编号'},
				{data: 'match_item_type',name:'奖品大类型'},
				{data: 'game_type',name:'比赛类别'},
				{data: 'name',name:'比赛名称'},
				{data: 'match_mode',name:'比赛类型'},
				{data: 'min_start_player_num',name:'最少开赛人数'},
				{data: 'max_start_player_num',name:'最多开赛人数'},
				{data: 'can_int_min_coin',name:'金币场最低入门数量'},
				{data: 'can_in_max_coin',name:'金币场门槛最高'},
				{data: 'table_cost',name:'房费'},
				{data: 'max_point',name:'封顶分'},
				{data: 'init_base',name:'初始底分'},
				{data: 'base_increase_second',name:'底分增长间隔时间'},
				{data: 'base_times',name:'默认倍数'},
				{data: 'sign_cost',name:'报名消耗物品id和数量'},
				{data: 'icon_id',name:'对应图标显示'},
				{data: 'winner_rewards',name:'奖励获取的最后为名次'},
				{data: 'init_start_scores',name:'初始开始分'},
				{data: 'remain_player_num',name:'开始淘汰的剩余人数'},
				{data: 'second_round_player_number',name:'进入淘汰赛的人数'},
				{data: 'phase2_game_rounds',name:'淘汰赛进行的局数'},
				{data: 'early_show_hour',name:'比赛提前显示小时'},
				{data: 'early_exam_minute',name:'比赛提前报名分钟'},
				{data: 'date_mon_day',name:'定时赛开始的每个月的日期'},
				{data: 'date_week_day',name:'定时赛开始的每周几'},
				{data: 'date_day_hour',name:'定时赛开启的小时'},
				{data: 'date_hour_minute',name:'定时赛开始的分钟'},
				{data: 'allow_late_minutes',name:'定时赛允许迟到的秒数'},
				{data: 'open_flag',name:'开放标志'}
			],
			columnDefs: [
				{
					targets: 0,
					visible: true,
					render: function(data, type, row, meta) {
						return '<button class="btn btn-info btn-edit">编辑</button>'
					}
				}
			]
		};
		$('.data-table').on('click','.demo-data-table td',function(){//单元格点击
			console.log($scope.dt.api(true).cell($(this)).data());
			console.log($scope.dt.api(true).row($(this).parents('tr')).data());
		});
		appApi.getDataTable((data)=>{
			console.log($scope.dt);
			$scope.data = data;
			$scope.dt.fnClearTable();
			if(data.length==0) return;
			$scope.dt.fnAddData(data);
		});
		
	};
	return {controller: controller, tpl: tpl};
});