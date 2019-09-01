const discord = require("discord.js");

module.exports.name = "coin";
module.exports.description = "Flips a coin";
module.exports.usage = pre => {return `\`${pre}coin\``;};
module.exports.ex = async (message, args, client) => {
  var rnd;
    var times = parseInt(args[0])
    const t = times;
    if (isNaN(args[0])) {}
    else {
    if (times > 999999) {
      message.channel.send("It would take me too long to do that. *(Max 999999)*");
      return;
    }
    var h = 0;
    var n = 0;
    while (times > 0) {
      rnd = Math.round(Math.random());
      if (rnd) {
        h += 1;
      }
      else {
        n += 1;
      }
      times -= 1;
    }
    message.channel.send(`In ${t} throws, there were ${h} Heads and ${n} Numbers.`);
    return;
  }
  rnd = Math.round(Math.random());
  if (rnd) {
    message.channel.send("Head!");
    return;
  }
  else {
    message.channel.send("Number!");
  }
}
