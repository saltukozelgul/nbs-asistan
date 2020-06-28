const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment");

exports.run = async (client, message, args) => {
  let user = message.author;
  let sebep = args.join(" ");
  let sonalim = db.fetch(`gunluk_${user.id + message.guild.id}`) + `${message.guild.id}`;
  let bugun = moment().format("L");
  if (sonalim != bugun + `${message.guild.id}`) {
    db.set(`gunluk_${user.id + message.guild.id}`, bugun);
    console.log("Son alma tarihi güncellendi!");
    const basarili = new Discord.RichEmbed().setDescription(
      `**Günlük kredin olan 200₺ hesabına aktarıldı**`
    );
    message.channel.send(basarili);
    db.add(`para_${message.author.id + message.guild.id}`, 200);
  } else if (sonalim == bugun + `${message.guild.id}`) {
    console.log(sonalim);
    const hatali = new Discord.RichEmbed()
      .setDescription(`\n \n **Bugün zaten günlük kredini aldın!**`)
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/682314043238645866/702282289530273853/Yanp_Sonen_Unle_Gif.gif"
      );
    message.channel.send(hatali);
  }
  console.log(`Günlük Komutu Kullanıldı:`+ `${message.guild.name}`)
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
