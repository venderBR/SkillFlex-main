import React, { useState, useEffect } from "react";
import { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'
import { Breadcrumb, Layout, Menu, theme, Button, Input, ConfigProvider, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UsernameBtn from '../usernameBtn/usernameBtn';
const { Header, Content} = Layout;
const { Search } = Input;


const Manutab = () => {
  
  
  const [searchQuery, setSearchQuery] = useState<string>('');

  const onSearch = (value: string) => {
    setSearchQuery(value)
    navigate(`/search?query=${searchQuery}`);
  }
  const navigate = useNavigate();

  const homeClick = () => {
    navigate('/profileT');
  }
  const [myData, setMyData] = useState<{ ID: number, FirstName: string, LastName: string } | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('teacherInfo');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setMyData(parsedData);
    }
  }, [myData]);
    return (
        <Layout className="layout">
          <Header style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center',width:"1790px"}}>
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


              <ConfigProvider
                  theme={{
                      token: {
                          borderRadius: 10,
                          colorBgContainer: 'white',
                          colorPrimaryHover: '#E96479',
                          colorTextPlaceholder:'#E96479'
                      }
                  }}
                  >
                  <Search placeholder="Want to learn something?" className='search'  onSearch={onSearch} style={{ width: 250}} />
                  
              </ConfigProvider>

              <div className='SkillFlex' onClick={homeClick}>
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
                style={{paddingLeft: '670px' }}
                
                items={[
                  {key: '2', label: 'Contact us'},
                  {key: '3', icon: <UsernameBtn username={myData?.FirstName + ' ' + myData?.LastName}/>},
                  ]}
              />
              </ConfigProvider> 
              </Space>
          </Header>
          <Content className='colourBG' style={{width:'100%'}}>
          <Breadcrumb style={{ margin: '37px ' }}>
            <Breadcrumb.Item className='welcome'>
              Welcome : {myData && myData.FirstName ? myData.FirstName : 'Teacher'}
            </Breadcrumb.Item>
          </Breadcrumb>

          </Content>
          <div style={{ 
          background: '#4D455D', 
          width: '145vw', 
          height: '2.2px',
          position: 'absolute', 
          top: '236px', 
          left: '500px', 
          transform: 'translate(-50%, -50%)',}}
        />
          </Layout>

          
      );
  }


export default Manutab;