import Window from "./window.jsx";
import Stack from "./stack.jsx";
import * as Settings from "../../settings";
import * as Utils from "../../utils";
import { YabaiContext } from "../YabaiContext.jsx";
import { React } from "uebersicht";
import _groupBy from "lodash/groupBy";

export { processStyles as styles } from "../../styles/components/process";

const settings = Settings.get();

export const Component = () => {
  const { spaces, windows, displays } = React.useContext(YabaiContext);

  if (!windows) return null;

  const { process, spacesDisplay } = settings;
  const { exclusionsAsRegex } = spacesDisplay;
  const exclusions = exclusionsAsRegex
    ? spacesDisplay.exclusions
    : spacesDisplay.exclusions.split(", ");
  const titleExclusions = exclusionsAsRegex
    ? spacesDisplay.titleExclusions
    : spacesDisplay.titleExclusions.split(", ");
  const displayId = parseInt(window.location.pathname.replace("/", ""));
  const display = displays.find((d) => d.id === displayId);
  if (!display) return;

  const currentSpace = spaces.find((space) => {
    return space["is-visible"] && space.display === display.index;
  });
  const { stickyWindows, nonStickyWindows } = Utils.stickyWindowWorkaround({
    windows,
    uniqueApps: false,
    currentDisplay: display.index,
    currentSpace: currentSpace?.index,
    exclusions,
    titleExclusions,
    exclusionsAsRegex,
  });

  const apps = [...stickyWindows, ...nonStickyWindows];

  const classes = Utils.classnames("process", {
    "process--centered": process.centered,
  });

  const byStack = _groupBy(Utils.sortWindows(apps), (w) => [
    w.frame.x,
    w.frame.y,
    w["stack-index"] > 0,
  ]);

  return (
    <div className={classes}>
      <div className="process__container">
        {process.showCurrentSpaceMode && currentSpace && (
          <div key={currentSpace.index} className="process__layout">
            {currentSpace.type}
          </div>
        )}
        {Object.values(byStack).map((windows, i) => {
          return windows[0]["stack-index"] > 0 ? (
            <Stack key={i} windows={windows} />
          ) : (
            windows.map((window, i) => <Window key={i} window={window} />)
          );
        })}
      </div>
    </div>
  );
};
