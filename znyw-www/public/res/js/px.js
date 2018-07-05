$(function(){
	 $(".input-number").keyup(function(){
	  if(isNaN($(this).val()) || parseInt($(this).val())<1){
	   $(this).val("1");
	
	   return;
	  }
	
	 })
	
	})
	/*商品数量+1*/
	function numAdd(){
	 var num_add = parseInt($(".input-number").val())+1;
	 if($(".input-number").val()==""){
	  num_add = 1;
	 }
	 $(".input-number").val(num_add);
	
	}
	
	/*商品数量-1*/
	function numDec(){
	 var num_dec = parseInt($(".input-number").val())-1;
	 if(num_dec<1){
	  //购买数量必须大于或等于1
	  alert("not lt 1");
	 }else{
	  $(".input-number").val(num_dec);
	  
	}
}
	 