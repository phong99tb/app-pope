import { Link } from "react-router-dom";
import eventBus from "@/utils/eventBus";

export default function About() {
  const send = () => {
    eventBus.emit("custom-event", { message: "Hello from A" });
  };
  return (
    <div>
      <h2>About Page</h2>
      <Link to="/">Quay về Home</Link>
      <button onClick={send}>Gửi sự kiện</button>;
    </div>
  );
}
