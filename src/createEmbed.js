// This fonction create an embed after some events, such as a push.
const Discord = require("discord.js")

function createEmbed(context) {
    if(!context) {
        throw new Error("No context passed to the embed constructor");
    }
    
    let embed = new Discord.MessageEmbed();
    let payload = context.payload;
    console.error(payload)

    let {login, avatar_url, html_url} = payload.sender;
    embed.setAuthor(login, avatar_url, html_url);

    let {eventName, sha, workflow} = context;
    
    let description = payload.head_commit ?
        payload.head_commit.message
        : payload.workflow_run ?
        payload.workflow_run.head_commit.message
        : "No description can be provided."
    ;
    
    embed.setTitle(eventName + " triggered " + workflow)
    .setDescription(description)
    .setTimestamp()
    .addField("Event", context.eventName)
    .addField("Job", `${context.job}#${context.runNumber}`)
    .addField("SHA", sha)
    .addField("Repo", payload.repository.html_url)
    .setFooter("Made with ❤", "https://raster.shields.io/badge/Sergyland-Dicord--Alert-black.png?style=for-the-badge&logo=github")
    // I don't know who is behind this website and if it'll continue to work!
    .setImage(`https://opengraph.githubassets.com/discord-alert/${payload.repository.full_name}?width=1174&height=587`);
    
    return embed;
}

module.exports = createEmbed;