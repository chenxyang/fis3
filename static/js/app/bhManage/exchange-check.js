$(function() {
	var code = getQueryString('code');
	var view = getQueryString('v');
	
	view = view == '1'?true:false;
	
	
	
	reqApi({
        code: '627006',
    }, true).then(function (data) {
        var items = data.map(function (item) {
            return {
                level: item.level,
                name: item.name
            };
        });
        
        
        var fields = [{
        field : 'code1',
        title : '订单编号',
        formatter : function (v, data) {
            return data.code
        }
    },{
    	field : 'changeProductName',
    	title : '产品名称'
    },{
        field : 'amount',
        title : '付款金额',
        formatter: moneyFormat
    }, {
        field : 'status',
        title : '订单状态',
        search: true,
        type: 'select',
        key : 'change_product_status',
        formatter : Dict.getNameForList('change_product_status')
    },{
        field: 'realName',
        title: '下单代理',
        formatter : function(v, data) {
         	return data.user?data.user.realName : '-'
        }
    },{
    	field: 'level1',
        title: '下单代理等级',
        formatter : function(v, data) {
        	var level = '';
          	items.map(function(item) {
           		if(item.level == data.user.level) {
           			level = item.name
           		}
           	})
           	return level
        }
    },{
        field : 'applyDatetime',
        title : '下单日期',
        formatter: dateTimeFormat
    }, {
        field : 'approveNote',
        title : '审核备注',
        readonly : false
    }];
	
	
	var buttons = [{
        title: '通过',
        handler: function() {

            var data = $('#popForm').serializeObject();
            data.code = code;
            data.result = "1";
            data.approver = getUserName();
            data.approveNote = $('#approveNote').val();
            reqApi({
                code: '627792',
                json: data
            }).done(function(data) {
                sucDetail();
            });

        }
    }, {
        title: '不通过',
        handler: function() {
            var data = $('#popForm').serializeObject();
            data.code = code;
            data.result = "0";
            data.approver = getUserName();
            data.approveNote = $('#approveNote').val();
            reqApi({
                code: '627792',
                json: data
            }).done(function(data) {
                sucDetail();
            });
        }
    }, {
        title: '取消',
        handler: function() {
            dw.close().remove();
        }
    }];

	buildDetail({
		fields: fields,
		code: code,
        view : view,
        buttons : buttons,
		detailCode: '627803',
	});
        
        
       })
    
	
});