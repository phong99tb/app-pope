import { Avatar, Dropdown, Menu, Space } from "antd";
import { UserOutlined, DownOutlined, MenuOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import MobileMenuDrawer from "./MobileMenuDrawer"; // 👈 thêm dòng này

export default function Header() {
  const username = "Thiên Khánh";
  const balance = 12345678;

  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // 👈 trạng thái mở menu drawer

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case "profile":
        console.log("Xem hồ sơ");
        break;
      case "deposit-history":
        console.log("Xem lịch sử nạp tiền");
        break;
      case "payment-history":
        console.log("Xem lịch sử thanh toán");
        break;
      case "logout":
        console.log("Đăng xuất");
        break;
    }
  };

  const dropdownMenu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        { key: "profile", label: "Xem hồ sơ" },
        { key: "deposit-history", label: "Lịch sử nạp tiền" },
        { key: "payment-history", label: "Lịch sử thanh toán" },
        { type: "divider" },
        { key: "logout", label: "Đăng xuất" },
      ]}
    />
  );

  return (
    <>
      <div
        style={{
          padding: "0 16px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {isMobile && (
            <MenuOutlined
              style={{ fontSize: 20, cursor: "pointer" }}
              onClick={() => setMenuOpen(true)}
            />
          )}

          {!isMobile && (
            <div style={{ fontSize: 18, fontWeight: 600 }}>
              Xin chào, {username}
            </div>
          )}
        </div>

        <Space>
          <div style={{ fontSize: 16, color: "#1890ff", fontWeight: 500 }}>
            {balance.toLocaleString()} đ
          </div>

          <Dropdown overlay={dropdownMenu} trigger={["click"]}>
            <div style={{ cursor: "pointer" }}>
              <Space>
                <Avatar icon={<UserOutlined />} />
                {!isMobile && <DownOutlined />}
              </Space>
            </div>
          </Dropdown>
        </Space>
      </div>

      {/* Menu cho mobile (Drawer trái) */}
      {isMobile && (
        <MobileMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      )}
    </>
  );
}
