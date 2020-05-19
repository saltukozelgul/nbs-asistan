
const Discord = require('discord.js')


const cümle = require('../oyun/cümleler.json');
let aktif = [];

exports.run = async (client, message) => {


  aktif.push(message.channel.id);
  const eeembed = new Discord.RichEmbed()
    .setColor(0x36393E)
    .setTitle('Yazma Oyunu')
    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Video-Game-Controller-Icon-IDV-green.svg/768px-Video-Game-Controller-Icon-IDV-green.svg.png')
    .setDescription(`Oyunu ${message.author} başlattı. \n Botun biraz sonra yazacağı cümleyi ilk yazan kazanır.`)
  let oyundurumu = await message.channel.send(eeembed);
  let asıl = Math.floor(Math.random() * Object.keys(cümle).length) + 1;
  const embed = new Discord.RichEmbed()
    .setDescription(cümle[asıl])
    .setFooter(`Cümleyi yazmanız için 30 saniyeniz var.`)
 setTimeout(() => {  let cümlemesaj = message.channel.send(embed); }, 3000);
  const collector = message.channel.createMessageCollector(
 msg => msg.content === cümle[asıl],
    {
      time: 30000,
      maxMatches: 1
    }
  );

  collector.on('end', async (collection, reason) => {
    let color, result;
    if (reason === 'time') {
      color = 0x36393E;
      result = 'Oyun bitti. Malesef, kimse zamanında yazmayı başaramadı.';
    }
    else {
      color = 0x36393E;
      result = `Oyun bitti. Tebrikler ${collection.map(m => m.author)[0]}! sen kazandın.`;
    }
const eembed = new Discord.RichEmbed()
.setColor()
.setTitle('Yazma Oyunu')
.setThumbnail('https://cdn.clipart.email/72a2b67bbe47aa9fda394b1939aa8478_download-winner-free-png-photo-images-and-clipart-freepngimg_600-586.png')
.setFooter(`Oynayan herkese teşekkür ederiz efenim.`)
.setDescription(result)
    await message.channel.send(eembed).catch(e => {
      client.log.error(e);
    });
    oyundurumu.delete().catch(() => {});
 
    cümlemesaj.delete().catch(() => {});

    aktif = aktif.slice(aktif.indexOf(message.channel.id) + 1, 1);
  });
};

exports.conf = {
  aliases: [ 'yazmaoyunu' ],
  enabled: true,
  permLevel: 0,
  guildOnly: true
};

exports.help = {
  name: 'yazma-oyunu',
  description: 'Komut kullanıldıktan sonra, botun yazdığı cümleyi ilk yazan kazanır.',
  category: 'Oyun',
  usage:'yazma-oyunu',
};