const discord = require("discord.js");

module.exports.name = "super";
module.exports.description = "Du findest jemanden super.";
module.exports.args = ["[person]", "[wie]"]
module.exports.usage = pre => {return `\`${pre}super\` or \`${pre}super commentator\` or \`${pre}super commentator2.0 toll\``;};
module.exports.ex = async (message, args, client) => {
  var m = "";
  var t = message.guild.owner.displayName;
  console.log(t);
  if (args[0]) {
    t = args[0];
    if (args[1]) {
      m = " "+args[1];
    }
  }
  message.channel.send(`<@${message.author.id}> findet ${t} super${m}.`);
}
