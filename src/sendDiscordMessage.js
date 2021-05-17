const Discord = require("discord.js");

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