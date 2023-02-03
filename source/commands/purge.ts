import { SlashCommandBuilder } from "@discordjs/builders";

const Command = new SlashCommandBuilder()
  .setName("purge")
  .setDescription("Purges <X> amount of messages")
  .addNumberOption((option) =>
    option.setName("num").setDescription("Messages to delete.")
  );
const Main = async (interaction?: any) => {
  const number = interaction.options.getNumber("num");
  if (number > 100) return;
  await interaction.channel.bulkDelete(number).catch((err) => {
    console.log(err);
    return interaction.reply({ content: 'You can only bulk delete messages that are under 14 days old.' })
  })
  await interaction.reply({ ephemeral: true, content: `Sucessfully deleted (${number}) Messages` });
};

const Raw = Command.toJSON();
export { Raw, Main };
