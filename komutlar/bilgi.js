const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('Gerekli bilgileri özelden ilettim.');
    message.channel.sendEmbed(ozelmesajkontrol) }
	const pingozel = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setThumbnail('https://apprecs.org/gp/images/app-icons/300/60/net.bitsized.forgepaladins.jpg')
    .setAuthor('NBS Asistan Bilgi Menüsü', message.author.avatarURL)
    .addField('**Bot Sürümü**', 'v0.1')
    .addField('**Geliştirici**', 'Saltuk Buğra Özelgül')
    .addField('**Destek Sunucusu**', 'https://discord.gg/fJT4u8x')
    return message.author.sendEmbed(pingozel)
    console.log(`Bilgi Komutu Kullanıldı:`+ `${message.guild.name}`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot bilgi', 'botbilgi', 'bb', 'botb', 'bbot', 'hakkında', 'bot hakkında', 'bothakkında'],
  permLevel: 0
};

exports.help = {
  name: 'bilgi',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};
