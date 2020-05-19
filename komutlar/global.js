const Discord = require('discord.js');
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setAuthor("GLOBAL ZEYNEP ÇOK YAŞA 👏\n")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("RANDOM")
  .setImage("https://cdn.discordapp.com/attachments/302894113571995649/702225007471886346/Screenshot_6.png")
  /*
   * Takes a Date object, defaults to current date.
   */

  message.channel.send({embed});
  message.react('🧡')
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'global',
  description: 'Global nedir?',
  usage: 'global'
};