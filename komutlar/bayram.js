const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => {
      
      client.users.forEach(u => {
db.add(`para_${u.id + message.guild.id}`, 2500);
})

message.channel.send(`:white_check_mark: Hayırlı bayramlar NBS sakinleri! bütün sunucuya kullanıcıya **2.500₺** bayram harçlığı gönderdim doya doya harcayın :*`);
console.log(`Bayram Komutu Kullanıldı:`+ `${message.guild.name}`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['bayram'],
  permLevel: 4
};

exports.help = {
  name: 'Bayram',
  description: 'Bayramlarda herkese harçlık vermek için kullanıyorum',
  usage: '//bayram'
};
