import * as AppIcons from "../../app-icons";
import * as Settings from "../../settings";
import * as Utils from "../../utils";

const settings = Settings.get();
const { hideMinimized } = settings.spacesDisplay;

const OpenedApps = ({ apps }) => {
  if (!apps.length) return null;
  return Utils.sortWindows(apps).map((app, i) => {
    const {
      "is-minimized": isMinimized,
      "has-focus": hasFocus,
      app: appName,
      "has-parent-zoom": hasParentZoom,
      "has-fullscreen-zoom": hasFullscreenZoom,
    } = app;
    if (hideMinimized && isMinimized) return null;

    const Icon = AppIcons.apps[appName] || AppIcons.apps.Default;
    const classes = Utils.classnames("space__icon", {
      "space__icon--focused": hasFocus,
      "space__icon--fullscreen": hasParentZoom || hasFullscreenZoom,
      "space__icon--minimized": isMinimized,
    });
    return <Icon className={classes} key={i} />;
  });
};

export default OpenedApps;
