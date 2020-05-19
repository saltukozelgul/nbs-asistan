const Discord = require('discord.js');
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setAuthor(".d\n")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("#7FFFD4")
  .setImage("https://media.discordapp.net/attachments/302894113571995649/702168804846993418/komikgklp.jpeg?width=506&height=676")
  /*
   * Takes a Date object, defaults to current date.
   */

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: '.d',
  description: 'gökalb nedir?',
  usage: '.d'
};