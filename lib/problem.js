function problem(ruleName, type, message, position) {
    return {
        name: ruleName,
        type: type,
        message: message,
        position: position
    };
}

module.exports = problem;
