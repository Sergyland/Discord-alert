const createEmbed = require('./createEmbed')

function createMessage(context) {
    let message = "Test with refactor!";
    let embed = createEmbed(context);
    return {
        content : message,
        embed : embed ? embed : null
    };
}

module.exports = createMessage