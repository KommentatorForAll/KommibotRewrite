const discord = require("discord.js");

module.exports.name = "pong";
module.exports.description = "Just a stupid Command.";
module.exports.usage = pre => {return `\`${pre}pong\``;};
module.exports.hidden = true;
module.exports.ex = async (message, args, client) => {
  var msg = [" is stupid"," don't know how to play ping-pong", " Everyone who's ever loved you was wrong."];
  message.channel.send(`<@${message.author.id}>${msg[Math.floor(Math.random()*msg.length)]}`);
}
