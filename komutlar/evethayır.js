const Discord = require('discord.js');
const cevaplar = [
    "evet",
    "hayır",
    "belki bilemedim",
];
exports.run = function(client, message, args) {
    var soru = args.join(' ');
    var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];
    if(!soru) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setAuthor('Hata').setDescription('Soru Giriniz'))
    if(soru === 'Saltuk iyi biri mi?') message.channel.send('Hem de dünyanın en iyisiii!')
    else return message.channel.send(cevap)
};  
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['8ball', 'sence'],
  permLevel: 0 
};
exports.help = {
  name: 'evethayır', 
  description: 'Sorduğunuz Soruya Rastgele Cevap Verir.',
  usage: 'evethayır [soru]'
};