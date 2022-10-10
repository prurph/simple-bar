import * as Uebersicht from "uebersicht";
import * as Settings from "./settings";

const settings = Settings.get();
const { yabaiPath = "/opt/homebrew/bin/yabai" } = settings.global;
// Tell the yabai-spaces-server we updated something for which
// yabai lacks a signal.
const SIGNAL_UPDATE = `/usr/bin/curl -s localhost:9090 > /dev/null`;

export const goToSpace = (index) =>
  Uebersicht.run(`${yabaiPath} -m space --focus ${index}`);

export const renameSpace = (index, label) =>
  Uebersicht.run(`${yabaiPath} -m space ${index} --label "${label}"`);

export const createSpace = async (displayId) => {
  await Uebersicht.run(`${yabaiPath} -m display --focus ${displayId}`);
  await Uebersicht.run(`${yabaiPath} -m space --create && ${SIGNAL_UPDATE}`);
};

export const removeSpace = async (index, displayId) => {
  await Uebersicht.run(`${yabaiPath} -m display --focus ${displayId}`);
  await Uebersicht.run(
    `${yabaiPath} -m space ${index} --destroy && ${SIGNAL_UPDATE}`
  );
};

export const swapSpace = async (index, direction) => {
  const action = direction === "left" ? index - 1 : index + 1;
  await Uebersicht.run(`${yabaiPath} -m space ${index} --swap ${action}`);
};

export const focusWindow = (id) =>
  Uebersicht.run(`${yabaiPath} -m window --focus ${id}`);
