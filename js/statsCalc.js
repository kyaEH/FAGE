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
var Force = document.getElementById("Force");
var Constitution = document.getElementById("Constitution");
var Agilité = document.getElementById("Agilité");
var Dexterité = document.getElementById("Dexterité");
var Intelligence = document.getElementById("Intelligence");
var Concentration = document.getElementById("Concentration");
//give Title to all of them that includes the stats changing color and stats ratio
/*
  const precision = Math.min(18, 9 + Math.round(Agilité / 3 + Dextérité / 2 + precision_bonus));
  const degatphys = Math.round(Force * 1 + degats_bonus);
  const magie = Math.round(Intelligence * 1.2 + Concentration / 1.75 + magie_bonus);
  const critique = Math.round(Force / 2 + Agilité / 2 + Concentration * 0.25);
  const buffdebuff = Math.min(17, 1 + Math.round(Concentration / 2 + Dextérité / 2 + Number(age.value)/20));
  const parade = Math.round(Constitution / 3 + parade_bonus);
  const RM = Math.round(Constitution / 4 + Intelligence / 3 + rm_bonus);
  const esquive = Math.max(
    10,
    Math.min(
      75,
      Math.round(Agilité + 90 - (Number(age.value) / 2 + Number(taille.value) / 10 + Number(poids.value) / 5))
    )
  );
  const rapidite = Math.floor(6 + Agilité * 1.75 + Concentration * 0.6 + rapidite_bonus + (10 - Number(taille.value) / 20));
  const furtivite = Math.min(17, Math.max(4, Math.round(3 + Math.floor(Agilité / 2 + Concentration / 2.5))));
  const perception = Math.min(17, Math.floor(8 + Intelligence / 2 + Concentration * 0.75));
  const powerMax = Math.floor(2 + Intelligence * 1.25 + Dextérité * 0.75);
  const healthMax = Math.floor(10 + Force * 1.25 + Constitution * 2 + Number(poids.value) / 15 + Number(level.value));
  const charisme = Math.min(17, 5 + Math.floor(Constitution / 1.75 + Intelligence / 1.75 + charisme_bonus + Number(taille.value) / 75));
   */
Force.title = "Dégâts x 1, Critique x 0.5";
Constitution.title = "Parade x 0.33, Résistance magique x 0.25, Charisme x 0.25";
Agilité.title = "Précision x 1, Rapidité x 1.75, Furtivité x 0.5, Esquive x 1, Critique x 0.5";
Dexterité.title = "Précision x 1, Rapidité x 1.75, Buff/Debuff x 0.5";
Intelligence.title = "Magie x 1.2, Résistance magique x 0.25, Puissance x 1.25, Charisme x 0.25, Perception x 0.5";
Concentration.title = "Magie x 1.2, Rapidité x 0.6, Furtivité x 0.5, Perception x 0.75, Buff/Debuff x 0.5, Critique x 0.5";



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

// on hover input
$("#Force").hover(function(){
	$("label[data-label='Dégâts']").css("color", "#62A83B");
	$("label[data-label='Critique']").css("color", "#62A83B");
	$("input[name='system.health.max']").css("background-color", "#62A83B");
}
, function(){
	$("label[data-label='Dégâts']").css("color", "var(--color-primary)");
	$("label[data-label='Critique']").css("color", "var(--color-primary)");
	$("input[name='system.health.max']").css("background-color", "rgba(0, 0, 0, 0.05)");
});
$("#Constitution").hover(function(){
	$("label[data-label='Parade']").css("color", "#62A83B");
	$("label[data-label='Résistance magique']").css("color", "#62A83B");
	$("label[data-label='Charisme']").css("color", "#62A83B");
	$("input[name='system.health.max']").css("background-color", "#62A83B");
}
, function(){
	$("label[data-label='Parade']").css("color", "var(--color-primary)");
	$("label[data-label='Résistance magique']").css("color", "var(--color-primary)");
	$("label[data-label='Charisme']").css("color", "var(--color-primary)");
	$("input[name='system.health.max']").css("background-color", "rgba(0, 0, 0, 0.05)");
});

