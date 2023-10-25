import React, { useState, useEffect } from "react";
import { Component } from 'react';
import './style.css'
import { Layout, Menu,Input, ConfigProvider, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UsernameBtn from '../usernameBtn/usernameBtn';
const { Header} = Layout;
const { Search } = Input;




const Manutab = () => {
  const [myData, setMyData] = useState<{ ID: number, FirstName: string, LastName: string } | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('teacherInfo');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setMyData(parsedData);
    }
  }, []);
  
    
    return (
        <Layout className="layout">
          <Header style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center',width:'100vw',paddingInline:'0'}}>
            <Space>
            <ConfigProvider
                theme={{
                components: {
                      Menu: {
                          itemHoverColor:'#E96479',
                          colorPrimary: '#E96479'
                            },
                            },
                      }}
            > 
              <Menu
                 mode="horizontal" 
                 style={{paddingRight: '700px'}}
                 items={[{ key: '1', label: 'Explore' }]}
              />
              </ConfigProvider>           


              {/* <ConfigProvider
                  theme={{
                      token: {
                          borderRadius: 10,
                          colorBgContainer: 'white',
                          colorPrimaryHover: '#E96479',
                          colorTextPlaceholder:'#E96479'
                      }
                  }}
                  >
                  <Search placeholder="Want to learn something?" className='search'  /*onSearch={onSearch} style={{ width: 250}} />
                  
              </ConfigProvider> */}

              <div className='SkillFlex'>
                  <span className='skill'>Skill</span>
                  <span className='flex'>Flex</span>
              </div>
              <ConfigProvider
                theme={{
                components: {
                      Menu: {
                          itemHoverColor:'#E96479',
                          colorPrimary: '#E96479'
                            },
                            },
                      }}
            > 
              <Menu
                mode="horizontal"
                style={{paddingLeft: '500px' }}
                items={[
                  {key: '2', label: 'Contact us'},
                  {key: '3', icon: <UsernameBtn username={myData?.FirstName + ' ' + myData?.LastName}/>},
                  ]}
              />
              </ConfigProvider> 
              </Space>
          </Header>

          </Layout>

          
      );
  }

export default Manutab;