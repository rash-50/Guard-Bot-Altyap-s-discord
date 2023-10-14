const Discord = require('discord.js');

exports.run = async (client, message, args,bot) => {

const emb = new Discord.MessageEmbed()
.setColor("BLUE")
.setFooter(client.user.username,client.user.avatarURL())
.setTimestamp()
.setTitle(`***__${client.user.username} Genel Sunucu Koruma Sistemi__***`)
.setDescription(` ***Rash Guard Sistem Bilgilendirmesi***`)
.addField(` <:krali:1160170285539008582>  **Kanal Koruma**`,"*Kanal koruması sağlar, ayrıntılı bilgi için komudu kullanın.*\n \n\n `r!kanal-koruma`")
.addField(` <:krali:1160170285539008582>  **Rol Koruma**`,"*Rol koruması sağlar, ayrıntılı bilgi için komudu kullanın.*\n \n\n `r!rol-koruma`")
.addField(` <:krali:1160170285539008582>  **Emoji Koruma**`,"*Emoji koruması sağlar ayrıntılı bilgi için komudu kullanın.*\n \n\n `r!emoji-koruma`")
.addField(` <:krali:1160170285539008582>  **Bot Koruma**`,"*Botlara karşı koruma sağlar ayrıntılı bilgi için komudu kullanın.*\n \n\n `r!bot-koruma`")
.addField(` <:krali:1160170285539008582>  **Mesaj Log**`,"*Silinen ve düzenlenen mesajları kanala gönderir. Ayrıntılı bilgi için komudu kullanın.*\n \n\n `r!mesaj-log`")
.addField(` <:krali:1160170285539008582>  **Yetkili Rol**`,"*Role bota komut verme yetkisini verir.Ancak yine de yetkililer korumalardan etkilenir.*\n \n\n `r!yetkili`")
.addField(` <:krali:1160170285539008582>  **Dokunulmaz Rol**`,"*Bot ayarlanmış role sahip olanları görmezden gelir. Tehlikeli bir izindir.*\n \n\n `r!dokunulmaz`")
.addField(` <:krali:1160170285539008582>  **İstatistik**`,"*Rash Guard istatistiklerini gösterir.*\n \n\n `r!istatistik`")


if(!args[0]) return message.channel.send(emb)
message.channel.send(emb)


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yardım"],
  permLevel: 0
}

exports.help = {
  name: 'yardım'
};