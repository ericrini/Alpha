/**
 * This entry point will allow a CommonJS module loader like Browserify to access the framework without defining any
 * globals at all.
 */
module.exports = {
    Game: require('./framework'),
    Actor: require('./Actor')
};