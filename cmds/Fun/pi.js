const discord = require("discord.js");

module.exports.name = "pi";
module.exports.description = "Shows you a few decimals of pi";
module.exports.usage = pre => {return `\`${pre}pi\``;};
module.exports.ex = async (message, args, client) => {
  message.channel.send("Pi is about 3.1415926535897932384626433832795028841971693993");
}
