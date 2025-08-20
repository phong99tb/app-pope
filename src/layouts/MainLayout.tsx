// import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Sidebar menu */}
        <div className="hidden md:block w-[240px]">
          <Menu />
        </div>
        <div className="flex flex-col flex-1 min-h-screen">
          <Header />
          <div className="md:p-4 bg-[#e4e3ee] text-black h-full">
            <div className="bg-[white] p-4 md:rounded-2xl shadow-2xl h-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
