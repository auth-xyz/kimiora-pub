import { SlashCommandBuilder } from "@discordjs/builders";
import { Database } from "@database/connection";

const Command = new SlashCommandBuilder()
  .setName("create")
  .setDescription("Creates a profile for music stats")
  .addStringOption((option) =>
    option
      .setName("signature")
      .setDescription("Adds a signature to your profile")
      .setRequired(true)
  );

const Main = async (interaction?: any) => {
  const signature = interaction.options.getString("signature");
  const id = interaction.user.id;

  const ins_f = {
    Identificator: id,
    Signature: signature,
    User: {
      Username: interaction.user.username,
      Discriminator: interaction.user.discriminator,
    },
    Guild: {
      Identificator: interaction.guild.id,
      Owner: interaction.guild.ownerId,
    },
  };
  const result = await Database.command({
    insert: "User_Registration",
    documents: [ins_f],
  });

  console.log(result);
  await interaction.reply({ content: "Created your profile", ephemeral: true });
};

const Raw = Command.toJSON();
export { Raw, Main };