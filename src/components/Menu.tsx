import { Layout, Menu as AntMenu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from '@/configs/menuConfig';

const { Sider } = Layout;

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = menuItems.find(item => location.pathname.startsWith(item.path))?.key;

  const handleMenuClick = (e: any) => {
    const selectedItem = menuItems.find((item) => item.key === e.key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  return (
    <Sider width={240} style={{ minHeight: '100%', background: '#001529' }}>
      <AntMenu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKey ? [selectedKey] : []}
        onClick={handleMenuClick}
        items={menuItems}
      />
    </Sider>
  );
}
