import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";
import { Database } from "@database/connection";
import { version } from "package.json";

const Command = new SlashCommandBuilder()
  .setName("profile")
  .setDescription("Replies with user's personal member card")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("Outputs the specified member's profile")
      .setRequired(false)
  );

const Main = async (interaction?: any) => {
  const _fake_json = `{ "version": "${version}", "api_status": 200 }`;
  
  const user_id = interaction.user.id;
  const input = interaction.options.getUser("user");

  let filter = { "Identificator": user_id };
  if (input) filter = { "Identificator": input.id };

  const result = await Database.command({
    find: "User_Registration",
    filter: filter
  }).catch(err => { return err })

  if (!result) return;
  const data = result.cursor.firstBatch[0];
  const embed = new EmbedBuilder()
    .setTitle(`${data.User.Username} : Member Card`)
    .setDescription(`\`\`\`json\n${_fake_json}\`\`\``)
    .addFields([
      { name: "**Username**", value: `\`${data.User.Username}\``, inline: true },
      { name: "**Identificator**", value: `\`${data.Identificator}\``, inline: true },
      { name: "**Signature**", value: `\`\`\`json\n${data.Signature}\`\`\``}
    ])

    await interaction.reply({ embeds: [embed] })
};

const Raw = Command.toJSON();
export { Raw, Main };

