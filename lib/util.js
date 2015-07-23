exports.isWhiteSpaceOnlyNode = function(node) {
    return (
        node.type === 'Text' &&
        node.content.match(/^\s+$/g)
    );
};
