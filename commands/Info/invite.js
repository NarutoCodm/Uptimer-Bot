const Discord = require('discord.js')
const { MessageButton } = require('discord-buttons');
const colors = require('./../../colors.json')
const {MessageActionRow} = require('discord-buttons');


module.exports = {
    name: "invite",
    description: "invite command!",
    aliases: ["invite"],
    async run (client, message, args) {


      //code
let embed = new Discord.MessageEmbed()
.setTitle('Invite Me / Support Me.')
.setColor(colors.uptime)
.setTimestamp()
.setFooter(`Requested by ${message.author.tag}`)

const button1 = new MessageButton()
    .setStyle('url')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=876098640169558078&permissions=8&scope=bot')
    .setLabel('Invite!')
 
const button2 = new MessageButton()
    .setStyle('url')
    .setURL('https://discord.gg/bYhPsQyRE3')
    .setLabel('Support!')
 
 
let row = new MessageActionRow();
row.addComponent(button1);
row.addComponent(button2);


//Do same for all buttons

message.channel.send("", {
  embed : embed,
  component: row
})


    }
}




