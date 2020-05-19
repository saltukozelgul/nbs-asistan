const Discord = require('discord.js')

exports.run = (client, message, args) => {
    let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('saymaya kaçtan başlayayıp kaç sayı sayayım? //sayısay <başlangıc> <kaçsayı>');
if (!args[1]) return message.reply('Kaç tane sayı sayacağımı girmedin!')
  ///////////////////////////// REZ AL BERKAY BUNU DENEYECEK O YÜZDEN SINIR KOYUYORUM
if (parseInt(args[1]) > 200) return message.reply('200den fazla sayı sayamıyorum üzgünüm')
else {
  let i = parseInt(args[0])
  let x = 0
  let a = parseInt(args[1])
  message.delete()
  while (x < a) {
    message.channel.send(i)
    i = i+1
    x = x+1 
    if (args[0] === "durdur") {
      break 
      message.reply('Sayı sayma durdulurdu!')
    }
  }}
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sayısay',
  description: 'Sayı sayar',
  usage: 'sayısay [başlangıç] [kaçsayı]'
};