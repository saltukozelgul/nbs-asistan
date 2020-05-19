const Discord = require('discord.js');



exports.run = async (client, message) => {
    let dönme = await message.channel.send({
        embed: {
            color: 0x00AE86,
            description: `${message.author} bir stres çarkı çevirdi bakalım kaç saniye döndürecek.`,
            image: {
                url: "https://i.imgur.com/KJJxVi4.gif"
            }
        }
    });

    if (message.author.id=="211481492772093952"){let bitiş = 124.2;
    setTimeout(() => {
        dönme.edit({
            embed: {
                color: 0x00AE86,
                description: `${message.author}, stres çarkın **${bitiş.toFixed(2)}** saniye döndü.`
            }
        });
    }, bitiş * 1000);}
   else{let bitiş = (Math.random() * (60 - 5 +1)) + 5;
    setTimeout(() => {
        dönme.edit({
            embed: {
                color: 0x00AE86,
                description: `${message.author}, stres çarkın **${bitiş.toFixed(2)}** saniye döndü.`
            }
        });
    }, bitiş * 1000);}
};  

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'stresçarkı', 
  description: 'Sizin için bir stres çarkı çevirir.',
  usage: 'stresçarkı'
};