$("#Agilité").hover(function(){
	$("label[data-label='Precision']").css("color", "#62A83B");
	$("label[data-label='Rapidité']").css("color", "#62A83B");
	$("label[data-label='Furtivité']").css("color", "#62A83B");
	$("label[data-label='Esquive']").css("color", "#62A83B");
	$("label[data-label='Critique']").css("color", "#62A83B");
	
}
, function(){
	$("label[data-label='Precision']").css("color", "var(--color-primary)");
	$("label[data-label='Rapidité']").css("color", "var(--color-primary)");
	$("label[data-label='Furtivité']").css("color", "var(--color-primary)");
	$("label[data-label='Esquive']").css("color", "var(--color-primary)");
	$("label[data-label='Critique']").css("color", "var(--color-primary)");
});

$("#Dexterité").hover(function(){
	$("label[data-label='Precision']").css("color", "#62A83B");
	$("label[data-label='Rapidité']").css("color", "#62A83B");
}
, function(){
	$("label[data-label='Precision']").css("color", "var(--color-primary)");
	$("label[data-label='Rapidité']").css("color", "var(--color-primary)");
});

$("#Intelligence").hover(function(){
	$("label[data-label='Magie']").css("color", "#62A83B");
	$("label[data-label='Résistance magique']").css("color", "#62A83B");
	$("label[data-label='Puissance']").css("color", "#62A83B");
	$("label[data-label='Charisme']").css("color", "#62A83B");
	$("label[data-label='Perception']").css("color", "#62A83B");
	$("input[name='system.power.max']").css("background-color", "#62A83B");
}
, function(){
	$("label[data-label='Magie']").css("color", "var(--color-primary)");
	$("label[data-label='Résistance magique']").css("color", "var(--color-primary)");
	$("label[data-label='Puissance']").css("color", "var(--color-primary)");
	$("label[data-label='Charisme']").css("color", "var(--color-primary)");
	$("label[data-label='Perception']").css("color", "var(--color-primary)");
	$("input[name='system.power.max']").css("background-color", "rgba(0, 0, 0, 0.05)");
});

$("#Concentration").hover(function(){
	$("label[data-label='Magie']").css("color", "#62A83B");
	$("label[data-label='Rapidité']").css("color", "#62A83B");
	$("label[data-label='Furtivité']").css("color", "#62A83B");
	//perception, buffdebuff, critique
	$("label[data-label='Perception']").css("color", "#62A83B");
	$("label[data-label='buffdebuff']").css("color", "#62A83B");
	$("label[data-label='Critique']").css("color", "#62A83B");
}
, function(){
	$("label[data-label='Magie']").css("color", "var(--color-primary)");
	$("label[data-label='Rapidité']").css("color", "var(--color-primary)");
	$("label[data-label='Furtivité']").css("color", "var(--color-primary)");
	//perception, buffdebuff, critique
	$("label[data-label='Perception']").css("color", "var(--color-primary)");
	$("label[data-label='buffdebuff']").css("color", "var(--color-primary)");
	$("label[data-label='Critique']").css("color", "var(--color-primary)");
});

$('#Dexterité').hover(function(){
	console.log("hover dextérité");
	$("label[data-label='Précision']").css("color", "#62A83B");
	$("label[data-label='Rapidité']").css("color", "#62A83B");
	$("input[name='system.power.max']").css("background-color", "#62A83B");
	$("label[data-label='buffdebuff']").css("color", "#62A83B");

}
, function(){
	$("label[data-label='Précision']").css("color", "var(--color-primary)");
	$("label[data-label='Rapidité']").css("color", "var(--color-primary)");
	$("label[data-label='buffdebuff']").css("color", "var(--color-primary)");
	$("input[name='system.power.max']").css("background-color", "rgba(0, 0, 0, 0.05)");
});

