const discord = require("discord.js");

module.exports.name = "say";
module.exports.description = "sais what you want it to say";
module.exports.usage = pre => {return `\`${pre}say hello\``;};
module.exports.args = ["<text>"];
module.exports.ex = async (message, args, client) => {
  message.channel.send(args.join(" "));
}
