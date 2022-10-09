import { React } from "uebersicht";

export const YabaiContext = React.createContext();

export const YabaiCtx = (props = { children: [] }) => {
  console.log(props);
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    const socket = new WebSocket("ws://localhost:9090");
    socket.addEventListener("message", (event) => {
      console.log(event);
      if (event.data.length === 0) return;
      try {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data.type === "SPACES_UPDATED") setData(data.content);
      } catch (err) {
        console.error(`Error parsing data from event ${event}: ${err}`);
      }
    });
    return () => socket.close();
  }, []);

  return (
    <YabaiContext.Provider value={data}>{props.children}</YabaiContext.Provider>
  );
};
