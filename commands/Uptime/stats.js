const UrlsConfig = require("./../../database/models/UrlsConfig");
const { MessageEmbed } = require("discord.js");
const colors = require('./../../colors.json')
const { default_prefix } = require("./../../config.json");

module.exports = {
  name: "stats",
  description: "Shows Stats of all of your Projects.",
  aliases: [],
  botPermission: [],
  authorPermission: [],
  ownerOnly: false,
  run: async (client, message, args) => {
    const filter = {
      authorID: message.author.id,
    };

    const all = await UrlsConfig.find(filter);

    const menuEmoji = "<a:tickspin:885465759675990066>";

    let embed = new MessageEmbed()
      .setColor(colors.uptime)
      .setTitle(`${menuEmoji} Your Projects Stats ${menuEmoji}`);

    let count = 0;
    all.forEach(async (data) => {
      count++;
      if (count === 26) return;
      // <a:Doting:885441996712443954>

      if (data.get("error")) {
        embed.addField(
          `**${count}**. \`${data.projectURL}\``,
          `<a:Doting:885441996712443954> Last Pinged: ${
            data.updatedAt ? formatDate(data.updatedAt) : "Not Measured"
          }\n<a:Doting:885441996712443954> FetchError: ${data.errorText}`
        );
      } else {
        embed.addField(
          `**${count}**. \`${data.projectURL}\``,
          `<a:Doting:885441996712443954> Last Pinged: ${
            data.updatedAt ? formatDate(data.updatedAt) : "Not Measured"
          }`
        );
      }
    });

    if (count === 0) {
      embed.setDescription(
        `*You don't have any projects hosted.*\nAdd one by using: ${default_prefix}add [project Url]`
      );
    }
    embed.setFooter(`Date Format: DD/MM/YY | HH:MM:SS`);

    var errors = false;

    await message.author.send(embed).catch((err) => {
      errors = true;
      if (err.message === "Cannot send messages to this user")
        return message.channel.send(
          `Error: \`Cannot send message to you. please turn on your Dms\`.`
        );
    });
    if (!errors) {
      message.channel.send("📥 Check your DM.");
    }
  },
};

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  hours = d.getHours();
  mins = d.getMinutes();
  sec = d.getSeconds();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  let format = `${day}/${month}/${year} | ${hours}:${mins}:${sec}`;

  return format;
}


/**
 * @INFO
 * Bot Coded by Crazy |
 * https://youtube.com/DevelopersZone
 * @INFO
 * Please mention Him , when using this Code!
 * @INFO
 */
