import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import AppRouter from "@/router";
import eventBus from '@/utils/eventBus';


function App() {
  const [count, setCount] = useState(0);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handler = (data: any) => {
      console.log('Đã nhận event:', data);
    };

    eventBus.on('custom-event', handler);

    return () => {
      eventBus.off('custom-event', handler); // cleanup khi unmount
    };
  }, []);

  return (
    <>
      <AppRouter/>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="p-4">
        <h1>{t("welcome")}</h1>
        <button onClick={() => i18n.changeLanguage("vi")}>VI</button>
        <button onClick={() => i18n.changeLanguage("en")}>EN</button>
      </div>
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello world!
      </h1>
      <h1>Vite + React</h1>
      <Button type="primary">Primary Button</Button>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
