const Discord = require('discord.js');
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setAuthor("Alkış 👏\n")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("RANDOM")
  .setImage("https://thumbs.gfycat.com/WarpedAdmiredCormorant-size_restricted.gif")
  /*
   * Takes a Date object, defaults to current date.
   */

  message.channel.send({embed});
  console.log(`Alkış Komutu Kullanıldı:`+ `${message.guild.name}`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'alkış',
  description: 'Cokır abimizden sizlere bir alkışş',
  usage: 'alkış'
};