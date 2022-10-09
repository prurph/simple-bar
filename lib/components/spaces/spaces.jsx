import Space from "./space.jsx";
import Stickies from "./stickies.jsx";
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
  const data = React.useContext(YabaiContext);

  if (!data.spaces)
    return <div className="spaces-display spaces-display--empty" />;

  const displayId = parseInt(window.location.pathname.replace("/", ""));
  const { index: displayIndex } = data.displays.find((d) => {
    return d.id === displayId;
  });
  const displays = [...new Set(data.spaces.map((space) => space.display))];
  // const SIPDisabled = SIP !== "System Integrity Protection status: enabled.";
  const SIPDisabled = false;

  const { index: currentSpaceIndex } = data.spaces.find((space) => {
    return space["has-focus"];
  });

  return displays.map((display, i) => {
    if (display !== displayIndex) return null;

    const onClick = async (e) => {
      Utils.clickEffect(e);
      await Yabai.createSpace(displayIndex);
    };

    return (
      <div key={i} className="spaces">
        {displayStickyWindowsSeparately && (
          <Stickies display={display} windows={windows} />
        )}
        {data.spaces.map((space, i) => {
          const { uuid, label, index } = space;
          const lastOfSpace =
            i !== 0 && space.display !== data.spaces[i - 1].display;
          return (
            <Space
              // key={uuid}
              display={display}
              space={space}
              windows={data.windows}
              displayIndex={displayIndex}
              currentSpaceIndex={currentSpaceIndex}
              SIPDisabled={SIPDisabled}
              lastOfSpace={lastOfSpace}
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
  });
};
