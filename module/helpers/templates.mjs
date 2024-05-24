/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/fage/templates/actor/parts/actor-features.hbs',
    'systems/fage/templates/actor/parts/actor-items.hbs',
    'systems/fage/templates/actor/parts/actor-spells.hbs',
    'systems/fage/templates/actor/parts/actor-effects.hbs',
    'systems/fage/templates/actor/parts/actor-npcRoll.hbs',
    // Item partials
    'systems/fage/templates/item/parts/item-effects.hbs',
    

  ]);
};

