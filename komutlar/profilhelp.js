const Discord = require('discord.js');
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setAuthor("Profil komutları:\n")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor("RANDOM")
  .setThumbnail('https://images.vexels.com/media/users/3/147101/isolated/preview/b4a49d4b864c74bb73de63f080ad7930-instagram-profile-button-by-vexels.png')
  .setDescription('**//profil resim <url>**: Profilinizin arkaplanını değiştirir.\n **//profil renk <hexkodu>**: Profiliniz rengini ayarlar \n **//profil saydam [1-5]**: Profilin saydamlığını ayarlar \n **//profil**: Profilinizi gösterir. ')
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
  name: 'profilyardım',
  description: 'Profil komutlarını gösterir',
  usage: 'profilyardım'
};