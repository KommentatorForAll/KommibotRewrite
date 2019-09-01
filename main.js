const discord = require("discord.js");
const fs = require("fs");
const readrec = require("fs-readdir-recursive");
const setup = require("./setup.js");
const client = new discord.Client();
const enmap = require("enmap");
var apk;
var apkowner;
var debugchannel;

const standardprefix = "!";
const standardprefixes = [standardprefix, `<@${client.id}> `, `<@!${client.id}> `]

var cmds = {};

readrec("./cmds").filter(file => file.endsWith(".js")).forEach(scr => {
  const cmd = require(`./cmds/${scr}`);
  cmds[cmd.name] = cmd;
  if (cmd.alias) {
    cmd.alias.forEach(ali => cmds[ali] = cmd);
  }
});
console.log(cmds);
//Ready function
client.once("ready", async () => {
  client.cmds = cmds;
  client.gi = {};
  apk = await client.fetchApplication();
  apkowner = apk.owner;
  //debugchannel = apkowner;


  console.log("Current Guilds:");
  client.guilds.forEach(guild => {
    console.log(`Name: ${guild.name} - id: ${guild.id} - Accounts to investigate: ${guild.members.size}`);
    if (!fs.existsSync(`./SETTINGS/${guild.id}`)) {
      setup(guild.id, standardprefixes);
      console.log(`New guildfile created: ${guild.name}`);
    }
    client.gi[guild.id] = {};
    client.gi[guild.id]["pres"] = cmds["getprefixes"].boot(guild.id);

    if (guild.id == 580333808386179072) {debugchannel = guild.channels.filter(c => c.id == 617648294146867200).first()}
  });
  client.user.setActivity(`to ${standardprefix}help from you.`, { type: 'LISTENING' });
  console.log("Kommibot is now ready");
});


//for every message
client.on("message", async message => {
  if(message.author.bot) {return;}
  const member = message.member;
  const channel = message.channel;
  const content = message.content;
  var guild;
  try{
    guild = message.guild;
  }
  catch(err) {
    message.channel.send("There are no dm commands at the moment.");
    return;
  }
  const pres = client.gi[guild.id]["pres"];

  if (!pres.includes(standardprefix)) {
    if (content.startsWith(`${standardprefix}prefix`)) {
      cmds["getprefixes"].ex(message, [], client);
      return;
    }
    if (content.startsWith(`${standardprefix}help`)) {
      cmds["help"].ex(message, [], client);
      message.channel.send(`I haven't got the prefix \`${standardprefix}\` anymore. Please use \`${standardprefix}prefix\` to see all my prefixes.`);
    }
  }

  var iscmd = false;
  var prelen = 0;
  for (var pre of pres) {
    if (content.startsWith(pre)) {
      iscmd = true;
      prelen = pre.length;
      break;
    }
  }

  if (iscmd) {
    var inv = content.slice(prelen).split(" ");
    var cmd = inv[0].toLowerCase();
    const args = inv.slice(1);
    if (!cmds[cmd]) {
      channel.send(`\`${cmd}\` is an invalid Command!`);
      return;
    }
    cmd = cmds[cmd];
    if (cmd.perm && !member.hasPermission(cmd.perm) && member.id != apkowner.id) {
      channel.send(":fire: you are not allowed to do that!");
      return;
    }
    try {
        if (args[args.length - 1] == "deletemsg") {
          args.pop();
          message.delete();
        }
    }
    catch (err){}
    try {
      await cmd.ex(message, args, client);
    }
    catch (err) {
      console.log(err);
      var embed = new discord.RichEmbed();
      embed.setTitle("Error while executing following cmd:");
      embed.setDescription(err);
      embed.addField(content);
      debugchannel.send(embed);
    }
    if (cmd.reload) {
      client.gi[guild.id]["pres"] = cmds["getprefixes"].boot(guild.id);

    }
  }
});



client.login(process.env.TOKEN);
