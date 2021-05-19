const core = require('@actions/core');
const github = require('@actions/github');

const Discord = require('discord.js');
const createMessage = require('./createMessage.js');

require('dotenv').config();

const context = process.env.NODE_ENV === "dev" ?
    require('../payload/workflow_run.json') :
    github.context;

const channelID = core.getInput('channel-id', {required: true});
const discordToken = core.getInput('discord-token', {required: true});
//const githubToken = core.getInput('github-token', {required: true});

async function run() {
    let client = new Discord.Client()
    client.login(discordToken)

    let mymessage = new Discord.MessageEmbed(createMessage(context))

    client.on("ready", () => {
        client.channels.fetch(channelID)
        .then( channel => channel.send("Test",mymessage))
        .then(() => {
            console.log("Message Sent!")
            process.exit(0)
        })
        .catch(e => {
            console.error(e)
            process.exit(1)
        })
    })

}

run()