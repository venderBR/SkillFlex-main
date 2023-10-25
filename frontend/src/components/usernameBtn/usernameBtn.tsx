
import React from 'react';
import { Dropdown, Menu, Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    label: "My Profile",
    key: 'studentProfile',
  },
  {
    type: 'divider',
  },
  {
    label: 'LogOut',
    key: 'logOut',
  },
];
interface UsernameBtnProps {
  username: string;
}

const UsernameBtn: React.FC<UsernameBtnProps> = ({ username }) => {
  const navigate = useNavigate();

  const onMenuClick = (clickedItem: { key: string; }) => {
    if (clickedItem.key) {
      if(clickedItem.key === 'logOut'){
        handleLogout();
        navigate('/');
      }
      if(localStorage.getItem('teacherInfo')) {
        navigate('/profileT');
      }
      else if(localStorage.getItem('studentInfo')){
        navigate('/profileS');
      }
    }

  };

  const handleLogout = () => {
    localStorage.removeItem("studentInfo");
    localStorage.removeItem("teacherInfo");
    //window.location.reload();

  };

  return (
    <div>
      <Dropdown
        overlay={
          <Menu onClick={onMenuClick}>
            {items.map(item => {
              if (item.type === 'divider') {
                return <Menu.Divider key={"devider"} />;
              }
              return (
                <Menu.Item key={item.key}>
                  {item.label}
                </Menu.Item>
              );
            })}
          </Menu>
        }
        trigger={['click']}
        placement="bottomRight"
      >
        <a onClick={(e) => e.preventDefault()} style={{ color: '#E96479', marginLeft: '10px' }}>
          <Space>
            <UserOutlined />
            {username}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default UsernameBtn;