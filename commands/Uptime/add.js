const UrlsConfig = require("./../../database/models/UrlsConfig");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const colors = require('./../../colors.json')
const validUrl = require("valid-url");

module.exports = {
  name: "add",
  description: "Adds monitor to your project.",
  aliases: ["monitor"],
  botPermission: [],
  authorPermission: [],
  ownerOnly: false,
  run: async (client, message, args) => {
    var url = args[0];

    // CHECKS THE URL IF PROVIDED OR WRONG
    if (!url) return message.reply("<a:867324405561425941:934812212936187965>  Please provide a project url!");
    if (!validUrl.isUri(url)) {
      return message.channel.send("<a:867324405561425941:934812212936187965>  Please provide a vaild url!");
    }

    // LOADING
    let waitEmbed = new MessageEmbed().setDescription(
      "<a:5f96b13bdc594edf89754f99d99b6791:934812214005727232> Please wait..."
    );
    var messageAlert = await message.channel.send(message.author, waitEmbed);

    // CHECKS IF THE PROJECT IS ALREADY REGISTERED
    var checkIfExsists = await UrlsConfig.findOne({
      projectURL: url,
    });

    if (checkIfExsists === null) {
      // RUNS WHEN PROJECT IS NOT REGISTERED
      await UrlsConfig.create({
        authorID: message.author.id,
        projectURL: url,
        pinged: 0,
      }).then(async () => {
        // RUNS AFTER THE PROJECT STORES THE DATA IN DATABASE
        client.projects.push(url);
        try {
          // TRIES TO PING PROJECT
          await fetch(url);
        } catch (e) {
          // ERRORS HANDLING
          await UrlsConfig.findOneAndUpdate(
            { projectURL: url },
            { error: true, errorText: e.message },
            { new: true }
          );
          message.reply("Fetching Error");
        }

        // NOTIFIES WITH AN EMBED THAT PROJECT IS SUCCESSFULLY REGISTERED
        let embed = new MessageEmbed()
          .setTitle("<a:867324408308695070:934812212101546024>  Added Succesfully!")
          .setDescription("Thanks for using Uptimer")
          .setColor(colors.uptime)
          .setTimestamp();
        await messageAlert.edit(embed);
        return message.delete();
      });
    } else {
      // RUNS WHEN THE PROJECT IS ALREADY IN DATABASE
      let embed = new MessageEmbed()
        .setTitle(
          "<a:867324405561425941:934812212936187965>  Project is already Registered!"
        )
        .setDescription(
          "<a:867324405561425941:934812212936187965>  The project you're trying to register is already in the Database"
        )
        .setColor(colors.uptime)
        .setTimestamp();

      await messageAlert.edit(embed);
      return message.delete();
    }
  },
};


/**
 * @INFO
 * Bot Coded by Crazy |
 * https://youtube.com/DevelopersZone
 * @INFO
 * Please mention Him , when using this Code!
 * @INFO
 */

