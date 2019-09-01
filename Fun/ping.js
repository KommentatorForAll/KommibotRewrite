const discord = require("discord.js");

module.exports.name = "ping";
module.exports.description = "sends you information about the bots/your Latency";
module.exports.usage = pre => {return `\`${pre}ping\``;};
module.exports.ex = async (message, args, client) => {

  const msg = await message.channel.send("<a:load_1:498280749271744512> Ping?");

  const embed = new discord.RichEmbed()
  embed.setColor(0x7289DA)
  embed.setDescription("API Latency is " + Math.round(client.ping) + "ms")
  embed.setAuthor("Latency is " + (msg.createdTimestamp - message.createdTimestamp) + "ms.")
  embed.setFooter("@" + message.author.username)
  msg.edit("<:check_1:498283069485350923> Pong!", embed);
}
