const Discord = require('discord.js')

exports.run = (client, message, args) => {
  let user = message.mentions.users.first();
  if(!user) return message.channel.send('Sarılıcağın birisini etiketlemelisin')
  if (user.id === message.author.id) return message.reply('Kendine sarılamazsın :(');

    
  if ( message.react('😍')) {
      var gif = [
      'https://media0.giphy.com/media/2UIcmK4pn7rYNLRboG/giphy.gif?cid=ecf05e471b7bb90cfae2fcd1600a548674e71d525ca3ad84&rid=giphy.gif','https://media3.giphy.com/media/EvYHHSntaIl5m/giphy.gif?cid=ecf05e471fa36daeae12f6ab05f92773f45ff9eb021245ee&rid=giphy.gif'];

      var gifler = gif[Math.floor(Math.random() * gif.length)];
  }
    
    if (message.react('😍')) {
    const op = new Discord.RichEmbed()
    .setDescription(`<@${message.author.id}>` + ` <@${user.id}>'ı sarıldı <3`)
    .setColor('RANDOM')
    .setImage(gifler)
    return message.channel.send(op)
    }
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sarıl',
  description: 'Sarılmak için kullan',
  usage: 'sarıl [kullanıcı]'
};