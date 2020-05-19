const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  let user = message.mentions.users.first() || message.author
  var para = db.fetch(`para_${user.id + message.guild.id}`); 
  
  message.channel.send(`
${user}'in parası ${para}₺

`)
  
  
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