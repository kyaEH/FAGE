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
	console.log("longrest button clicked");
	//each input pvact then set value to pvmax
	$("input[name='system.health.value']").val($("input[name='system.health.max']").val());
	//each input manaact then set value to manamax
	$("input[name='system.power.value']").val($("input[name='system.power.max']").val());
	//system.attributes.fatigue.value
	if($("input[name='system.attributes.fatigue.value']").val() > 0){
		$("input[name='system.attributes.fatigue.value']").val("0");
	}
});
