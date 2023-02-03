import { SlashCommandBuilder } from "@discordjs/builders";

import { version, dependencies } from "package.json";
import { EmbedBuilder } from "discord.js";

const Data = new SlashCommandBuilder()
  .setName("version")
  .setDescription("Outputs the current version for the bot");

const Main = (interaction: any) => {
  //const _Embed = new EmbedBuilder().setTitle('Fetched Versions').addFields([{ name: `Mainframe Version`, value: `\`${version}\`` }]).setFooter("Kimide © - 2023");

  const embed = new EmbedBuilder()
    .setTitle("Fetched 3 versions")
    .addFields([
      { name: "Mainframe", value: `\`${version}\``, inline: true },
      { name: "DiscordJS", value: `\`${dependencies["discord.js"]}\``, inline: true },
      { name: "MongoDB", value: `\`${dependencies["mongodb"]}\``, inline: true }
    ]);

  interaction.reply({ embeds:[embed] });
};

const Raw = Data.toJSON();
export { Raw, Main };
