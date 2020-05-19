const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client();

exports.run = async (bot, message, args) => {
  let u = message.mentions.users.first() || message.author;      
  let sira = ''
        const sorted = message.guild.members.filter(u => !u.user.bot).array().sort((a, b) => { return db.fetch(`seviye_${b.user.id + message.guild.id}`) - db.fetch(`seviye_${a.user.id + message.guild.id}`) });
        const top10 = sorted.splice(0, message.guild.members.size)
        const mappedID = top10.map(s => s.user.username);
        for(var i = 0; i < message.guild.members.size; i++) {
                if(mappedID[i] === u.id) {
                        sira += `${i + 1}`
                }
        }

    
    const embed = new Discord.RichEmbed()
    .setAuthor(`Liderlere selam durun lütfen.`, message.guild.iconURL)
    .setColor(message.member.displayHexColor)
    .setDescription( '**:one: ** ' + mappedID[0]+ '\n' + '**:two: **' + mappedID[1] + '\n' + '**:three: **' + mappedID[2] + '\n' + '**:four: **' + mappedID[3] + '\n' + '**:five: **' + mappedID[4] )
    .setFooter('NBS Profil Sistemi')
    .setThumbnail('https://www.pngkey.com/png/full/351-3512054_top-5-in-png.png')
    message.channel.send(embed)
  }


exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ['top5' ,'top10'],
  permLevel: 0
};

exports.help = {
  name: 'liderler', 
  description: 'Lider tablosunu gösterir',
  usage: 'liderler'
};