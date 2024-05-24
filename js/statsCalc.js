/*
$("#longrest").click(function(){
	$("#pvact").val($("#pvmax").val());
	$("#manaact").val($("#manamax").val());
	if($("#fatigue").val() > 0){
		$("#fatigue").val("0");
	}
}); 
*/
// onclick by name for longrest button
$("button[name='longrest']").click(function(){
	//each input pvact then set value to pvmax
	$("input[name='pvact']").val($("input[name='pvmax']").val());
	//each input manaact then set value to manamax
	$("input[name='manaact']").val($("input[name='manamax']").val());
});
