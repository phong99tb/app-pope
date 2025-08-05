import { Drawer, Menu as AntMenu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from '@/configs/menuConfig';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenuDrawer({ open, onClose }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = menuItems.find(item => location.pathname.startsWith(item.path))?.key;

  const handleMenuClick = (e: any) => {
    const selectedItem = menuItems.find((item) => item.key === e.key);
    if (selectedItem) {
      navigate(selectedItem.path);
      onClose();
    }
  };

  return (
    <Drawer title="Menu" placement="left" onClose={onClose} open={open} bodyStyle={{ padding: 0 }}>
      <AntMenu
        mode="inline"
        selectedKeys={selectedKey ? [selectedKey] : []}
        onClick={handleMenuClick}
        items={menuItems}
      />
    </Drawer>
  );
}
