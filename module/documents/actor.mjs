/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */

function htmlDecode(input) {
	var doc = new DOMParser().parseFromString(input, "text/html");
	return doc.documentElement.textContent;
  }
export class BoilerplateActor extends Actor {
  /** @override */

  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    
    super.prepareData();
  }
  
  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }
  
  
  /**
   * @override
   * Augment the actor source data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
prepareDerivedData() {
  
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.boilerplate || {};

    //if actor is not npc
    if (actorData.type !== 'npc') {
    // if actorData.flags["fvtt-paper-doll-ui"].slots is not undefined 
      var degats_bonus = 0;
      var parade_bonus = 0;
      var magie_bonus = 0;
      var rapidite_bonus = 0;
      var charisme_bonus = 0;
      var precision_bonus = 0;
      var rm_bonus = 0;
      var quantityMax = 0;
      actorData.system.attributes.level.value = Math.floor(Math.max(1, Math.sqrt(Number(actorData.system.attributes.experience.value) / 5)) - 1);

      if (actorData.flags?.["fvtt-paper-doll-ui"]?.slots) {
        //for each actorData.flags["fvtt-paper-doll-ui"].slots, print value
        for (let [key, value] of Object.entries(actorData.flags["fvtt-paper-doll-ui"].slots)) {
          // if value[0] is not undefined
          if (value[0] != undefined || value[1] != undefined || value[2] != undefined || value[3] != undefined) {
            if(value[0] != undefined) {
              var itemID = value[0].split(".")[3];
              var item = actorData.items.get(itemID);
              if(item.system.equipement.isEquipement){
                var stat = item.system.equipement.stat;
    
                if(stat == "degats"){
                  degats_bonus += Number(item.system.equipement.value);
                }
                if(stat == "parade"){
                  parade_bonus += Number(item.system.equipement.value);
                }
                if(stat == "magie"){
                  magie_bonus += Number(item.system.equipement.value);
                }
                if(stat == "rapidite"){
                  rapidite_bonus += Number(item.system.equipement.value);
                }
                if(stat == "charisme"){
                  charisme_bonus += Number(item.system.equipement.value);
                }
                if(stat == "precision"){
                  precision_bonus += Number(item.system.equipement.value);
                }
                if(stat == "rm"){
                  rm_bonus += Number(item.system.equipement.value);
                }
                if(stat == "maxQuantity"){
                  quantityMax += Number(item.system.equipement.value);
                }
                /*$('[name="equipped_script"]').each(function() {
                  eval(htmlDecode($(this).val()));
                });*/
                if(item.system.equipement.script != undefined){
    
                  eval(htmlDecode(item.system.equipement.script));
                  
                }
    
              }
            }
            if(value[1] != undefined) {
              var itemID2 = value[1].split(".")[3];
              var item2 = actorData.items.get(itemID2);
              if(item2.system.equipement.isEquipement){
                var stat = item2.system.equipement.stat;
    
                if(stat == "degats"){
                  degats_bonus += Number(item2.system.equipement.value);
                }
                if(stat == "parade"){
                  parade_bonus += Number(item2.system.equipement.value);
                }
                if(stat == "magie"){
                  magie_bonus += Number(item2.system.equipement.value);
                }
                if(stat == "rapidite"){
                  rapidite_bonus += Number(item2.system.equipement.value);
                }
                if(stat == "charisme"){
                  charisme_bonus += Number(item2.system.equipement.value);
                }
                if(stat == "precision"){
                  precision_bonus += Number(item2.system.equipement.value);
                }
                if(stat == "rm"){
                  rm_bonus += Number(item2.system.equipement.value);
                }
                if(stat == "maxQuantity"){
                  quantityMax += Number(item2.system.equipement.value);
                }
                /*$('[name="equipped_script"]').each(function() {
                  eval(htmlDecode($(this).val()));
                });*/
                if(item2.system.equipement.script != undefined){
    
                  eval(htmlDecode(item2.system.equipement.script));
                  
                }
    
              }
            }
          // if it's the good actor id that is owning the item
            

          
          
          
          
        
        }
      }
      }

    //actorData.flags["fvtt-paper-doll-ui"].slots
    /*
    Force = Number($("#Force").val())
	Constitution = Number($("#Constitution").val())
	Agilité = Number($("#Agilité").val())
	Intelligence = Number($("#Intelligence").val())
	Concentration = Number($("#Concentration").val())
	Dextérité = Number($("#Dexterité").val())
    */ 
   
    
    var Force = actorData.system.abilities.str.value;
    var Constitution = actorData.system.abilities.con.value;
    var Agilité = actorData.system.abilities.cha.value;
    var Intelligence = actorData.system.abilities.int.value;
    var Concentration = actorData.system.abilities.wis.value;
    var Dextérité = actorData.system.abilities.dex.value;
    // precision = agilité/2.75 + dexterité/2
    actorData.system.statSecondaire.precision.value = Math.min(18, 9 + Math.round(Agilité / 3 + Dextérité / 2 + precision_bonus));
    //dégats = force + arme1 + arme2
    actorData.system.statSecondaire.degatphys.value = Math.round(Force*1 + degats_bonus);
    //magie = intelligence/1.25 + concentration/2 + amulette
    actorData.system.statSecondaire.magie.value = Math.round(Intelligence + Concentration / 2 + magie_bonus);
    // critique = force/2 + agilité/2
    actorData.system.statSecondaire.critique.value = Math.round(Force / 2 + Agilité / 2+Concentration*0.25);
    //  buff&debuff = concentration/2 + dextérité/2
    actorData.system.statSecondaire.buffdebuff.value = Math.min(17, 2+Math.round(Concentration / 2 + Dextérité / 2));
    // parade = constitution/2.5 + armure
    actorData.system.statSecondaire.parade.value = Math.round(Constitution / 3 + parade_bonus);
    actorData.system.statSecondaire.RM.value = Math.round(Constitution / 4 + Intelligence / 3 + rm_bonus);
    // esquive = agilité + age + taille + poids
    actorData.system.statSecondaire.esquive.value = Math.max(10,Math.min(75, Math.round(Agilité + 90 - (Number(actorData.system.attributes.age.value) / 2 + Number(actorData.system.attributes.taille.value) / 10 + Number(actorData.system.attributes.poids.value) / 5))));
    // --- Social ---
        //rapidite = agilite * 1.5 + intelligence * 1.5 + bottes
    actorData.system.statSecondaire.rapidite.value = Math.floor(6+Agilité*1.5+Concentration*0.75 + rapidite_bonus + (10-Number(actorData.system.attributes.taille.value)/20));
    //furtivite = agilite/2 + concentration/3 + 10-taille/10
    actorData.system.statSecondaire.furtivite.value = Math.min(17,Math.max(4,Math.round(3+Math.floor(Agilité/2 + Concentration/2.5))));
    //perception= intelligence / 2 + concentration / 2
    actorData.system.statSecondaire.perception.value = Math.min(17,Math.floor(8+Intelligence/2 + Concentration*0.75));
    //mana= intelligence *1.25 + dexterite *0.75

    actorData.system.power.max = Math.floor(2+Intelligence*1.25+Dextérité*0.75);
    //pvmax= force * 1.5 + constition * 2
    actorData.system.health.max = Math.floor(10+Force*1.25+ Constitution*2 + Number(actorData.system.attributes.poids.value) / 15 + Number(actorData.system.attributes.level.value));
    //charisme = constitution/2 + intelligence/1.5 + charme
    actorData.system.statSecondaire.charisme.value = Math.min(17, 5+Math.floor(Constitution/1.75+Intelligence/1.75+charisme_bonus+Number(actorData.system.attributes.taille.value) / 75));
    if (!game.modules.get("fvtt-paper-doll-ui")?.active) {
      actorData.system.statSecondaire.maxQuantity.value = 18 + Force/2 + Constitution/2;
    }else{
      actorData.system.statSecondaire.maxQuantity.value = quantityMax;
    }
    // remainingPoints
    actorData.system.statSecondaire.remainingPoints.value = 16 + actorData.system.attributes.level.value - ( Force + Constitution + Agilité + Intelligence + Concentration + Dextérité);
    
    
  }
    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.

    this._prepareCharacterData(actorData);
    this._prepareNpcData(actorData);
    
  }
  
  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'character') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;

    // Loop through ability scores, and add their modifiers to our sheet output.
    for (let [key, ability] of Object.entries(systemData.abilities)) {
      // Calculate the modifier using d20 rules.
      ability.mod = Math.floor((ability.value - 10) / 2);
    }
  }

  /**
   * Prepare NPC type specific data.
   */
  _prepareNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;
    systemData.xp = systemData.cr * systemData.cr * 100;
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    // Starts off by populating the roll data with `this.system`
    const data = { ...super.getRollData() };

    // Prepare character roll data.
    this._getCharacterRollData(data);
    this._getNpcRollData(data);
    return data;
  }

  /**
   * Prepare character roll data.
   */
  _getCharacterRollData(data) {
    if (this.type !== 'character') return;

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (data.abilities) {
      for (let [k, v] of Object.entries(data.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    // Add level for easier access, or fall back to 0.
    if (data.attributes.level) {
      data.lvl = data.attributes.level.value ?? 0;
    }
  }

  /**
   * Prepare NPC roll data.
   */
  _getNpcRollData(data) {
    if (this.type !== 'npc') return;

    // Process additional NPC data here.
  }
  //on token update
  async modifyTokenAttribute(attribute, value, isDelta=false, isBar=true) {
    const attr = foundry.utils.getProperty(this.system, attribute);
    const current = isBar ? attr.value : attr;
    const update = isDelta ? current + value : value;
    if ( update === current ) return this;
    // name of the actor
    var name = this.name;
    // Determine the updates to make to the actor data
    let updates;
    if ( isBar ) {
      var delta = update - current;
      updates = {[`system.${attribute}.value`]: Math.clamp(update, 0, attr.max)}
      if(attribute === "health"){
        if(delta < 0){
          var flavor = "Dégâts subit";
          var content = name+" a subit "+Math.sqrt(delta*delta)+" dégâts";
          var content2 = name+" a subit des dégâts";
        }
        if(delta > 0){
          var flavor = "Soin";
          var content = name+" s'est soigné de "+delta+" points de vie";
          var content2 =  name+" s'est soigné";
        }
      }
      if(attribute === "power"){
        if(delta > 0){
          var flavor = "Mana récupéré";
          var content = name+" a récupéré "+delta+" points de mana"
          var content2 =  name+" a récupéré du mana"
        }
        if(delta < 0){
          var flavor = "Mana dépensé";
          var content = name+" a dépensé "+Math.sqrt(delta*delta)+" points de mana"
          var content2 = name+" a dépensé du mana"
        }
      }
      var speaker = ChatMessage.getSpeaker({actor: this, token: this.token});
      ChatMessage.create({
        whisper: ChatMessage.getWhisperRecipients("GM"),
        speaker: speaker,
        flavor: flavor,
        content: content,
      });
      ChatMessage.create({
        speaker: speaker,
        flavor: flavor,
        content: content2,
      });
    }
    else updates = {[`system.${attribute}`]: update};

    // Allow a hook to override these changes
    const allowed = Hooks.call("modifyTokenAttribute", {attribute, value, isDelta, isBar}, updates);
    return allowed !== false ? this.update(updates) : this;
  }
  
}
