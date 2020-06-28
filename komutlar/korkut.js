const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var gif = [
      'https://media.giphy.com/media/28aGE5xerXkbK/giphy.gif'];

      var gifler = gif[Math.floor(Math.random() * gif.length)];

exports.run = (client, message, params) => {
	if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('Korkut')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== '..') {
      const sunucubilgi = new Discord.RichEmbed()
    .setAuthor('Bööö Korktun mu?')
    .setColor('RANDOM')
    .setTimestamp()
    .setDescription('')
		.setImage(gifler)
    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'korkut',
  description: 'Asistanımız aslında çok korkunç değildir ama bir denesin bakalım.',
  usage: 'korkut'
};