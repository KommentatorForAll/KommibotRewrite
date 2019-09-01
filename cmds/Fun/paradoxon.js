const discord = require("discord.js");
const paradoxons = ["Dieser Satz ist falsch!","Der folgende Satz ist richtig. Der erste Satz ist falsch!","Pinocchio sagt: Meine Nase wächst gerade!","Windows meldung: Wenn die Tastatur nicht mehr funktioniert, drücken sie die escape-Taste.","Neongrau","Brennholzverleih","Absichtliches Versehen"];

module.exports.name = "paradoxon";
module.exports.description = "Sends you a random Paradoxon";
module.exports.usage = pre => {return `\`${pre}paradoxon\``;};
module.exports.ex = async (message, args, client) => {
	message.channel.send(paradoxons[Math.floor(Math.random()*paradoxons.length)-1]);

}
