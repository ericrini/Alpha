# Alpha
Alpha is a HTML5 canvas framework for making 2D browser games.

# Demo
http://rini.pro/index.html

# General Framework Features
1. An object oriented programming model using the real world analogy of stages, scenes and actors to create a generalized analogy for defining game logic.
1. Each actor has a private coordinate system and encapsulates all of its own game logic.
1. Actors can have child actors for creating high quality particle effects.
1. The stage's resolution is resizable at runtime.
1. Includes a built-in toolbox to tune game constants in real-time and spot performance problems early.
1. Compatible with all HTML5\ECMAScript 5 browsers.

# Development
Development on this project requires a node.js runtime. You can obtain the latest stable release from
https://nodejs.org/en/. You will also need correctly configured Python and C++ build environments. Additionally, the
node-canvas module requires some c++ libraries to be installed. Please consult their installation documentation at
https://github.com/Automattic/node-canvas/wiki/_pages, which also walks through setting up Python and C++ if it is not
shipped with your environment by default.

Additionally, you will need the following node.js module installed globally.

```
npm install -g gulp
npm install -g eslint
npm install -g browserify
```

Now install all the project dependencies.

```
npm install
```

Once you have everything installed, the following command will watch the source files and run continuous tests and
builds as source files are modified. It will also launch a small http server to run the distributable artifact.

```
gulp server
```

To begin an independent test & build run you can use this command.

```
gulp
```

To run only the tests, use this command.

```
gulp test
```