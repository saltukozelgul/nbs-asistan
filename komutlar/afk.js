const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let user = message.author;
  let sebep = args.join(" ");

  if (!sebep) return message.channel.send(`Bir sebep yazmalısın.`);

  db.set(`nick_${user.id}`, `${message.member.displayName}`);
  db.set(`afk_${user.id}`, sebep);
  message.member.setNickname(`[AFK] ${message.member.displayName}`);
  message.member.setVoiceChannel("342736290225192972");
  message.channel.send(`Artık \`${sebep}\` sebebiyle AFK'sın.`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "afk",
  description: "AFK olmanızı sağlar.",
  usage: "afk <sebep>"
};
