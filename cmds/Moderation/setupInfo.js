const discord = require("discord.js");

module.exports.name = "setupinfo";
module.exports.description = "Sends you a list of things one is able to setup";
module.exports.usage = pre => {return `\`${pre}setupinfo\``;};
module.exports.sui = true;
module.exports.ex = async (message, args, client) => {
  if (!message.member.hasPermission("MANAGE_GUILD")) {
    await message.author.send("You have no permission to use setup something on this guild, but I'll still send you this, as well as a link to install me on one of your servers.");
    await client.cmds["link"].ex(message, args, client);
  }
  var embed = new discord.RichEmbed()
  var embcmds = [];
  for (var cmd of Object.values(client.cmds)) {
    if (cmd.sui && !(cmd.name in embcmds)) {
      embed.addField(cmd.name, cmd.description);
      embcmds.push(cmd.name);
    }
  }
  embed.setFooter("For further information about one of these commands, use the help command.");
  await message.author.send(embed)
}