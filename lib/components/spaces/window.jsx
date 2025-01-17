import * as Uebersicht from "uebersicht";
import * as AppIcons from "../../app-icons";
import * as Settings from "../../settings";
import * as Utils from "../../utils";
import * as Yabai from "../../yabai";

const settings = Settings.get();

const Window = ({ style = {}, window }) => {
  const ref = Uebersicht.React.useRef();
  const {
    displayOnlyCurrent,
    hideWindowTitle,
    displayOnlyIcon,
    hideMinimized,
  } = settings.process;
  const {
    "is-minimized": isMinimized,
    "has-focus": hasFocus,
    app: appName,
    title,
    id,
  } = window;
  if ((isMinimized && hideMinimized) || (displayOnlyCurrent && !hasFocus))
    return null;
  const Icon = AppIcons.apps[appName] || AppIcons.apps.Default;
  const classes = Utils.classnames("process__window", {
    "process__window--focused": !displayOnlyCurrent && hasFocus,
    "process__window--only-current": displayOnlyCurrent,
    "process__window--only-icon": displayOnlyIcon,
    "process__window--minimized": isMinimized,
  });
  const onClick = (e) => {
    !displayOnlyCurrent && Utils.clickEffect(e);
    Yabai.focusWindow(id);
  };
  const onMouseEnter = () =>
    Utils.startSliding(ref.current, ".process__inner", ".process__name");
  const onMouseLeave = () => Utils.stopSliding(ref.current, ".process__name");

  const cleanedUpName =
    appName !== title && title.length ? `${appName} / ${title}` : appName;
  const processName = hideWindowTitle ? appName : cleanedUpName;

  return (
    <button
      ref={ref}
      className={classes}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      <Icon className="process__icon" />
      <span className="process__inner">
        {!displayOnlyIcon && (
          <span className="process__name">{processName}</span>
        )}
      </span>
    </button>
  );
};

export default Window;
