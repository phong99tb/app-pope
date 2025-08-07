// import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar menu */}
        <div className="hidden md:block w-[240px]">
          <Menu />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
