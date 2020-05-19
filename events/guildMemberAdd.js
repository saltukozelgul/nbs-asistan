const Discord = require('discord.js');
module.exports = member => {
    const channel = member.guild.channels.find('name', 'hosgeldin');
    let role2 = member.guild.roles.find('name', 'üye')
    if (!channel) return;
   const embed = new Discord.RichEmbed()
   .setColor('#00CC00')
   .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
   .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
   .setTitle(`Hoşgeldin ${member.user.tag}!`)
   .setDescription(`Artık **${member.guild.memberCount}** kişi olduk!`)
   .setFooter('NBS Hoşgeldin Sistemi coded by Saltuş')
   channel.send(embed);
    member.addRole(role2);
};