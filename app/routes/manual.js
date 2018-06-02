import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return {
            adjectiveA: { val: '', partOfSpeech: 'adjective'},
            pluralNounA: { val: '', partOfSpeech: 'noun', plural: true},
            adjectiveB: { val: '', partOfSpeech: 'adjective'},
            gerundA: { val: '', partOfSpeech: 'gerund'},
            bodyPart: { val: '', partOfSpeech: 'bodyPart'},
            adjectiveC: { val: '', partOfSpeech: 'adjective'},
            verbA: { val: '', partOfSpeech: 'verb'},
            pastVerbA: { val: '', partOfSpeech: 'verb', tense: "past"},
            adverbA: { val: '', partOfSpeech: 'adverb'},
            nounA: { val: '', partOfSpeech: 'noun'},
            gerundB: { val: '', partOfSpeech: 'gerund'},
            pluralAnimal: { val: '', partOfSpeech: 'animal', plural: true},
            verbB: { val: '', partOfSpeech: 'verb'},
            dateTime: { val: '', partOfSpeech: 'dateTime'},
        }
    }
});
