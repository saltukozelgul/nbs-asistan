const Discord = require('discord.js');
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setAuthor(".d *gklpvi*\n")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("#7FFFD4")
  .setImage("https://media.discordapp.net/attachments/342738041187598337/715942837102968862/unknown.png")
  /*
   * Takes a Date object, defaults to current date.
   */

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['gklpvi'],
  permLevel: 0
};

exports.help = {
  name: '.d',
  description: 'gökalb nedir?',
  usage: '.d'
};