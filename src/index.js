const core = require('@actions/core');
const github = require('@actions/github');

const Discord = require('discord.js');
const createMessage = require('./createMessage.js')

let context;

if(!process.env.GITHUB_ACTIONS){ 
    require('dotenv').config()
    context = require('../dev/context.json')
} else {
    context = github.context 
}

let payload = context.payload


const channelID = core.getInput('channel-id', {required: true});
const discordToken = core.getInput('discord-token', {required: true});
//const githubToken = core.getInput('github-token', {required: true});

async function run() {
    let client = new Discord.Client()
    client.login(discordToken)

    let mymessage = new Discord.MessageEmbed(createMessage(payload))

    client.on("ready", () => {
        client.channels.fetch(channelID)
        .then( channel => channel.send(mymessage))
        .then(()=> {
            console.log("This payload:"+JSON.stringify(payload, undefined,2))
            process.exit(0)
        })
        .catch(e => {
            console.error(e)
            process.exit(1)
        })
    })

}

run()