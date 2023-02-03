import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";
import { Database } from "@database/connection";

const Command = new SlashCommandBuilder()
  .setName("edit")
  .setDescription("Edits the user's user-profile.")
  .addStringOption((option) =>
    option
      .setName("signature")
      .setDescription("User-Card signature.")
      .setRequired(true)
  );

const Main = async (interaction?: any) => {
  const signature = interaction.options.getString("signature");
  const filter = { Identificator: interaction.user.id };

  const result = await Database.command({
    update: "User_Registration",
    updates: [{ q: filter, u: { $set: { Signature: signature } } }],
  }).catch((err) => console.log(`Something went wrong\n${err}`));

  if (!result) return;
  const _json = { Modified: `${result.nModified}`, Status: `${result.ok}` };
  const embed = new EmbedBuilder()
    .setTitle(`New Signature for: ${interaction.user.tag}`)
    .setDescription(`\`\`\`json\n${JSON.stringify(_json)}\`\`\``)
    .addFields([
      { name: "**Signature**", value: `\`\`\`json\n${signature}\`\`\`` },
    ]);
  await interaction.reply({ embeds: [embed], ephemeral: true });
};

const Raw = Command.toJSON();
export { Raw, Main };