const discord = require("discord.js");
const fs = require("fs");

module.exports.name = "cookie";
module.exports.description = "gives someone/the guildowner a cookie";
module.exports.args = ["[person]"];
module.exports.usage = pre => {return `\`${pre}cookie\` or \`${pre}cookie Commentator2.0\``;};
module.exports.ex = async (message, args, client) => {
  if (args[0]) {
    let member = message.mentions.users.first()||client.users.get(args.join(" "));
    if (member) {
      if (member == client.user) {
        message.channel.send("Nom :3");
        return;
      }
      else {
        member = args[0];
      }
    }
  }
  else {
    member = message.guild.owner;
    var c = parseInt(fs.readFileSync(`SETTINGS/${message.guild.id}/cookies.txt`, "utf8")) + 1;
    message.channel.send(`<@${message.author.id}> hat ${message.guild.owner.displayName} einen :cookie: gegeben. ${message.guild.owner.displayName} hat jetzt schon ${c} cookies!`);
    fs.writeFileSync(`SETTINGS/${message.guild.id}/cookies.txt`, c);
    return;
  }
  message.channel.send(`<@${message.author.id}> hat ${member.mention} einen :cookie: gegeben!`);
}
