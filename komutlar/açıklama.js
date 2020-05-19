const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let user = message.author;
  let sebep = args.join(" ");

  if (!sebep)
    return message.channel.send(
      `Bir açıklama yazmalısın. **//açıklama <açıklamanız>**`
    );

  db.set(`desc_${user.id}`, `${sebep}`);
  message.channel.send(`Profil açıklamanız başarıyla değiştirildi.`);
  message.channel.send(`Yeni açıklaman: \`${sebep}\``);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "açıklama",
  description: "Profilinize açıklama yazmanızı sağlar.",
  usage: "açıklama <açıklamanız>"
};
