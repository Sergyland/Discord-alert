const core = require('@actions/core');
const github = require('@actions/github');
const context = github.context;
const Discord = require('discord.js');
const createMessage = require('./createMessage.js')

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
    let client = new Discord.Client()
    client.login(discordToken)

    let mymessage = new Discord.MessageEmbed(createMessage(payload))

    client.on("ready", () => {
        client.channels.fetch(channelID)
        .then( channel => channel.send(JSON.stringify(payload), mymessage))
        .then(()=> process.exit(0))
        .catch(e => {
            console.error(e)
            process.exit(1)
        })
    })

}

run()