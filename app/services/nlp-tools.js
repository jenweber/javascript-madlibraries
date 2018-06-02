import Service from '@ember/service';

export default Service.extend({
    /**
     * Text is free form blob. Data is the structure to
     * apply the results of parsing to. Returns the completed
     * data object.
     * @param {string} text 
     * @param {string} data 
     */
    parse(text, data) {

    },
    defaults: Object.freeze({
        adjective: ['destructive', 'delightful', 'prickly', 'enchanting', 'greedy', 'inevitable', 'miniscule'],
        verb: ['explode', 'smoosh', 'launch', 'escape', 'scorch'],
        animal: ['penguin', 'armadillo', 'panda', 'kangaroo', 'platypus', 'cockroach', 'yeti'],
        adverb: ['gently', 'politely', 'obscenely', 'tediously', 'bravely', 'unbearably'],
        bodyPart: ['nostril', 'earlobe', 'kidney', 'eye', 'ventricle', 'muffintop'],
        noun: ['mountain', 'popcorn', 'brick', 'cookie', 'Hawaiian Pizza'],
        dateTime: ['the heat death of the universe', 'the end of the reign of Cleopatra', 'last Tuesday', 'February 31st, 2019'],
        gerund: ['skiiing', 'believing', 'removing', 'smashing', 'deceiving']
    })
});
