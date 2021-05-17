const core = require('@actions/core');
const { context } = require('@actions/github');
const Discord = require('discord.js');

if(!process.env.GITHUB_ACTIONS){ 
    require('dotenv').config()
}

async function run() {
    const channelID = core.getInput('channel-id', {required: true});
    const discordToken = core.getInput('discord-token', {required: true});
    //const githubToken = core.getInput('github-token', {required: true});

    const actionType = context.payload ? context.payload.action : "Dev local";

    const message = await sendDiscordMessage(discordToken, channelID, actionType)

    core.debug(message);
    core.debug(JSON.stringify(context.payload,"2"))
}

async function sendDiscordMessage(discordToken, channelID, messageContent) {
    const client = new Discord.Client();
    client.login(discordToken);

    client.once("ready", async () => {
        let channel = await client.channels.fetch(channelID);
        let message = await channel.send(messageContent);
        return message
    })
}

run();