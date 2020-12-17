$(function () {

    $("[btype]").click(function () {
        var self = this;
        var b = $(this).attr('bid');
        var t = $(this).attr('btype');
        if (b == -1) {
            return false;
        }
        $.post('/book/report/' + b + "/" + t, function () {
            alert("感谢您的反馈!");
            $(self).attr("disabled", true).attr('bid', '-1').html("已提交!");
        });
    });

    $(".btnLikeComment").click(function() {
        var self = this;
        $.post("/book/likeComment/" + $(this).attr("data-id"), function() {
            $(self).attr("disabled", true).html("已赞!");
        });

    });

    $("[reload]").click(function(){
        var type = $(this).attr('reload_type');
        var typeid = $(this).attr('reload');
        var reload_target = $(this).attr('reload_target');
        var n = Math.floor(Math.random() * 39 + 1);
        var p = "/book/statics/"+type+"_"+typeid+"_"+n+".html";
        $("#"+reload_target).load( p );

    });

});
function TimeTo(url){
	window.location.href= url;
}
$(function(){
	$documnetHeight = $(document).height();
    $scrollHeight = $(document).scrollTop();
    $windowHeight = $(window).height();
    $windowWidth = $(window).width();
});
function tip(ps){
	$(function(){
		$("body").append('<div id="pagetip"></div><div id="tipcon">'+ps+'</div>');
		$("#pagetip").height($documnetHeight);
		$tipconHeight = $("#tipcon").height();
		$("#tipcon").css("top",($scrollHeight+($windowHeight/2)-$tipconHeight)+"px");
		$("#pagetip").show().css("opacity","0.7").click(function(){$(this).remove();$("#tipcon").remove()});
		$("#tipcon").css("opacity","0.9");
	})	
}
function report(title,content){
	$reportBox = "<table>";
	$reportBox += "<tr><td>报错类型：</td></tr>";
	$reportBox += '<tr><td class="td2"><span><input type="radio" name="reporttype" value="1"/>更新慢了</span><span><input type="radio" name="reporttype" value="2"/>章节错误</span><span><input type="radio" name="reporttype" value="3"/>没有收录</span><span><input type="radio" name="reporttype" value="4"/>其他报错</span></td></tr>';
	$reportBox += "<tr><td>报错内容：</td></tr>";
	$reportBox += "<tr><td><textarea class='reportCon'>"+content+"</textarea></td></tr>";
	$reportBox += "<tr><td class='submit'><a href='javascript:reportDo(\""+title+"\");'>提交</a></td></tr>";
	$reportBox += "</table><div id='close'>关闭</div>";
	$("body").append('<div id="pagetip"></div><div id="reportBox">'+$reportBox+'</div>');
	$("#pagetip").height($documnetHeight);
	$("#pagetip").show().css("opacity","0.7");
	popup($("#reportBox"));
	$("#close").click(function(){reportClose()})
}
function reportDo(title){
	var val=$('input:radio[name="reporttype"]:checked').val();
	if(val==null){
		alert("请选择报错类型！");
		return false;
	}
	else{
		 $reportType = val;
	}
	if($(".reportCon").val() != ""){
		$reportCon = $(".reportCon").val();
	}
	else{
		alert("请填写报错内容！");
		return false;
	}

	$.ajax({
	type:'POST',url:'/report.php',data:"type="+$reportType+"&title="+title+"&content="+$reportCon,error: function(){tip("提交报错失败，请联系管理员！")},
	success: function(data){d = $.trim(data);
			if(d == 1){alert('提交报错成功！');reportClose()}
			else if(d == 2){alert('请选择报错类型和填写报错内容！');}
			else if(d == 3){alert('提交失败，含有非法字符！')}
			else if(d == 4){alert('未登录，请登录后再提交报错！');}
			else{alert('提交报错失败，请联系管理员！')}
		}
	});
}
function reportClose(){
	$('#pagetip,#reportBox').fadeOut(300);
}
function popup(popupName){
    var _scrollHeight = $(document).scrollTop(),
    _windowHeight = $(window).height(),
    _windowWidth = $(window).width(),
    _popupHeight = popupName.height(),
    _popupWeight = popupName.width();
    _posiTop = (_windowHeight - _popupHeight)/2 + _scrollHeight;
    _posiLeft = (_windowWidth - _popupWeight)/2;
    popupName.css({"left": _posiLeft + "px","top":_posiTop + "px","display":"block","z-Index":"99999999"});
}
function addbookcase(aid,cid){
	$.get('/ajax.php',{'addmark':'1','aid':aid,'cid':cid},
		function(data){
			data=data.replace(/\s/g,'');data=data.split("|");
			if(data[0]==1){
				$('#sj').animate({left:"-5px"},20).animate({left:"10px"},20).animate({left:"-10px"},20).animate({left:"0px"},20).html('已加入书架');
				tip("成功加入书签");
			}
			else{
				tip("未登录，正在跳转到登录页...")
				setTimeout('TimeTo("/login.php?jumpurl=%2Fbook%2F'+aid+'%2F'+cid+'.html")',1500);
			}
		});
}
function case_del(aid){
	$.post("/ajax.php",{"aid":aid,"case_del":"1"},function(data){
		$("#"+aid).html("<tr><td class='del1'>删除中，请稍后...</td></tr>");if(data != ""){
			$("#"+aid).html("<tr><td class='del1'>已从书架删除！</td></tr>");
			tip("已从书架删除！");
		}
	});
}
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function addToShelf (book_id){}

function hit(book_id){
    $.post('/book/hitBook/'+book_id,function(e){
        console.log(e);
    });
}

function like(book_id){
    $.post('/ajax.php?vote=1&aid='+book_id,function(e){
		e = e.replace(/\s/g,'');
        if(e=='3') location.href="/login.php?jumpurl=%2Fbook%2F"+book_id+".html";
		if(e=='4') alert("未知错误!");
		if(e=='1') alert("感谢您的推荐!");
		if(e=='2') alert("一天只能推荐一次!");
    });
}
function txtshow1() {
}

function f2() {
}


function f1() {
    document.write('');
}

function tongji() {//统计
    document.write('');
}

