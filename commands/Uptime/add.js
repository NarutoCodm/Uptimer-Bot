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
    if (!url) return message.reply("<a:nahin:885441031171112990> Please provide a project url!");
    if (!validUrl.isUri(url)) {
      return message.channel.send("<a:nahin:885441031171112990> Please provide a vaild url!");
    }

    // LOADING
    let waitEmbed = new MessageEmbed().setDescription(
      "<a:portal:885440593063477248> Please wait..."
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
          .setTitle("<a:tickspin:885465759675990066> Added Succesfully!")
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
          "<a:nahin:885441031171112990> Project is already Registered!"
        )
        .setDescription(
          "<a:nahin:885441031171112990> The project you're trying to register is already in the Database"
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
