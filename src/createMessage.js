const Discord = require("discord.js")

function createMessage(payload) {
    if(!payload) throw new Error("No context passed to the message constructor")
    let message = new Discord.MessageEmbed()
    let {login, avatar_url, html_url} = payload.sender
    message.setAuthor(login, avatar_url, html_url)
    .setTimestamp()
    .setFooter("Created by discord-alert, the github action!")
    
    return message;
}

module.exports = createMessage