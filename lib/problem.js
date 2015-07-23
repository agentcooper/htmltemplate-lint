function problem(ruleName, type, message, node) {
    return {
        name: ruleName,
        type: type,
        message: message,
        position: getPosition(node)
    };
}

function getPosition(node) {
    if (node) {
        if (node.position) {
            return node.position;
        } else if (node.parent && node.parent.position) {
            return node.parent.position;
        } else if (node.parent && node.parent.parent && node.parent.parent.position) {
            return node.parent.parent.position;
        }
    }

    return {
        line: 1,
        column: 1
    };
}

module.exports = problem;
