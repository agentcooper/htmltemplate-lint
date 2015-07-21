// https://github.com/substack/astw/blob/master/index.js

function walk(node, parent, cb) {
    var keys = Object.keys(node);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key === 'parent') {
            continue;
        }
        
        var child = node[key];
        if (Array.isArray(child)) {
            for (var j = 0; j < child.length; j++) {
                var c = child[j];
                if (c && typeof c.type === 'string') {
                    c.parent = node;
                    walk(c, node, cb);
                }
            }
        }
        else if (child && typeof child.type === 'string') {
            child.parent = node;
            walk(child, node, cb);
        }
    }
    cb(node);
}

module.exports = walk;
