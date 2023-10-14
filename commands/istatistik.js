const Discord = require("discord.js");
const moment = require("moment");
const os = require('os');
const ayarlar = require('../ayarlar.json')
require("moment-duration-format");
exports.run = async (bot, message, args) => {
  const duration = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
 
  let msg = message
   const bunemq = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const annencilermaldır = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setFooter(`${bot.user.username} İstatistik`, bot.user.avatarURL())
  .addField("<:krali:1160170285539008582>  **Botun Sahibi**", '<@'+ayarlar.sahip+'>',true)
  .addField("<:krali:1160170285539008582>  **Bellek kullanımı**", (process.memoryUsage().heapUsed / 512 / 512).toFixed(2) + ' MB', true)  
  .addField("<:krali:1160170285539008582>  **Çalışma süresi**", bunemq,true)
  .addField('<:krali:1160170285539008582>  **Kullanıcılar**:', bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0),true)
  .addField("<:krali:1160170285539008582>  **Sunucular**", (bot.guilds.cache.size).toLocaleString(), true)
  .addField("<:krali:1160170285539008582>  **Kanallar**", (bot.channels.cache.size).toLocaleString(), true)
  .addField("<:krali:1160170285539008582>  **Discord.JS sürüm**", "v"+Discord.version, true)
  .addField("<:krali:1160170285539008582>  **Node.JS sürüm**", `${process.version}`, true)
  .addField(" **Ping**", bot.ws.ping+" ms", true)
  .setTimestamp()
 return message.channel.send(annencilermaldır);
  };
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [ 'i'],
  permLevel: 0
};
 
exports.help = {
  name: "istatistik",
  description: "Bot i",
  usage: "istatistik"
};