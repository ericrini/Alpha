# Alpha
Alpha is a HTML5 canvas framework for making 2D browser games.

# Features
1. An easy to understand object model based on the concepts of Stage, Scene and Actor.
1. Scenes can be defined so that it is easy to create complex games with splash screens, menus, levels, cut-scenes, etc.
1. Each Actor is drawn in a private coordinate system so that it is easy to import art assets from external tools.
1. Actors are positioned relatively on the Stage so that the Stage can be re-sized, even at runtime.
1. Actors have an efficient box based collision model for fast collision detection and can define per-pixel collision
detection routines to enhance their collision model down to pixel perfect precision as needed for specific cases.
1. Includes a built-in toolbox to tune game constants in real-time and spot performance problems early.
1. Distributable is compatible with all HTML5\ECMAScript 5 browsers.

# Example
http://rini.pro/index.html

# User Guide
If you would like to use Alpha to make your own games, please visit the user wiki at
https://github.com/ericrini/Alpha/wiki.

# Development
If you would like to contribute directly to the Alpha project, here is some getting started tips. Development on this
project requires a node.js runtime to run build tasks. To install all the required dependencies, use NPM.

```
npm install -g gulp
npm install
```

Once you have everything installed, the following command will watch the source files and run continuous tests and
builds as source files are modified. It will also launch a small http server at http://0.0.0.0:8000 to run the included
integration test projects.

Pass the --noMangle option to ensure that the output is fully debuggable by Chrome.

```
gulp server --noMangle
```

To begin an independent test & build run you can use this command. This is ultimately what we want to distribute to
users.

```
gulp
```

To run only the tests, run either of these commands.

```
gulp test
```

To run only the static code quality tests run this command.

```
gulp lint
```

Good luck, and thank you for your contributions!