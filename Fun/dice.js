const discord = require("discord.js");

module.exports.name = "dice";
module.exports.description = "A dice ... what do you expect? (defaults to 1d6)";
module.exports.args = ["[DiceCountdDiceSides]"];
module.exports.usage = pre => {return `\`${pre}dice 3d20\n${pre}dice d100\``;};
module.exports.ex = async (message, args, client) => {
	//commandstuff
	const RichEmbed = discord.RichEmbed
	const msgauthor = message.author.username
	//Würfel
	//Argumente und Variablen Registrieren

	var rollarga = args[0]
	var rollargb = args[1]
	const rollargerror = args[2]
	var rolltype = 0
	var dicetype = "wx"
	if (args[0]) rollarga = rollarga.toLowerCase()
	if (args[1]) rollargb = rollargb.toLowerCase()

	if (!args[1] && args[0]) if (rollarga[0] !== "w" && rollarga[0] !== "d") {
		if (rollarga.includes("w")) {
			rollargs = rollarga.split("w")
			rollarga = rollargs[0]
			rollargb = `w${rollargs[1]}`
				args[1] = rollargb
		} else if (rollarga.includes("d")) {
			rollargs = rollarga.split("d")
			rollarga = rollargs[0]
			rollargb = `w${rollargs[1]}`
			args[1] = rollargb
		}
	}

	var rollcountcur = 0
	var rollcountmax = 0

	var gotDefault = false
	var gotStringConverted = false
	var detectedDiceType = false
	var detectedOnlyOneArg = false

	//Argumente validieren

	if(args[2]) return message.channel.send("<:warn_3:498277726604754946> Error: too many Arguments. Only dice type and roll count are valid arguments. The odd argument is " + rollargerror);


	//Zwei Argumente
	var checkregex = /w|d/

	if(args[0] && args[1]) {
		if(checkregex.test(rollarga)&&checkregex.test(rollargb)) return message.channel.send("<:warn_3:498277726604754946> Error: Argument `dice type` is defined twice");
		//if(rollarga.indexOf("d") == 0 && rollargb.indexOf("d") == 0) return message.channel.send("<:warn_3:498277726604754946> Error: Argument `dice type` is defined twice");
		//if(rollarga.indexOf("d") == 0 && rollargb.indexOf("w") == 0) return message.channel.send("<:warn_3:498277726604754946> Error: Argument `dice type` is defined twice");
		//if(rollarga.indexOf("w") == 0 && rollargb.indexOf("d") == 0) return message.channel.send("<:warn_3:498277726604754946> Error: Argument `dice type` is defined twice");
		if(!checkregex.test(rollarga)&&!checkregex.test(rollargb)) return message.channel.send("<:warn_3:498277726604754946> Error: Argument `roll count` is defined twice");
		//if(rollarga.indexOf("d") !== 0 && rollargb.indexOf("d") !== 0) return message.channel.send("<:warn_3:498277726604754946> Error: Argument `roll count` is defined twice");
		//if(rollarga.indexOf("d") !== 0 && rollargb.indexOf("w") !== 0) return message.channel.send("<:warn_3:498277726604754946> Error: Argument `roll count` is defined twice");
		//if(rollarga.indexOf("w") !== 0 && rollargb.indexOf("d") !== 0) return message.channel.send("<:warn_3:498277726604754946> Error: Argument `roll count` is defined twice");

		//Zwei Argumente verarbeiten

		if(rollarga.indexOf("w") == 0) {
			var dicetype = rollarga
			var rollcountmax = rollargb
		} else if(rollarga.indexOf("d") == 0) {
			var dicetype = rollarga
			var rollcountmax = rollargb
		} else if(rollargb.indexOf("w") == 0) {
			var dicetype = rollargb
			var rollcountmax = rollarga
		} else if(rollargb.indexOf("d") == 0) {
			var dicetype = rollargb
			var rollcountmax = rollarga
		} else return message.channel.send("<:warn_3:498277726604754946> Very strange error: Schroedingers Argument `Dice type` is defined and not defined");
	}

	//Ein Argument verarbeiten

	if(args[0] && !args[1]) {

		var detectedOnlyOneArg = true

		if(rollarga.indexOf("w") == 0) {
			var dicetype = rollarga
			var rollcountmax = 1
			var detectedDiceType = true
		} else if (rollarga.indexOf("d") == 0) {
			var dicetype = rollarga
			var rollcountmax = 1
			var detectedDiceType = true
		} else {
			var rolltype = 6
			var rollcountmax = rollarga
		}
	}

	//Kein Argument; Standard einsetzen

	if (!args[0]) {
		var rolltype = 6
		var gotDefault = true
		var rollcountmax = 1
	}

	//String dicetype zu Const rolltype umwandeln

	if (rolltype == 0 && dicetype == "wx") return message.channel.send("<:warn_3:498277726604754946> Error: After validating arguments there is still no dicetype");

	if (rolltype == 0 && dicetype == "w0") return message.channel.send("<:warn_3:498277726604754946> Error: you intented to roll a dice with no sides");

	if (rolltype == 0 && dicetype == "d0") return message.channel.send("<:warn_3:498277726604754946> Error: you intented to roll a dice with no sides");

	if (rolltype == 0) {
		var rolltype = dicetype.substr(1)
		var gotStringReadyToConvert = true
	}

	/*if (rolltype !== 0)

	return message.channel.send("The defined Dice would have " + rolltype + " sides");

	else*/
	if (rolltype == 0) return message.channel.send("<:warn_3:498277726604754946> Error: rolltype is not defined \n" + "gotDefault = " + gotDefault + "\n" + "gotStringReadyToConvert = " + gotStringReadyToConvert + "\n" + "detectedOnlyOneArg = " + detectedOnlyOneArg + "\n" + "detectedDiceType = " + detectedDiceType);

	if (rollcountmax == 0) {
		const plaintext = "*...und " + msgauthor + " hörte leise wie der Wind über den leeren Tisch strich,  auf dem nicht ein Würfel zu sehen war...*"
		const embed = new RichEmbed()
			//embed.setTitle('Title')
			embed.setColor(0x36393E)
			embed.setDescription('<:info_1:498285998346731530> Wenn du ein Ergebnis erhalten möchtest, wäre es vermutlich sinnvoll, das nächste mal auch einen Würfel zu werfen.')
			//embed.setAuthor("Header")
			embed.setFooter("@" + msgauthor)
			//embed.addField("Field");
		return message.channel.send(plaintext, embed);

		// return message.channel.send("<:warn_3:498277726604754946> Error: rollcountmax is not defined \n" + "gotDefault = " + gotDefault + "\n" + "gotStringReadyToConvert = " + gotStringReadyToConvert + "\n" + "detectedOnlyOneArg = " + detectedOnlyOneArg + "\n" + "detectedDiceType = " + detectedDiceType)
	}

	//Auswürfeln und Ergebnisanzeige
	var rollresult = "";
	if (rolltype < 10) {
	var useEmotes = true
	while (rollcountcur < rollcountmax) {
		rollcountcur++;
		switch (Math.floor((Math.random() * rolltype) + 1)) {
			case 1:
			rollresult += "<:dice1:498499602593349640> ";
			break;
			case 2:
			rollresult += "<:dice2:498499649783463936> ";
			break;
			case 3:
			rollresult += "<:dice3:498499697690935316> ";
			break;
			case 4:
			rollresult += "<:dice4:498499821406257152> ";
			break;
			case 5:
			rollresult += "<:dice5:498499866310475806> ";
			break;
			case 6:
			rollresult += "<:dice6:498499944370667541> ";
			break;
			case 7:
			rollresult += "<:dice7:498269382699646996> ";
			break;
			case 8:
			rollresult += "<:dice8:498269498554449921> ";
			break;
			case 9:
			rollresult += "<:dice9:498269540954800128> ";
			break;
			}
		}
	} else {


		//getrennte Zahlen
		var useEmotes = false
		//var lastroll = rollcountmax - 1
		while (rollcountcur < rollcountmax) {
			rollcountcur++;
			rollresult += (Math.floor((Math.random() * rolltype) + 1))
			console.log("rollcountmax: " + rollcountmax)
			console.log("rollcountcur: " + rollcountcur)
			//if (lastroll !== rollcountcur)
			var isLastRoll = false
			if(rollcountmax == rollcountcur) {
				var isLastRoll = true
			}
			console.log("isLastRoll: " + isLastRoll)
			var isNotLastRoll = false
			if(rollcountmax !== rollcountcur) {
				var isNotLastRoll = true
			}
			console.log("isNotLastRoll: " + isNotLastRoll)
			if (rollcountmax == rollcountcur) {
				} else {
					rollresult += " | ";
				}
				console.log(" ")

			} //while
			//return message.channel.send("Diese Würfel wurden leider noch nicht geliefert...")
		} //else

		//Ist Antwort zu lang?

		if(rollcountmax > 70) {
			return message.channel.send("<:warn_3:498277726604754946> Der Tisch ist zu klein, um so viele Würfel darauf zu werfen. Maximal 70 Würfel sind erlaubt ")
		}

		//Antwort

		if (rollcountmax == 1) {
			/*
			return message.channel.send("es wurde mit einem " + rolltype + "-seitigen Würfel gewürfelt. \nDas ergebnis ist: \n\n" + rollresult)
			*/

			const plaintext = "es wurde mit einem " + rolltype + "-seitigen Würfel gewürfelt."
			const embed = new RichEmbed()
				embed.setColor(0x36393E)
				if(useEmotes) {
					embed.setDescription(rollresult)
				} else {
					embed.setAuthor(rollresult)
				}
				embed.setFooter("@" + msgauthor)

			return message.channel.send(plaintext, embed);
		} else {

			/*
			return message.channel.send("es wurde mit " + rollcountmax + " " + rolltype + "-seitigen Würfeln gewürfelt. \nDas ergebnis ist: \n\n" + rollresult)
			*/
			const plaintext = "es wurde mit " + rollcountmax + " " + rolltype + "-seitigen Würfeln gewürfelt."
			const embed = new RichEmbed()

				embed.setColor(0x36393E)
				if(useEmotes) {
					embed.setDescription(rollresult)
				} else {
					embed.setAuthor(rollresult)
				}
				embed.setFooter("@" + msgauthor)

			return message.channel.send(plaintext, embed);
		}

	}
