import { SlashCommandBuilder } from "@discordjs/builders";
import { Database } from "@database/connection";

const Command = new SlashCommandBuilder()
  .setName("delete")
  .setDescription("Deletes a user's profile")
  .addUserOption((u) =>
    u
      .setName("target")
      .setDescription("Deletes the specified user's profile")
      .setRequired(true)
  );

const Main = async (interaction?: any) => {
  const target = interaction.options.getUser("target");
  const query: object  = { Identificator: target.id };
  
  console.log(target);
  const result = await Database.command({
    delete: "User_Registration",
    deletes: [{ q: query, limit: 0 }],
  }).catch((err) => console.log(`Something went wrong\n${err}`));
  if (!result) return;

  console.log(result);
  await interaction.reply({
    content: `${target.tag}'s profile has been deleted...`,
    ephemeral: true,
  });
};

const Raw = Command.toJSON();
export { Raw, Main };
