// components/menuConfig.ts
import {
  CheckSquareOutlined,
  DollarCircleOutlined,
  CrownOutlined,
} from '@ant-design/icons';

export const menuItems = [
  {
    key: '1',
    icon: <CheckSquareOutlined />,
    label: 'Việc cần làm',
    path: '/app-pope/todolist',
  },
  {
    key: '2',
    icon: <DollarCircleOutlined />,
    label: 'Thu chi cá nhân',
    path: '/app-pope/money',
  },
  {
    key: '3',
    icon: <CrownOutlined />,
    label: 'Sổ đỏ đen',
    path: '/app-pope/casino',
  },
];
