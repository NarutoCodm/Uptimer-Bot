Discord = require('discord.js');
const disbut = require('discord-buttons');
const { MessageActionRow, MessageButton } = require("discord-buttons");

module.exports = {
  name: "help",
   aliases: ["hlp"],
  run: async (client, message, args ) => {
      //--------------------------------------S T A R T---------------------------------------

    //--------------------EMBEDS-----const ButtonPages = require('discord-button-pages');


    const embed = new Discord.MessageEmbed()
    .setImage('')
    .setTitle("HI I Am Uptimer")
    .setDescription(`**I Am Here To Uptime Your Projects So Do +howtouse For More Info Of How To Use Me 
I Am Coded By The Crazy#0070 
Invite Me -> [Invite Uptimer](https://discord.com/api/oauth2/authorize?client_id=876098640169558078&permissions=8&scope=bot)
Support Server -> [Need Support](https://discord.gg/3D4PkVyrUt)
Youtube -> [My Developer Youtube](https://youtube.com/channel/UCNsN0YD5FG2EoK4fEHtcEyA)

> Here Are My Commands**`); 

    const embed1 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setImage('')
    .setTitle('Uptimer Commands')
    .setDescription(`
> <a:uptimer:928262503371247637> monitor
> <a:uptimer:928262503371247637> projects
> <a:uptimer:928262503371247637> remove
> <a:uptimer:928262503371247637> total
> <a:uptimer:928262503371247637> stats`)
      ;

    const embed2 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setImage('')
    .setTitle('  **Info Commands**')
    .setDescription(`
> <a:informationD:928287313711218708> botinfo 
> <a:informationD:928287313711218708> developer
> <a:informationD:928287313711218708> roleinfo 
> <a:informationD:928287313711218708> serverinfo 
> <a:informationD:928287313711218708> howtouse 
> <a:informationD:928287313711218708> userinfo
> <a:informationD:928287313711218708> uptime
> <a:informationD:928287313711218708> invite `)
    ;
    
    //--------------------EMBEDS------------------------

    //--------------------Buttons------------------------
let button1 = new MessageButton()
    .setLabel(`Uptimer`)
    .setID(`help1`)
    .setEmoji(`897028979041665046`)
    .setStyle("red");
    

     let button2 = new MessageButton()
    .setLabel(`Info`)
    .setID(`help2`)
    .setEmoji(`886168903934439465`)
    .setStyle("red");


   let row = new MessageActionRow()
    .addComponents(button1, button2)

    
    const allrow = (row)
    //--------------------Buttons------------------------

    const MESSAGE = await message.channel.send(embed, allrow);

    const filter = ( button ) => button.clicker.user.id === message.author.id 
    const collector = MESSAGE.createButtonCollector(filter, { time : 120000 });

    collector.on('collect', async (b) => {

       if(b.id == "help1") {

            MESSAGE.edit(embed1, row);
            await b.reply.defer()

        }

        if(b.id == "help2") {
            
            MESSAGE.edit(embed2, row);
            await b.reply.defer()

        }
  

  
  
    })

    collector.on('end', (b) => {
        MESSAGE.edit(`This help menu is expired! Type the command again to view.`)
    })


    }
  };