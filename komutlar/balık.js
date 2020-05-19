const Discord = require('discord.js')
const db = require('quick.db')

exports.run = function(bot, message) {
    if (message.channel.name === 'göl-kenarı')
    {var para = db.fetch(`para_${message.author.id + message.guild.id}`)
    message.channel.sendEmbed(new Discord.RichEmbed()
    .setColor(message.guild.me.displayHexColor)
    .setTitle('Tuttuğun şey: ' + doMagicDiceVoodoo()));
     message.react('🎣')
    function doMagicDiceVoodoo() {
        var rand = ['Levrek 🐟', 'Alabalık 🐟', 'Hamsi 🐟', 'Çupra 🐟', 'İstavrit 🐟', 'Kefal 🐟', 'Köpekbalığı 🐟', 'Balina 🐟', 'Cam Şişe 🍾', 'Kılçık ', 'Plastik Poşet', 'Taş Parçası' ,'Midye' ,'Sigara İzmariti'];
        let balik = rand[Math.floor(Math.random()*rand.length)];
        if (para < 3) {
        message.channel.send('Oynamak için yeterli paranız yok \n Gerekli Miktar **3₺**')
        return 'Tuttun ama başını'}
        else  { 
          if (balik === rand[6]) {
        db.add(`para_${message.author.id + message.guild.id}`,-5);
        message.channel.send('**5₺ balık tutmak için hesabından kesildi**')
        message.channel.send('Tebrikler büyük bir şey tuttun ve **10xp** kazandın')
        db.add(`puancik_${message.author.id + message.guild.id}`, 10)
          return balik
        }
          else if (balik === rand[7]) {
          db.add(`para_${message.author.id + message.guild.id}`,-5);
          message.channel.send('**5₺ balık tutmak için hesabından kesildi**')
          message.channel.send('Tebrikler büyük bir şey tuttun ve **15xp** kazandın')
          db.add(`puancik_${message.author.id + message.guild.id}`, 15)
          return balik
        }
          else {
          db.add(`para_${message.author.id + message.guild.id}`,-5);
          message.channel.send('**5₺ balık tutmak için hesabından kesildi**')
          message.channel.send(`Oltanı güzel fırlattın hadi bakalım ne gelecek?`)
          return balik }
    }}
}
else return message.channel.send('Lütfen göl kenarında balık tutunuz bu kanalda değil!')
}

exports.conf = {
  enabled: true,
  aliases: ['balık', 'balıktut'],
  guildOnly: false,
  permLevel: 0
};

exports.help = {
  name: 'olta',
  description: 'Balık tutun',
  usage: 'olta'
};