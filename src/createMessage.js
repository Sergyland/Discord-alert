const { context } = require("@actions/github/lib/utils")
const Discord = require("discord.js")

function createMessage(context) {
    if(!context) {
        throw new Error("No context passed to the message constructor")
    }
    
    let message = new Discord.MessageEmbed()

    let payload = context.payload;
    let {login, avatar_url, html_url} = payload.sender
    message.setAuthor(login, avatar_url, html_url);

    let {eventName, sha, workflow} = context;
    message.setTitle(eventName + " triggered " + workflow)
    .setDescription(payload.head_commit.message)
    .setTimestamp()
    .addField("Event", context.eventName)
    .addField("Job", `${context.job}#${context.runNumber}`)
    .addField("SHA", sha)
    .addField("Repo", payload.repository.html_url)
    .setFooter("Made with ❤", "https://img.shields.io/badge/Sergyland-Dicord--Alert-black?style=for-the-badge&logo=github")
    // I don't know who is behind this website and if it'll continue to work!
    .setImage(`https://opengraph.githubassets.com/discord-alert/${payload.repository.full_name}?width=1174&height=587`);
    
    return message;
}

function createMessageTitle(context) {
    let {eventName} = context
}
module.exports = createMessage