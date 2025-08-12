import AppRouter from "@/router";
import { ConfigProvider } from "antd";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1d9309",
          },
        }}
      >
        <AppRouter />
      </ConfigProvider>
    </>
  );
}

export default App;
