//export {default as numerosity} from "./src/numerosity";
const sub = require('./src/sub.js');

exports.create = function (a, b) {
    return a + b;
}

exports.sub = sub;