const context = require('./context');

async function run(context) {
    const Discord = require('discord.js');
    const createMessage = require('./createMessage.js');
    
    const channelID = process.env.INPUT_CHANNEL_ID;
    const discordToken = process.env.INPUT_DISCORD_TOKEN;

    if(!channelID || !discordToken) {
        console.error("Missing paramater.");
        process.exit(1);
    }

    let client = new Discord.Client()
    client.login(discordToken)
    console.log("test",context)
    let message = createMessage(context)

    client.on("ready", () => {
        client.channels.fetch(channelID)
        .then( channel => channel.send(message))
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

run(context);