// Import document classes.
import { BoilerplateActor } from './documents/actor.mjs';
import { BoilerplateItem } from './documents/item.mjs';
// Import sheet classes.
import { BoilerplateActorSheet } from './sheets/actor-sheet.mjs';
import { BoilerplateItemSheet } from './sheets/item-sheet.mjs';
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from './helpers/templates.mjs';
import { BOILERPLATE } from './helpers/config.mjs';

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function () {
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.boilerplate = {
    BoilerplateActor,
    BoilerplateItem,
    rollItemMacro,
  };

  // Add custom constants for configuration.
  CONFIG.BOILERPLATE = BOILERPLATE;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: 'floor(@statSecondaire.rapidite.value + (d@statSecondaire.rapidite.value - d@statSecondaire.rapidite.value)/2.5)',
    decimals: 2,
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = BoilerplateActor;
  CONFIG.Item.documentClass = BoilerplateItem;

  // Active Effects are never copied to the Actor,
  // but will still apply to the Actor from within the Item
  // if the transfer property on the Active Effect is true.
  CONFIG.ActiveEffect.legacyTransferral = false;
  

  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('boilerplate', BoilerplateActorSheet, {
    makeDefault: true,
    label: 'BOILERPLATE.SheetLabels.Actor',
  });
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('boilerplate', BoilerplateItemSheet, {
    makeDefault: true,
    label: 'BOILERPLATE.SheetLabels.Item',
  });
  CONFIG.statusEffects =
  [
    {
        "id": "canalisation",
        "name": "Canalisation",
        "icon": "icons/svg/canalisation2.png"
    }
];
  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here is a useful example:
Handlebars.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase();
});

Handlebars.registerHelper('ifeq', function (a, b, options) {
  if (a == b) { return options.fn(this); }
  return options.inverse(this);
});

Handlebars.registerHelper('log', function(context) {
  console.log(context);
});
Handlebars.registerHelper('ifnoteq', function (a, b, options) {
  if (a != b) { return options.fn(this); }
  return options.inverse(this);
});

Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

Handlebars.registerHelper('splitItem', function(msg, split) {
  msg = msg.split(split)[3];
  return msg
});

Handlebars.registerHelper('splitActor', function(msg, split) {
  msg = msg.split(split)[1];
  return msg
});

Handlebars.registerHelper('getActorIDitems', function(msg) {
  msg = game.actors.get(msg).items;
  return msg
});

Handlebars.registerHelper('rapiditeRoll', function(msg) {
  msg = `${Math.ceil(msg/5)*5}+d${Math.ceil(msg/5)*5/2} - d${Math.ceil(msg/5)*5/2}`
  return msg
});

Handlebars.registerHelper('getEquipedItems', function(actorID, itemID) {
  var itemsEquip = game.actors.get(actorID).items;
  var itemr = {}
  itemsEquip.forEach(itemEquip => {
    
    if(itemEquip.id == itemID){
      itemr = itemEquip
    }
  });
  return itemr;
  
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', function () {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on('hotbarDrop', (bar, data, slot) => createItemMacro(data, slot));
});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
  // First, determine if this is a valid owned item.
  if (data.type !== 'Item') return;
  if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
    return ui.notifications.warn(
      'You can only create macro buttons for owned Items'
    );
  }
  // If it is, retrieve it based on the uuid.
  const item = await Item.fromDropData(data);

  // Create the macro command using the uuid.
  const command = `game.boilerplate.rollItemMacro("${data.uuid}");`;
  let macro = game.macros.find(
    (m) => m.name === item.name && m.command === command
  );
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: 'script',
      img: item.img,
      command: command,
      flags: { 'boilerplate.itemMacro': true },
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
  // Reconstruct the drop data so that we can load the item.
  const dropData = {
    type: 'Item',
    uuid: itemUuid,
  };
  // Load the item from the uuid.
  Item.fromDropData(dropData).then((item) => {
    // Determine if the item loaded and if it's an owned item.
    if (!item || !item.parent) {
      const itemName = item?.name ?? itemUuid;
      return ui.notifications.warn(
        `Could not find item ${itemName}. You may need to delete and recreate this macro.`
      );
    }

    // Trigger the item roll
    item.roll();
  });
}

Hooks.once("dragRuler.ready", (SpeedProvider) => {
  class FictionalGameSystemSpeedProvider extends SpeedProvider {
      get colors() {
          return [
              {id: "walk", default: 0x00FF00, name: "fage.speeds.walk"},
              {id: "dash", default: 0xFFFF00, name: "fage.speeds.dash"},
              {id: "run", default: 0xFF8000, name: "fage.speeds.run"}
          ]
      }

      getRanges(token) {
          const baseSpeed = Math.ceil(token.actor.system.statSecondaire.rapidite.value/5)*5

    // A character can always walk it's base speed and dash twice it's base speed
    const ranges = [
      {range: baseSpeed, color: "walk"},
      {range: baseSpeed * 1.5, color: "run"}
    ]

    // Characters that aren't wearing armor are allowed to run with three times their speed
          
          return ranges
      }
  }
  dragRuler.registerSystem("fage", FictionalGameSystemSpeedProvider)
});

socket.on("updateTo", (request, ack) => {
  console.log(request);
});


//Hooks on token update health, console log the before and after token health
Hooks.on("updateToken", (sceneId, token, options) => {
  console.log(token);
});
