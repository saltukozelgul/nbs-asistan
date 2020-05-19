const Discord = require('discord.js');

exports.run = (client, message) => {
  
  var request = require('request');
  request('https://apiler.glitch.me/api/espri', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
      var api = JSON.parse(body);
      message.channel.send(`${api.espri}`)
    }
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['espiri'],
  permLevel: 0
};

exports.help = {
  name: 'espri',
  description: 'Bot espri yapar.',
  usage: 'espri'
};