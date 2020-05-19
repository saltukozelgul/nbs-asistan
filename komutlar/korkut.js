const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var gif = [
      'https://media.discordapp.net/attachments/457654470457819136/698594726928187562/1490647142822.jpg', 'https://media.discordapp.net/attachments/457654470457819136/698594585571754085/1481918827020.jpg', 'https://media.discordapp.net/attachments/457654470457819136/615661831012352094/IMG_20190702_150150.jpg'];

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