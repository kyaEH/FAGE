/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */

function htmlDecode(input) {
	let doc = new DOMParser().parseFromString(input, "text/html");
	return doc.documentElement.textContent;
  }
export class BoilerplateActor extends Actor {
  /** @override */
  //set default prototype token vision enabled, Actor#_preCreate should be used


 
  
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
      let degats_bonus = 0;
      let parade_bonus = 0;
      let magie_bonus = 0;
      let rapidite_bonus = 0;
      let charisme_bonus = 0;
      let precision_bonus = 0;
      let rm_bonus = 0;
      let quantityMax = 0;
      actorData.system.attributes.level.value = Math.floor(Math.max(1, Math.sqrt(Number(actorData.system.attributes.experience.value) / 5)) - 1);

      if (actorData.flags?.["fvtt-paper-doll-ui"]?.slots) {
        //for each actorData.flags["fvtt-paper-doll-ui"].slots, print value
        for (let [key, value] of Object.entries(actorData.flags["fvtt-paper-doll-ui"].slots)) {
          // if value[0] is not undefined
          if (value[0] != undefined || value[1] != undefined || value[2] != undefined || value[3] != undefined) {
            if(value[0] != undefined) {
              let itemID = value[0].split(".")[3];
              let item = actorData.items.get(itemID);
              if(item.system.equipement.isEquipement){
                let stat = item.system.equipement.stat;
    
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
              let itemID2 = value[1].split(".")[3];
              let item2 = actorData.items.get(itemID2);
              if(item2.system.equipement.isEquipement){
                let stat = item2.system.equipement.stat;
    
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
   
    
  const abilities = actorData.system.abilities;
  const attributes = actorData.system.attributes;
  const statSecondaire = actorData.system.statSecondaire;
  
  const {
    str: { value: Force },
    con: { value: Constitution },
    cha: { value: Agilité },
    int: { value: Intelligence },
    wis: { value: Concentration },
    dex: { value: Dextérité }
  } = abilities;
  
  const { age, taille, poids, level } = attributes;
  
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
  const powerMax = Math.floor(2 + Intelligence * 1.5 + Dextérité);
  const healthMax = Math.floor(10 + Force * 1.25 + Constitution * 2 + Number(poids.value) / 15 + Number(level.value));
  const charisme = Math.min(17, 5 + Math.floor(Constitution / 1.75 + Intelligence / 1.75 + charisme_bonus + Number(taille.value) / 75));
  // Shield is just *2 hp
  const shield = Math.floor(healthMax * 2);

  statSecondaire.precision.value = precision;
  statSecondaire.degatphys.value = degatphys;
  statSecondaire.magie.value = magie;
  statSecondaire.critique.value = critique;
  statSecondaire.buffdebuff.value = buffdebuff;
  statSecondaire.parade.value = parade;
  statSecondaire.RM.value = RM;
  statSecondaire.esquive.value = esquive;
  statSecondaire.rapidite.value = rapidite;
  statSecondaire.furtivite.value = furtivite;
  statSecondaire.perception.value = perception;
  actorData.system.power.max = powerMax;
  actorData.system.health.max = healthMax;
  actorData.system.shield.max = shield;
  statSecondaire.charisme.value = charisme;
  
  statSecondaire.maxQuantity.value = !game.modules.get("fvtt-paper-doll-ui")?.active
    ? 18 + Force / 2 + Constitution / 2
    : quantityMax;
  
  statSecondaire.remainingPoints.value = 16 + Number(level.value) - (Force + Constitution + Agilité + Intelligence + Concentration + Dextérité);
    
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
    let rpgtoken;
    if(this.type === "npc") {
      rpgtoken = this.token.object
    }else {
      rpgtoken = canvas.tokens.controlled[0];
    }
    // name of the actor
    let name = this.name;
    // Determine the updates to make to the actor data
    let updates;
    let flavor, content, content2;
    console.log(attribute, value, isDelta, isBar);
    if ( isBar ) {
      
      let delta = update - current;
      updates = {[`system.${attribute}.value`]: Math.clamp(update, 0, attr.max)}
      if(attribute === "health"){
        if(delta < 0){
          flavor = "Dégâts subis";
          content = name+" a subi "+Math.sqrt(delta*delta)+" dégâts";
          content2 = name+" a subi des dégâts";
          //new DamageNumber(token,"green",false,false,false,false,"test")
          // if npc
          if(this.type === "npc"){
            // createScrollingText(origin: Point, content: string, [options]?: { duration: number; distance: number; anchor: TEXT_ANCHOR_POINTS; direction: TEXT_ANCHOR_POINTS; jitter: number; textStyle: any }): Promise<PreciseText>
            canvas.interface.createScrollingText(rpgtoken, "???", {duration: 1000, distance: 100, anchor: 0, direction: 0, jitter: 0, fill: "red", fontSize: 100});
            // just try to display a basic
          }
          else{
            canvas.interface.createScrollingText(rpgtoken, delta, {duration: 1000, distance: 100, anchor: 0, direction: 0, jitter: 0, fill: "red", fontSize: 100});
          }
          if(update <= 0){
            flavor = "Défaite";
            content = name+" a été vaincu";
            content2 = name+" a été vaincu";
            this.toggleStatusEffect("dead", {overlay: true, active: true});
            
          }
        }
        if(delta > 0){
          flavor = "Soin";
          content = name+" s'est soigné de "+delta+" points de vie";
          content2 =  name+" s'est soigné";
          if(this.type === "npc"){
            canvas.interface.createScrollingText(rpgtoken, "???", {duration: 1000, distance: 100, anchor: 0, direction: 0, jitter: 0, fill: "green", fontSize: 100});
 
          }
          else{
            canvas.interface.createScrollingText(rpgtoken, delta, {duration: 1000, distance: 100, anchor: 0, direction: 0, jitter: 0, fill: "green", fontSize: 100});

          }
        }
      }
      if(attribute === "power"){
        if(delta > 0){
          flavor = "Mana récupéré";
          content = name+" a récupéré "+delta+" points de mana";
          content2 =  name+" a récupéré du mana";
          if(this.type === "npc"){
            canvas.interface.createScrollingText(rpgtoken, "???", {duration: 1000, distance: 100, anchor: 0, direction: 0, jitter: 0, fill: "blue", fontSize: 100});

          }else{
            canvas.interface.createScrollingText(rpgtoken, delta, {duration: 1000, distance: 100, anchor: 0, direction: 0, jitter: 0, fill: "blue", fontSize: 100});

          }

        }
        if(delta < 0){
          flavor = "Mana dépensé";
          content = name+" a dépensé "+Math.sqrt(delta*delta)+" points de mana";
          content2 = name+" a dépensé du mana";
          if(this.type === "npc"){
            canvas.interface.createScrollingText(rpgtoken, "???", {duration: 1000, distance: 100, anchor: 0, direction: 0, jitter: 0, fill: "purple", fontSize: 100});

          }
          else{
            canvas.interface.createScrollingText(rpgtoken, delta, {duration: 1000, distance: 100, anchor: 0, direction: 0, jitter: 0, fill: "purple", fontSize: 100});

          }
        }
      }
      // Shield
      if(attribute === "shield"){
        
        if(delta > 0){
          flavor = "Bouclier récupéré";
          content = name+" a récupéré "+delta+" points de bouclier";
          content2 =  name+" a récupéré du bouclier";
          if(this.type === "npc"){
            canvas.interface.createScrollingText(rpgtoken, "???", {duration: 1000, distance: 100, anchor: 0, direction: 0, jitter: 0, fill: "cyan", fontSize: 100});

          }
          else{
            canvas.interface.createScrollingText(rpgtoken, delta, {duration: 1000, distance: 100, anchor: 0, direction: 0, jitter: 0, fill: "cyan", fontSize: 100});

          }

        }
        if(delta < 0){
          flavor = "Bouclier dépensé";
          content = name+" a dépensé "+Math.sqrt(delta*delta)+" points de bouclier";
          content2 = name+" a dépensé du bouclier";
          if(this.type === "npc"){
            canvas.interface.createScrollingText(rpgtoken, "???", {duration: 1000, distance: 100, anchor: 0, direction: 0, jitter: 0, fill: "grey", fontSize: 100});

          }
          else{
            canvas.interface.createScrollingText(rpgtoken, delta, {duration: 1000, distance: 100, anchor: 0, direction: 0, jitter: 0, fill: "grey", fontSize: 100});

          }
        }
      }
      
      const speaker = ChatMessage.getSpeaker({actor: this, token: this.token});
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
