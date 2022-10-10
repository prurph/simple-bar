import { React } from "uebersicht";

export const YabaiContext = React.createContext();

export const YabaiContextWrapper = (props = { children: [] }) => {
  const [value, setValue] = React.useState({});
  React.useEffect(() => {
    const socket = new WebSocket("ws://localhost:9090");
    socket.addEventListener("message", (event) => {
      if (event.data.length === 0) return;
      try {
        const { type, content } = JSON.parse(event.data);
        if (type === "SPACES_UPDATED") {
          setValue(content);
        }
      } catch (err) {
        console.error(`Error parsing data from event: ${err}`);
        console.error(event);
      }
    });
    return () => socket.close();
  }, []);

  return (
    <YabaiContext.Provider value={value}>
      {props.children}
    </YabaiContext.Provider>
  );
};
