const Discord = require("discord.js");
const google = require("google-tts-api");
const ayarlar = require('../ayarlar.json');
const tts = require('node-tts-api');
let prefix = ayarlar.prefix;
exports.run = (client, message) => {
      const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send(`İlk önce bir sesli kanala girmeniz gerek`)
    

    google(`${args.slice(' ')}`, 'tr', 1).then(url => {
        message.member.voiceChannel.join().then(connection => {
            console.log(`**${args.slice(' ')}** adlı mesaj sesli olarak söyleniyor`)
            console.log(`${url+'.mp3'}`)
            voiceChannel.connection.playStream(`${url+'.mp3'}`);
            connection.playStream('https://translate.google.com/translate_tts?ie=UTF-8&q=sa&tl=tr&total=1&idx=0&textlen=2&tk=177604.264679&client=t&prev=input&ttsspeed=1.mp3'), {
  volume: 0.5,
};
        })
    })

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['konuş',],
    permLevel: 1
};

exports.help = {
    name: 'söyle',
    description: 'Bota yazdığınız şeyi sesli mesaj olarak söyletir',
    usage: 'söyle <mesaj>'
};