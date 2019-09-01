const discord = require("discord.js");
const fs = require("fs");

module.exports.name = "abgehoben";
module.exports.description = "Du findest jemanden/den Owner abgehoben.";
module.exports.usage = pre => {return `\`${pre}abgehoben\` or \`${pre}abgehoben Commentator2.0\``;};
module.exports.ex = async (message, args, client) => {
    if (args[0]) {
      var t = message.mentions.users.first()||client.users.get(args.join(" "));
      if (t) {
        message.channel.send(`${t.mention} ist abgehoben.`);
        return;
      }
      else {
        message.channel.send(`${args[0]} befindet sich über den Wolken.`);
        return;
      }
    }
    else {
      var c = 0;
      try {
        c = parseInt(fs.readFileSync(`SETTINGS/${message.guild.id}/abgehoben.txt`, "utf8")) + 1;
      }
      catch (err) {}
      message.channel.send(`<@${message.author.id}> findet ${message.guild.owner.displayName} abgehoben. Obwohl sie/er sich doch nur ${c} Meter über dem Boden befindet.`);
      fs.writeFileSync(`SETTINGS/${message.guild.id}/abgehoben.txt`, c);
    }

};
