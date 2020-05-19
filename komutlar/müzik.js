const Discord = require('discord.js');
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setAuthor("Şarkı açmak için gerekli komutlar:\n")
  .setColor("RANDOM")
  .setThumbnail('https://cdn.discordapp.com/attachments/682314043238645866/702281109500723260/6490_discomapez.gif')
	.addField('**//çal ya da //p**', 'Şarkı açmanı sağlar', true)
	.addField('**//geç ya da //s**', 'Şarkıyı geçmeni sağlar', true)
	.addField('**//durdur ya da //stop**', 'Şarkııyı kapatmanı sağlar', true)
	.addField('**//devam**', 'Duraklatılan şarkıyı devam ettirir', true)
	.addField('**//duraklat**', 'Şarkıyı duraklatır ve sonradan devam edebilir', true)
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'müzik',
  description: 'DJ komutlarını gösterir.',
  usage: 'müzik'
};