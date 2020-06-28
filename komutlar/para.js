const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  
  let user = message.mentions.users.first() || message.author
  if(user.bot) return message.channel.send('Botların parası olmaz.')
  var para = db.fetch(`para_${user.id + message.guild.id}`); 
  
  message.channel.send(`
${user}'in parası ${para}₺

`)
  console.log(`Para Komutu Kullanıldı:`+ `${message.guild.name}`)
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'para',
  description: "Paranıza bakmanızı sağlar",
  usage: 'para <kişi>'
}