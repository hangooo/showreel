$(function(){
	$(".list-text").on("click",function(){
		var $menu = $(this).children(".panel");
		$menu.show(500);
		var other = $(this).siblings().children(".panel");
		other.hide(500);
	})
	$(".personal-details").on("click",function(){
		var $div = $(this).children(".div1");
		$div.toggle(500);
	})
	$("#e-mail1").on("click",function(){
		var $em = $(this).next(".e-mail");
		$em.toggle(500);
	})
	$("#message1").on("click",function(){
		var $em = $(this).next(".message");
		$em.toggle(500);
	})
});
