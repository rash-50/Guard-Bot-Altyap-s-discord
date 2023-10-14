const Discord = require('discord.js');

exports.run = async (client, message, args,bot) => {

const emb = new Discord.MessageEmbed()
.setColor("BLUE")
.setFooter(client.user.username,client.user.avatarURL())
.setTimestamp()
.setTitle(`***__${client.user.username} Rol Koruma Sistemi__***`)
.setDescription(`<:krali:1160170285539008582> ***Detaylı Rol Koruma Sistem Bilgilendirmesi***`)
.addField(`<:krali:1160170285539008582>  **Açılan Rol Koruma**`,"*Açılan rolleri otomatik olarak kapatır.*\n*Rolü açan yetkiliye işlem uygulamaz.* \n\n `r!açılan-rol-koruma`")
.addField(`<:krali:1160170285539008582>  **Düzenlenen Rol Koruma**`,"*Düzenlenen rolleri eski haline getirir.*\n*Düzenleyen yetkiliye işlem uygulamaz.* \n\n `r!duzenlenen-rol-koruma`")
.addField(`<:krali:1160170285539008582>  **Silinen Rol Koruma**`,"*Silinen rolleri otomatik olarak tekrar açar.*\n*Silen yetkiliden tüm rollerini alır.* \n\n `r!silinen-rol-koruma`")
.addField(`<:krali:1160170285539008582>  **Rol Log**`,"*Yukarıda belirtilen işlemlerin kayıtlarını belirtilen kanala gönderir.*\n\n `r!rol-log`")



if(!args[0]) return message.channel.send(emb)
message.channel.send(emb)


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rol-koruma"],
  permLevel: 0
}

exports.help = {
  name: 'rol-koruma'
};