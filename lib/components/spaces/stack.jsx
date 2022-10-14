import Window from "./window.jsx";
import _sortBy from "lodash/sortBy";

const Stack = ({ windows }) => {
  return (
    <div className="stack__container">
      {_sortBy(windows, "stack-index").map((window, i) => {
        const stackIndex = window["stack-index"];
        return (
          <Window
            key={i}
            window={window}
            style={{
              zIndex: 100 - stackIndex,
            }}
          />
        );
      })}
    </div>
  );
};

export default Stack;
