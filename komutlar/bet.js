const Discord = require("discord.js");
const db = require("quick.db");
const { randomRange, verify } = require("../util/util.js");

exports.run = async (client, message, args) => {
  var para = db.fetch(`para_${message.author.id + message.guild.id}`);
  let user = message.mentions.users.first();
  if (user.bot) return message.reply('Botlar ile oynayamazsın!');
  var para2 = db.fetch(`para_${user.id + message.guild.id}`);
  let miktar = parseInt(args[1]);
  if (!miktar) {
    return message.channel.send(`Lütfen miktarını da giriniz!`);
  }
    if (miktar < 0) {
    return message.channel.send(`Bet değeri negatif olamaz!`);
  }
  if (para < `${miktar}`) {
    return message.channel.send("Yeterli paran yok!");
  }
  if (para2 < `${miktar}`) {
    return message.channel.send("Rakibin yeterli parası yok!");
  }
  message.channel.send(
    `${user} **${miktar}₺** bet teklifini kabul ediyor musun? \n(\`evet\` veya \`hayır\` olarak cevap veriniz.).`
  );
  const verification = await verify(message.channel, user);
  if (!verification) {
    return message.channel.send(`Bet işlemi iptal edildi!`);
  } else {
    var liste = ["rakip", "ben"];
    let sonuc = liste[Math.floor(Math.random() * 2)];
    if (sonuc === "rakip") {
      message.channel.send(
        `Tebrikler! ${message.author} kazandı! ${2 * miktar} hesabına eklendi!`
      );
      db.add(`para_${message.author.id + message.guild.id}`, `${miktar}`);
      db.add(`para_${user.id + message.guild.id}`, `-${miktar}`);
    } else if (sonuc === "ben") {
      message.channel.send(
        `Tebrikler! ${user} kazandı! ${2 * miktar} hesabına eklendi!`
      );
      db.add(`para_${user.id + message.guild.id}`, `${miktar}`);
      db.add(`para_${message.author.id + message.guild.id}`, `-${miktar}`);
    }
  }
  console.log(`Bet Komutu Kullanıldı:`+ `${message.guild.name}`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bet", "kumar"],
  permLevel: 0
};

exports.help = {
  name: "bet",
  description: "Birisiyle bet oynamanı sağlar.",
  usage: "bet"
};
