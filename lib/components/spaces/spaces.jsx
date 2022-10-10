import Space from "./space.jsx";
import * as Icons from "../icons.jsx";
import * as Utils from "../../utils";
import * as Yabai from "../../yabai";
import * as Settings from "../../settings";
import { YabaiContext } from "../YabaiContext.jsx";
import { React } from "uebersicht";

export { spacesStyles as styles } from "../../styles/components/spaces/spaces";

const settings = Settings.get();
const { displayStickyWindowsSeparately } = settings.spacesDisplay;

export const Component = () => {
  const { displays, spaces, windows } = React.useContext(YabaiContext);

  if (!spaces) return <div className="spaces-display spaces-display--empty" />;

  const displayId = parseInt(window.location.pathname.replace("/", ""));
  const display = displays.find((d) => d.id === displayId);
  if (!display) return;

  const SIPDisabled = true;

  const { index: currentSpaceIndex } = spaces.find((space) => {
    return space["has-focus"];
  });

  const onClick = async (e) => {
    Utils.clickEffect(e);
    await Yabai.createSpace(display.index);
  };

  return (
    <div key={display.id} className="spaces">
      {spaces.map((space) => {
        return (
          <Space
            key={space.index}
            display={display}
            space={space}
            windows={windows}
            currentSpaceIndex={currentSpaceIndex}
            SIPDisabled={SIPDisabled}
          />
        );
      })}
      {SIPDisabled && (
        <button className="spaces__add" onClick={onClick}>
          <Icons.Add />
        </button>
      )}
    </div>
  );
};
