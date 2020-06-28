const Discord = require("discord.js");
const google = require("google-tts-api");
const ayarlar = require('../ayarlar.json');
const ytdl = require('ytdl-core');
let prefix = ayarlar.prefix;
exports.run = (client, message) => {

    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send(`İlk önce bir sesli kanala girmeniz gerek`)
    voiceChannel.join()
    voiceChannel.connection.playStream(ytdl('https://www.youtube.com/watch?v=aQH-jwE_kfo', { filter: 'audioonly' }));

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['dor', 'knock'],
    permLevel: 1
};

exports.help = {
    name: 'door',
    description: 'Aşırı gerçekçi kapı tıklatma sesi',
    usage: 'door'
};