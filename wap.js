$(function () {

    $("[btype]").click(function () {
        var self = this;
        var b = $(this).attr('bid');
        var t = $(this).attr('btype');
        if (b == -1) {
            return false;
        }
        $.post('/book/report/' + b + "/" + t, function () {
            alert("��л���ķ���!");
            $(self).attr("disabled", true).attr('bid', '-1').html("���ύ!");
        });
    });

    $(".btnLikeComment").click(function() {
        var self = this;
        $.post("/book/likeComment/" + $(this).attr("data-id"), function() {
            $(self).attr("disabled", true).html("����!");
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
	$reportBox += "<tr><td>�������ͣ�</td></tr>";
	$reportBox += '<tr><td class="td2"><span><input type="radio" name="reporttype" value="1"/>��������</span><span><input type="radio" name="reporttype" value="2"/>�½ڴ���</span><span><input type="radio" name="reporttype" value="3"/>û����¼</span><span><input type="radio" name="reporttype" value="4"/>��������</span></td></tr>';
	$reportBox += "<tr><td>�������ݣ�</td></tr>";
	$reportBox += "<tr><td><textarea class='reportCon'>"+content+"</textarea></td></tr>";
	$reportBox += "<tr><td class='submit'><a href='javascript:reportDo(\""+title+"\");'>�ύ</a></td></tr>";
	$reportBox += "</table><div id='close'>�ر�</div>";
	$("body").append('<div id="pagetip"></div><div id="reportBox">'+$reportBox+'</div>');
	$("#pagetip").height($documnetHeight);
	$("#pagetip").show().css("opacity","0.7");
	popup($("#reportBox"));
	$("#close").click(function(){reportClose()})
}
function reportDo(title){
	var val=$('input:radio[name="reporttype"]:checked').val();
	if(val==null){
		alert("��ѡ�񱨴����ͣ�");
		return false;
	}
	else{
		 $reportType = val;
	}
	if($(".reportCon").val() != ""){
		$reportCon = $(".reportCon").val();
	}
	else{
		alert("����д�������ݣ�");
		return false;
	}

	$.ajax({
	type:'POST',url:'/report.php',data:"type="+$reportType+"&title="+title+"&content="+$reportCon,error: function(){tip("�ύ����ʧ�ܣ�����ϵ����Ա��")},
	success: function(data){d = $.trim(data);
			if(d == 1){alert('�ύ����ɹ���');reportClose()}
			else if(d == 2){alert('��ѡ�񱨴����ͺ���д�������ݣ�');}
			else if(d == 3){alert('�ύʧ�ܣ����зǷ��ַ���')}
			else if(d == 4){alert('δ��¼�����¼�����ύ����');}
			else{alert('�ύ����ʧ�ܣ�����ϵ����Ա��')}
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
				$('#sj').animate({left:"-5px"},20).animate({left:"10px"},20).animate({left:"-10px"},20).animate({left:"0px"},20).html('�Ѽ������');
				tip("�ɹ�������ǩ");
			}
			else{
				tip("δ��¼��������ת����¼ҳ...")
				setTimeout('TimeTo("/login.php?jumpurl=%2Fbook%2F'+aid+'%2F'+cid+'.html")',1500);
			}
		});
}
function case_del(aid){
	$.post("/ajax.php",{"aid":aid,"case_del":"1"},function(data){
		$("#"+aid).html("<tr><td class='del1'>ɾ���У����Ժ�...</td></tr>");if(data != ""){
			$("#"+aid).html("<tr><td class='del1'>�Ѵ����ɾ����</td></tr>");
			tip("�Ѵ����ɾ����");
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
		if(e=='4') alert("δ֪����!");
		if(e=='1') alert("��л�����Ƽ�!");
		if(e=='2') alert("һ��ֻ���Ƽ�һ��!");
    });
}
function txtshow1() {
}

function f2() {
}


function f1() {
    document.write('');
}

function tongji() {//ͳ��
    document.write('');
}

