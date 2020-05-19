const Discord = require("discord.js");

exports.run = function(bot, message, args) {
  let katsayi = parseInt(args[0]);
  let intiharsebep = args.join(" ");
  let katsayi2 = parseInt(intiharsebep);
  if (!katsayi2) {
    katsayi2 = 1;
  }

  message.channel.sendEmbed(
    new Discord.RichEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle("🎲 Zar " + doMagicDiceVoodoo() + " geldi")
  );

  function doMagicDiceVoodoo() {
    var rand = ["1", "2", "3", "4", "5", "6"];

    return katsayi2 * rand[Math.floor(Math.random() * rand.length)];
  }
};

exports.conf = {
  enabled: true,
  aliases: ["zar"],
  guildOnly: false,
  permLevel: 0
};

exports.help = {
  name: "zarat",
  description: "Zar Atın",
  usage: ""
};
