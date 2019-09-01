const discord = require("discord.js");

module.exports.name = "help";
module.exports.description = "Sends you a List of my Commands";
module.exports.usage = pre => {return `\`${pre}help\``;};
module.exports.args = ["[command]"];
module.exports.ex = async (message, args, client) => {
  const cmds = client.cmds;
  const pre = client.gi[message.guild.id]["pres"][0];
  if (args.length > 0) {
    const cmd = cmds[args[0]];
    console.log(cmd)
    if (cmd) if (!cmd.perm || message.member.hasPermission(cmd.perm)) {
      var embed = new discord.RichEmbed();

      embed.setTitle(`${cmd.name}`);
      embed.setDescription(cmd.description);
      if (cmd.alias) {
        embed.addField(`aliases: \`${cmd.alias.join("\`, \`")}\``);
      }
      if (cmd.args) {
        embed.addField(`arguments: ${cmd.args.join(" ")}`);
      }
      embed.addField(`usage: ${cmd.usage(pre)}`);
      embed.setFooter("<required arguments> [optional arguments]");
      message.channel.send(embed);
      return;
    }

  }
  var embed = new discord.RichEmbed();
  var embcmds = [];
  for (cmd of Object.values(cmds)) {
    if(embcmds.includes(cmd.name)) {continue;}
    if (cmd.perm && !cmd.hidden) {
      if (message.member.hasPermission(cmd.perm)) {
        embed.addField(cmd.name, cmd.description);
      }
    }
    else {
      embed.addField(cmd.name, cmd.description);
    }
    embcmds.push(cmd.name);
  }
  message.channel.send(embed);
}
