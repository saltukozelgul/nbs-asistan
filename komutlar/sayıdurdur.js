const Discord = require('discord.js');

exports.run = (client, message, args) => {
	
    message.channel.send(`Sayı saymayı bırakıyorum`)
    console.log(`BOT: Bot sayı saymayı bıraktı...`);
    process.exit(0);
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sayıdurdur',
  description: 'Sayı saymayı bırakırım.',
  usage: 'sayıdurdur'
};
