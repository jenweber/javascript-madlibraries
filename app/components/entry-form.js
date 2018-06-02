import Component from '@ember/component';

export default Component.extend({
    showIncomplete: false,
    actions: {
        submit() {
            let data = this.data
            if (this.checkIfResultsComplete(data)) {
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
