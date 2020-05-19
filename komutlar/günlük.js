const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment");

exports.run = async (client, message, args) => {
  let user = message.author;
  let sebep = args.join(" ");
  let sonalim = db.fetch(`gunluk_${user.id}`);
  let bugun = moment().format("L");
  if (sonalim != bugun) {
    db.set(`gunluk_${user.id}`, bugun);
    console.log("son alma tarihi güncellendi!");
    const basarili = new Discord.RichEmbed().setDescription(
      `**Günlük kredin olan 200₺ hesabına aktarıldı**`
    );
    message.channel.send(basarili);
    db.add(`para_${message.author.id + message.guild.id}`, 200);
  } else if (sonalim == bugun) {
    console.log(sonalim);
    const hatali = new Discord.RichEmbed()
      .setDescription(`\n \n **Bugün zaten günlük kredini aldın!**`)
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/682314043238645866/702282289530273853/Yanp_Sonen_Unle_Gif.gif"
      );
    message.channel.send(hatali);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["günlük"],
  permLevel: 0
};

exports.help = {
  name: "gunluk",
  description: "AFK olmanızı sağlar.",
  usage: "gunluk <sebep>"
};
