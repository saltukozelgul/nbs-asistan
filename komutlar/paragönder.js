const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  let user = message.author
  if (user.bot) return
  let kisi = message.mentions.users.first()
  let mitkar = args[1]
  let para = db.fetch(`para_${user.id + message.guild.id}`)
  if (kisi.bot) return message.reply('Botlara para gönderemezsin!');
  if (!kisi) return message.channel.send(`**Kime göndermek istiyorsun delikanlı**`)
  if (!mitkar) return message.channel.send("**Ne kadar göndereceğini de girmelisin.**")
  if (para < mitkar) return  message.channel.send("**Yeterli paran yok delikanlı**");
  db.add(`para_${user.id + message.guild.id}`, -`${mitkar}`)
  db.add(`para_${kisi.id + message.guild.id}`, `${mitkar}`)
  message.channel.send(`
${kisi}, ${user}'ın elini öptü ve  **${mitkar}₺** kazandı!

`)
  console.log(`Paragönder Komutu Kullanıldı:`+ `${message.guild.name}`)
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'paragönder',
  description: "Profilinize açıklam  a yazmanızı sağlar.",
  usage: 'paragönder <kişi> <miktar>'
}