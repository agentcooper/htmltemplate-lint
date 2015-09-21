var traverse = require('traverse');

function walk(node, parent, cb) {
    var keys = Object.keys(node);

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key === 'parent') {
            continue;
        }

        var child = node[key];
        if (!child) {
            continue;
        }

        if (child.type === 'Expression') {
            // This one gets called for rules that do not wish to match
            // expression.
            cb(child);

            // Callback on traversal is only executed for rules that explicitly
            // demand to `matchExpression`.
            traverse(child).forEach(function(node) {
                if (this.isLeaf) {
                    return;
                }

                cb(node, this);
            });

            continue;
        }

        if (Array.isArray(child)) {
            for (var j = 0; j < child.length; j++) {
                var c = child[j];
                if (c && typeof c.type === 'string') {
                    c.parent = node;
                    walk(c, node, cb);
                }
            }
        } else if (typeof child.type === 'string') {
            child.parent = node;
            walk(child, node, cb);
        }
    }
    cb(node);
}

module.exports = walk;
