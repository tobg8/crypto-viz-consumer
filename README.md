<br>

## [![Generic badge](https://img.shields.io/badge/Made_with-React-blueviolet.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/React-v18.1.0-brightgreen.svg)](https://shields.io/)[![Generic badge](https://img.shields.io/badge/reduxtoolkit-v1.8.1-brightgreen.svg)](https://shields.io/)[![Generic badge](https://img.shields.io/badge/MUI-v5.6.4-orange.svg)](https://shields.io/)[![Generic badge](https://img.shields.io/badge/Jest-v27.5.0-yellow.svg)](https://shields.io/)[![Generic badge](https://img.shields.io/badge/testinglibrary-v13.2.0-yellow.svg)](https://shields.io/)[![Generic badge](https://img.shields.io/badge/ESLint-v8.14.0-blueviolet.svg)](https://shields.io/)[![Generic badge](https://img.shields.io/badge/npm-v6.14.15-blue.svg)](https://shields.io/)

<br>

# Description BACK

Consumer read from topic and serve message via SSE on `http://localhost:8080/events?stream=messages`

# Description FRONT

The crypto-viz (Frontend) is a Progressive Web App. Built using React, Redux-toolkit, MUI, Service Worker tools.

<br>

## :rocket: Getting Started

### Clone the repository

```shell
cd some-project-folder
git clone https://github.com/tobg8/crypto-viz-consumer.git
cd crypto-viz-consumer
```

### Start the application

use node 15 or higher (=> npm v7 or higher, to have lockfileVersion 2)

```shell
npm install
npm start
```

- **npm install**: To install all the dependencies.
- **npm start**: Launch the application on the local server [http://localhost:3000](http:/localhost:3000.
- **npm run lint**: For linting your code.
- **npm run build**: Generate a production build.
- **npm run test**: Run test files.
- **npm run eject**: :warning: Advanced operation and **irréversible** to customize the configuration made by Create-React-App(react-scripts). You shouldn't have to use it for no good reason. :warning:

:bulb: This project uses **npm** like package manager: any package/library installation should be run by running **npm install** <package-name>

 <br>

## :heart: Contribute

### Branch naming convention

- **feature**: feature/feature-name
- **fix**: fix/bug-name

### File structure convention

```text
│   App.css
│   App.js
│   index.css
│   index.js
│   logo.svg
│   reportWebVitals.js
│   setupTests.js
│
├───assets : # (all assets comes here trad files + SVG)
│   ├───animation
│   ├───i18n
│   └───images
│   └───pictograms
├───components : # (all UI dump components comes here button, textfield etc..)
├───core : # (all configurations(theme for exemple), shared models etc.. )
├───features : # (all smart components comes here)
├───hooks : # (all hooks)
├───pages : # (all screens per route comes here)
├───services : # (all api calls comes here)
└───state : # (store and slices comes here)
└───style : # (all colors)
```

### Code Style

We run Prettier when you save your file, which means it will be automatically formatted according to the common style. We also have ESLint set up, although we've disabled all stylistic rules since Prettier takes care of those.

### Commit message convention

write a standardized commit message is a best practice to respect.
The commit message should be structured as follows:

- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **chore**: Changes to our CI configuration files and scripts or project folder structure
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

First you should indicate the type of your commit (docs, feta, fix etc.. see below ) than the project name ticket-number : finally the subject contains a succinct description of the change

```shell
git commit -m "feat(ticket-name): description"
git commit -m "fix(ticket-name): description"
```

#### Merge Request Template

```

# Description
Context and content of the RM. Explain in two lines the element(s) of the application concerned by the MR.

## Showcase (optional)
Animated gif of the feature or screenshot of your feature

## Changes
Quickly explain what the code brings, modifies and or corrects

## Notes
Additional Info
```

## :books: Technologies

- [React](https://reactjs.org/docs/getting-started.html) (A lightweight javascript library designed by facebook)
- [MaterialUI](https://mui.com/) (MUI offers a comprehensive suite of UI tools to help you ship new features faster. )
- [Redux toolkit](https://redux-toolkit.js.org/) (global state management for React apps)

 <br>

## :information_desk_person: Resources

- [Trello](https://trello.com/c/f21iQ3P8/11-fil-dactualit%C3%A9-sur-les-cryptomonnaies)
- [GitHub producer](https://github.com/tobg8/crypto-viz)
- [GitHub consumer](https://github.com/tobg8/crypto-viz-consumer)
- [High Charts](https://www.npmjs.com/package/highcharts-react-official)
- [T-DAT-901](https://gandalf.epitech.eu/pluginfile.php/30203/mod_assign/introattachment/0/T-DAT-901_project.pdf?forcedownload=1)
- [PPT](https://gandalf.epitech.eu/pluginfile.php/30203/mod_assign/introattachment/0/T-DAT-901_project.pdf?forcedownload=1)
