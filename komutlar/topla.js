const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const { randomRange, verify } = require('../util/util.js');

exports.run = async (client, message, args) => {
  let user = message.author;
  let sebep = args.join(" ");
  let sonalim = db.fetch(`gunluk_${user.id + message.guild.id}`) + `${message.guild.id}`;
  let bugun = moment().format("L");
  if (sonalim != bugun + `${message.guild.id}`) {
    db.set(`gunluk_${user.id + message.guild.id}`, bugun);
    console.log("son alma tarihi güncellendi!");
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
  
  let sirkettipi = db.fetch(`sirkettipi_${message.author.id}`);
  if (!sirkettipi) return message.channel.send("Önce bir şirket kurmalısın");
  let sonalims = db.fetch(`gunluksirket_${message.author.id + message.guild.id}`) + `${message.guild.id}`;
  let sirketgelir = db.fetch(`sirketgelir_${message.author.id+ message.guild.id}`);
    if (sonalims != bugun + `${message.guild.id}`) {
    db.set(`gunluksirket_${message.author.id + message.guild.id}`, bugun);
    console.log("Son alma tarihi 'şirket' güncellendi!");
    const basarili = new Discord.RichEmbed().setDescription(
      `**Günlük şirket değerin olan ${sirketgelir}₺ hesabınıza aktarıldı**`
    );
    message.channel.send(basarili);
    db.add(`para_${message.author.id + message.guild.id}`, `${sirketgelir}`);
    } 
    else if (sonalims = bugun + `${message.guild.id}`) {
      console.log(sonalims);
    const hatali = new Discord.RichEmbed()
      .setDescription(`\n \n **Bugün zaten günlük şirket kredini aldın!**`)
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/682314043238645866/702282289530273853/Yanp_Sonen_Unle_Gif.gif"
      );
      
    message.channel.send(hatali);  
    }
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["topla"],
  permLevel: 0
};

exports.help = {
  name: "topla",
  description: "AFK olmanızı sağlar.",
  usage: "topla <sebep>"
};