import "./App.css";
import Root from "./routes/Root";
import { MantineProvider } from "@mantine/core";

export default function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Inter, sans-serif",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Root />
    </MantineProvider>
  );
}
