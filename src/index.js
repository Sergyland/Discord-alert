const core = require('@actions/core');
const github = require('@actions/github');
const context = github.context;
const Discord = require('discord.js');

if(!process.env.GITHUB_ACTIONS){ 
    require('dotenv').config()
}

async function run() {
    const channelID = core.getInput('channel-id', {required: true});
    const discordToken = core.getInput('discord-token', {required: true});
    //const githubToken = core.getInput('github-token', {required: true});

    const actionType = context.payload ? context.payload.action : "Dev local";
    const actionMessage = "Action "+actionType
    const message = await sendDiscordMessage(discordToken, channelID, actionMessage)

    console.log(message);
    console.log(JSON.stringify(context.payload,"2"))

    process.exit(0)
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

run().then(() => process.exit(0))
    .catch((e) => console.error(e));