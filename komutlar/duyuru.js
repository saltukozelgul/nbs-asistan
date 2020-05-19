const Discord = require('discord.js');

exports.run = (client, message, args) => {
	let mesaj = args.slice(0).join(' ');
	if (mesaj.length < 1) return message.reply('Eee duyuru yapılacak şeyi yazmadın ki (:');
    message.delete();
    const embed = new Discord.RichEmbed()
    .setThumbnail('https://cdn.discordapp.com/attachments/682314043238645866/702281295161458688/6a17da43-d424-455b-8dc2-54b99c636b25.gif')
    .setColor(3447003)
    .setDescription(`${mesaj}`)
    .setFooter('Duyuru '+message.author.username+' tarafından yapıldı')
    return message.channel.sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['duyuryap', 'duyur'],
  permLevel: 2
};

exports.help = {
  name: 'duyuru',
  description: 'Duyuru yapmak için bunu kullanabilirsiniz.',
  usage: 'duyuru [Duyuruda Yazıcak Şey]'
};
