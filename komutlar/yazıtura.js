const Discord = require("discord.js");
const chancejs = require("chance");
const chance = new chancejs();

const cevaplar = ["Tura geldi.", "Yazı geldi."];

exports.run = function(client, message) {
  var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];

  if (cevap === "Yazı geldi.") {
    const embedyazı = new Discord.RichEmbed()
      .setColor(0xf4b942)
      .setDescription(cevap)
      .setImage(
        "http://sendegor.com/wp-content/uploads/2017/02/s-bfaaf442620bf9809801f37623dfc0fa80d95486.gif"
      )
      .setThumbnail(
        "https://upload.wikimedia.org/wikipedia/commons/6/64/1TL_obverse.png"
      );
    message.channel.send(embedyazı);
  } else if (cevap === "Tura geldi.") {
    const embedtura = new Discord.RichEmbed()
      .setColor(0xf4b942)
      .setDescription(cevap)
      .setImage(
        "http://sendegor.com/wp-content/uploads/2017/02/s-bfaaf442620bf9809801f37623dfc0fa80d95486.gif"
      )
      .setThumbnail(
        "https://upload.wikimedia.org/wikipedia/commons/c/cd/1TL_reverse.png"
      );
    message.channel.send(embedtura);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "yazıtura",
  description: "Yazı-Tura atar.",
  usage: "yazıtura"
};
