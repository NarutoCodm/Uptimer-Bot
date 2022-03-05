const Discord = require('discord.js');
const disbut = require("discord-buttons");
const { MessageActionRow, MessageButton } = require("discord-buttons");
const colors = require('./../../colors.json')


module.exports = {
  name: "howtouse",
   aliases: ["howtouse"],
  run: async (client, message, args ) => {
      //--------------------------------------S T A R T---------------------------------------

        const embed = new Discord.MessageEmbed()
        .setTitle('')
        .setFooter("Page Home\n"+ client.user.username + " | Made by Developers Zone", client.user.displayAvatarURL())
        .setImage(`https://media.discordapp.net/attachments/899616802345218070/900703154889449532/Screenshot_20211021-160306_Discord-Beta.jpg`)
        .setColor(colors.uptime);

        const embed1 = new Discord.MessageEmbed()
        .setTitle('<a:Doting:885441996712443954> How to Use Uptimer!')
        .setDescription(`<a:Doting:885441996712443954> **Get the link**Our first step is to get the webpage link. You can find the code in the bottom or side of you repl.it(see screenshot below)! If you do not have this link, copy paste this code at the top of your index.js and run it again. \n https://srcb.in/k11p6557mx`)
        .setImage(`https://media.discordapp.net/attachments/881908220854140988/900360869194633216/Screenshot_20211020-180009_Chrome2.jpg`)
      .setColor(colors.uptime);

        const embed2 = new Discord.MessageEmbed()
      .setTitle('<a:Doting:885441996712443954> How to Use Uptimer')
      .setDescription(`<a:Doting:885441996712443954> **Run the command**Our next step is to runn the command. The syntax of this command is *monitor <repl_url>. If done correcty the bot should give embed saying: \n Added Succesfully`)
      .setImage(`https://media.discordapp.net/attachments/881908220854140988/900360841990406174/Screenshot_20211020-175938_Discord-Beta.jpg`)
      .setColor(colors.uptime);

        const embed3 = new Discord.MessageEmbed()
      .setTitle('<a:Doting:885441996712443954> How to Use Uptimer!n')
      .setDescription(`<a:Doting:885441996712443954> **Other Commands** Now that we have added your project, you can use other command such as projects remove stats and total. Below Is an image of the remove command`)
      .setImage(`https://media.discordapp.net/attachments/881908220854140988/900360854220984340/Screenshot_20211020-180039_Discord-Beta.jpg`)
      .setColor(colors.uptime);

        //-----------------------------OPTIONS----------------------

     let button1 = new MessageButton()
    .setLabel(`Step 1`)
    .setID(`help1`)
    .setEmoji(`897028979041665046`)
    .setStyle("red");
    

     let button2 = new MessageButton()
    .setLabel(`Step 2`)
    .setID(`help2`)
    .setEmoji(`897028979041665046`)
    .setStyle("red");

    let button3 = new MessageButton()
    .setLabel(`Step 3`)
    .setID(`help3`)
    .setEmoji(`897028979041665046`)
    .setStyle("red");


        
    let row = new MessageActionRow()
    .addComponents(button1, button2, button3)

    const allrow = (row)
        //-----------------------------OPTIONS----------------------
    
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

       if(b.id == "help3") {
            
            MESSAGE.edit(embed3, row);
            await b.reply.defer()

        }
  

  
  
    })

    collector.on('end', (b) => {
        MESSAGE.edit(`This help menu is expired! Type the command again to view.`)
    })


    }
  };