import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    showIncomplete: false,
        nlpTools: service(),
        actions: {
            submit() {
                if (this.shouldProcessTextfield) {
                    let results = this.nlpTools.extract(this.text, this.data)
                    this.set('data', results)
                }
                
                if (this.checkIfResultsComplete(this.data)) {
                    this.set('showIncomplete', false)
                    this.set('resultsComplete', true)
                } else {
                    this.set('showIncomplete', true)
                }
            }
        },
        checkIfResultsComplete(data) {
        let complete = true;
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
            if (!data[key]['val']) {
                complete = false;
            }
            }
        }
        return complete
        }
});
