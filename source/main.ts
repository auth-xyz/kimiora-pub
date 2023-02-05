// Libraries
import { join } from "path";
import { REST } from "@discordjs/rest";
import { Routes } from "discord.js";
import { readdirSync } from "node:fs";

// Other Imports
import { client } from "@modules/clientService";
import { DatabaseClient } from "@database/connection";
import { Token, Identificators } from "@config/config.json";
import { _sc as logsucess, _fl as logerr } from "@scripts/logs";

const _data = [];
const _func = [];
const _name = [];

const rest = new REST({ version: "10" }).setToken(Token);

try {
  const Folder = readdirSync(join(__dirname, "./commands/"));
  const Files = Folder.filter((f) => f.endsWith(".ts"));

  for (var c of Files) {
    const raw = require(`./commands/${c}`);
    _data.push(raw.Raw);
    _func.push(raw.Main);
    _name.push(c.slice(0, c.length - 3));
  }
} catch (error) {
  logerr(error);
}

export default async function Main() {
  // Running the commands
  client.on("interactionCreate", (i) => {
    if (!i.isChatInputCommand()) return;
    const index = _name.indexOf(i.commandName);
    _func[index](i);
  });

  try {
    await DatabaseClient.Connect();
    await client.login(Token);
    await rest.put(
      Routes.applicationGuildCommands(
        Identificators.client,
        Identificators.guild),
      { body: _data }
    );

    console.log("[Kimiora] :: Successfully connected to all services.");
  } catch (e) {
    logerr(e);
  }
}
