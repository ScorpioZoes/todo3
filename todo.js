// $(document).ready(function(){
$(function(){
	var i = 3;
	var user = {result:[{
			id: 1,
			name: 'a',
			age: '18',
			sex: 'man'
	},{
			id: 2,
			name: 'b',
			age: '28',
			sex: 'woman'	
	}]};
	//Mustache的语法很简单，用两个大括号标记要绑定的字段即可，“{{}}”
	var template = '<table class="gridtable" cellpadding=0 cellspacing=0 class="tb"><tr><th>姓名</th><th>年龄</th><th>性别</th><th>删除</th><th>修改</th><th>详细信息</th></tr>{{#result}}<tr>{{#name}}<td>{{name}}</td><td>{{age}}</td><td>{{sex}}</td><td><a class="delete" id={{id}} href="javascript:;">删除</a></td><td><a class="revise" id={{id}} href="javascript:;">修改</a></td><td><a class="information" id={{id}} href="javascript:;">详情</a></td>{{/name}}</tr>{{/result}}</table>';
	var view = Mustache.render(template,user);
	$("#table").html(view);
	//大括号内的字段名称要和Mustache.render方法中的第二个参数中的对象的属性名一致
	//主要的渲染方法为Mustache.render，该方法有两个参数，第一个为要渲染的模版，也就是template，第二个就是数据源也就是user对象
	
	
	var input = $("#tpl-input").html();//将tpl-input模板定义为input
	$("#board").html(input);//使用add-container这个div作为tpl-input模板渲染的容器
	
	
	//点击提交 添加记录
	$("#BtnAdd").click(function add(){
		var name = $("input[name=name]").val();//通过input选择器name属性获取元素
		var age = $("textarea[name=age]").val();//通过textarea选择器name属性获取元素
		var sex = $("textarea[name=sex]").val();
		user.result.push({
			id: i,
			name: name,
			age: age,
			sex: sex,
		})
		i++;
		var view = Mustache.render(template,user);
		$("#table").html(view)
	});	

	//删除和修改 
	$("#mybody").on("click",".delete",function(e){ //监听id为mybody的div上的点击事件
		var $target = $(e.target);//找到点击事件源 将原生dom对象转换成jQuery对象
		var id = $target.attr('id');//利用jQuery对象获取id属性
		if($target.attr('class')=='delete'){//判断jquery对象的class是否为delete
			for(var i=0,l=user.result.length; i<l; i++){
				if(user.result[i].id == id){
					user.result[i].name = null;
				}
			}
			var Delete = Mustache.render(template,user);
			$("#table").html(Delete);
		}
	});

	$("#mybody").on("click",".revise",function(e){
			var $target = $(e.target);
			var id = $target.attr('id');
			var text = prompt("请输入你的名字，年龄，性别","")//弹出输入框第一个参数为默认提示信息，第二个参数为默认值
			if($target.attr('class')=='revise'){
				for(var i=0,l=user.result.length; i<l; i++){
					if(user.result[i].id == id){
						user.result[i].name = text.split(' ')[0];//将从弹出框输入的信息用中文字符“ ，”分隔成数组并写入
						user.result[i].age = text.split(' ')[1];
						user.result[i].sex = text.split(' ')[2];
					}
				}
			}
			var Revise = Mustache.render(template,user);
			$("#table").html(Revise);	
	});


	//查询关键字  
	$("#BtnSearch").click(function search(){
		var keyword = $("input[name=keyword]").val();
		var temp = {result:[]};
		for(var i = 0,l = user.result.length;i < l;i++){
			if(user.result[i].name.indexOf(keyword)!=-1){
				temp.result.push(user.result[i]);
			}
		}
	  	var Search = Mustache.render(template,temp);
	  	console.log(Search)    
		$("#table").html(Search);
	});
	//点击详情，弹出div2 
	$("#mybody").on("click",".information",function(e){
		var $target = $(e.target)//将原生dom对象转换成jQuery对象
		var sourceId = $target.attr('id')//利用jQuery对象获取id属性
		var id = (sourceId%5)+1;

			// $("#div2").html(" ");
			// if($target.attr('class')=='information'){//判断jquery对象的class是否为information
			// for(var i=0,l=user.result.length; i<l; i++){
			// 	if(user.result[i].id == id){
					$("#div2").html($(".p"+id).html());
					$('#div2').css("visibility","visible");
		// 		}
		// 	}
		// }	
		// $(document).click(function(){
	 	//$('#div2').hide();//点击页面使弹出页面隐藏
		// });
		// 	e.stopPropagation();
	});
});












