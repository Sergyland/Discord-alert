const core = require('@actions/core');
const github = require('@actions/github');
const context = github.context;
const Discord = require('discord.js');

var payload;

if(!process.env.GITHUB_ACTIONS){ 
    require('dotenv').config()
    payload = require('../dev/payload.json')
} else {
    payload = context.payload
}

const channelID = core.getInput('channel-id', {required: true});
const discordToken = core.getInput('discord-token', {required: true});
//const githubToken = core.getInput('github-token', {required: true});

async function run() {
    const actionType = payload.action
    const message = await sendDiscordMessage(discordToken, channelID, actionType)
    //console.log(message)
    //console.log(JSON.stringify(context.payload,"2"))
}

async function sendDiscordMessage(discordToken, channelID, messageContent) {
    const client = new Discord.Client();
    client.login(discordToken);

    client.once("ready", async () => {
        try {
            console.debug("Discord bot is ready")
            let channel = await client.channels.fetch(channelID);
            let message = await channel.send(messageContent);
            process.exit(0)
         } catch(e) {
             console.error("Error occured during message delivery", e)
             process.exit(1)
         }
    })
}

run()