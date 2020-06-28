const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  let user = message.mentions.users.first()
  let para = db.fetch(`para_${user.id + message.guild.id}`)
  if args[0] === "paraekle" {
    let mitkar = args[2]
    db.add(`para_${user.id + message.guild.id}`, `${mitkar}`)  
  }
  if args[0] === "paraal"
    let mitkar = args[2]
    db.add(`para_${user.id + message.guild.id}`, `-${mitkar}`)  
    
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
}

exports.help = {
  name: 'admin',
  description: "Admin kontrol paneli.",
  usage: 'admin'
}
