# Portafolio Personal


## Overview

This exercise will have the candidate build a responsive site navigation driven by an AJAX request.

Technology
------------

| On The Server | On The Client  | Development |
| ------------- | -------------- | ----------- |
| express       | javascript     | Gulp        |
|               | stylus         | livereload  |


Requirements
------------

You need [Node.js](http://nodejs.org/download/) installed and running.

We use [Gulp](http://gulpjs.com/) as our task runner. Get the CLI (command line interface).

```bash
$ npm install gulp -g
```

Installation
------------

```bash
$ git clone https://github.com/juvasquezg/portafolio.git && cd ./portafolio
$ npm install
$ gulp
```

Development with livereload
------
```bash
gulp
```

Test
------
```bash
npm test
```

if you get ** -bash: make: commad not found ** please install make in Unix
based systems or **run**
```bash
./node_modules/.bin/mocha  test/
```


Production
------
```bash
npm start
```

Note
------
Default port is 3000, sure that this port is available.

You can put the public directory in a [nginx] or [apache] server.

We use  [npm](https://www.npmjs.org/) as our Dependecy Management.

