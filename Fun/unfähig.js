const discord = require("discord.js");
const fs = require("fs");

module.exports.name = "unfähig";
module.exports.description = "Du findest jemanden/den Owner unfähig";
module.exports.usage = pre => {return `\`${pre}unfähig\` or \`${pre}unfähig Commentator2.0\``;};
module.exports.args = ["[person]"];
module.exports.ex = async (message, args, client) => {
  if (args[0]) {
    var t = message.guild.members.find(internalMember => internalMember.displayName.startsWith(args[0]));

    if (t.mention) {
      message.channel.send(`${message.author.mention} findet ${t.mention} unfähig.`);
      return;
    }
    else {
      message.channel.send(`${message.author.mention} findet ${t} unfähig.`);
      return;
    }
  }
  else {
    var c = 0;
    try {
      c = parseInt(fs.readFileSync(`SETTINGS/${message.guild.id}/unfähig.txt`, "utf8")) + 1;
    }
    catch (err) {}
    message.channel.send(`<@${message.author.id}> findet ${message.guild.owner.displayName} unfähig. Es finden ${message.guild.owner.displayName} ${c} Personen unfähig.`);
    fs.writeFileSync(`SETTINGS/${message.guild.id}/unfähig.txt`, c);
  }

};
