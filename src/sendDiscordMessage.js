import * as Discord from 'discord.js';

export async function sendDiscordMessage(discordToken, channelID) {
    const client = new Discord.Client();
    client.login(discordToken);

    let channel = await client.channels.cache.get(channelID);
    channel.send("Coucou");
}
