# javascript-madlibraries

This is a demonstration of browser-side Natural Language Processing using a library called [compromise](http://compromise.cool/). It extracts parts of speech from blocks of text and uses them in a Mad Libs-like story! It was presented at the [BostonJS Meetup](https://www.meetup.com/boston_JS/events/251205244/) on June 6th, 2018.

#### [Live Demo](https://jenweber.github.io/javascript-madlibraries/#/manual)
#### [Slides](https://docs.google.com/presentation/d/1AMzNGohISS5sovpKw5gnywmhAeJezC8D76-V-7o79bY/edit?usp=sharing)

![JavaScript MadLibraries Screenshot of the app results from running the Moana article](https://user-images.githubusercontent.com/16627268/41052694-7f4c86be-6987-11e8-950a-ce59467266ef.png)
(example using [Moana](https://en.wikipedia.org/wiki/Moana_(2016_film)))

This app was built with [Ember.js](https://www.emberjs.com/). The most interesting files are [nlp-tools.js](https://github.com/jenweber/javascript-madlibraries/blob/master/app/services/nlp-tools.js) which contains all the processing utilities, and [manual.js](https://github.com/jenweber/javascript-madlibraries/blob/master/app/routes/manual.js) which has an example of the data structure used by the utilties. The object defined in the model function in `manual.js` maps to the variables used in the "results" layout the user sees. The template for the results is in [results-display.hbs](https://github.com/jenweber/javascript-madlibraries/blob/master/app/templates/components/results-display.hbs). Most other files in the app are just boilerplate.

## Prerequisites

To run the app locally, you will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

You can install the `ember-cli` with `npm install -g ember-cli`. You'll use an `ember-cli` command to build the app and serve it locally.

## Quickstart

* `git clone <repository-url>` this repository
* `cd javascript-madlibraries`
* `npm install`
* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Deploying

Deploy to GitHub pages with [ember-cli-deploy-git](https://github.com/ef4/ember-cli-deploy-git)

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
