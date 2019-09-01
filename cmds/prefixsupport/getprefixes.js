const fs = require("fs");
const discord = require("discord.js");
module.exports.name = "getprefixes";
module.exports.alias = ["prefix", "prefixes", "getprefix"];
module.exports.description = "Sends a List of all my current Prefixes.";
module.exports.usage = pre => {return `\`${pre}getprefix\` \n \`${pre}prefixes\``};


module.exports.ex = async (message, args, client) => {
  var pres = fs.readFileSync(`SETTINGS/${message.guild.id}/prefixes.txt`, "utf8").split("\n");
  pres.pop();
  var embed = new discord.RichEmbed();
  embed.setTitle("All my Prefixes:");
  embed.setColor("BLACK");
  for (pre of pres) {
    embed.addField(pre, "One of 'em");
  }
  message.channel.send(embed);
}

module.exports.boot = (id) => {
  var pres = fs.readFileSync(`SETTINGS/${id}/prefixes.txt`, "utf8").split("\n");
  pres.pop();
  return pres;
}
