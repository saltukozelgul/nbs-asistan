const Discord = require('discord.js');

exports.run = (client, message, args) => {
	let mesaj = args.slice(0).join(' ');
	if (mesaj.length < 1) return message.reply('**Kime Tokat Atacağımı Yazmalısın**');
	if (mesaj == 'Saltuş') return message.reply('Sahibime tokat atamam üzgünüm.');	
    const embed = new Discord.RichEmbed()
    .setAuthor('')
    .setColor(3447003)
    .setDescription(`** ${mesaj} ` + ", " + message.author.username + ' sana bir tokat attı var ya üffffff!')
	.setImage(`https://media1.giphy.com/media/xT9IgzTnZHL9zp6IPS/source.gif`)
    return message.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tokat"],
  permLevel: 0
};

exports.help = {
  name: 'tokat',
  description: '',
  usage: 'tokat'
};
