import './navBar.css'

import { Layout, Menu, Input, ConfigProvider, Divider } from 'antd';
import ExploreBtn from '../exploreBtn/exploreBtn';
import UsernameBtn from '../usernameBtn/usernameBtn';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { StudentInterface } from '../../../interfaces/IStudent';

interface NavBarProps {
  currentPage: string; // Make sure this prop is typed as a string
}


function NavBar(navProps: NavBarProps ){
  const navigate = useNavigate();
  
  const [studentid, setStudentid] = useState("");
  const [studentData, setStudentData] = useState<StudentInterface>();
  
  const homeClick = () => {
    navigate('/home');
  }

  const onMenuClick = (item: { key: string; }) => {
    if(navProps.currentPage === "home") window.location.href = '#contact';
    else navigate(`/contact`);
  }

  const { Header } = Layout;
  const { Search } = Input;

  const [searchQuery, setSearchQuery] = useState<string>('');

  const onSearch = (value: string) => {
    setSearchQuery(value)
    navigate(`/search?query=${searchQuery}`);
  }

  useEffect(() => {
    const storedData = localStorage.getItem('studentInfo');
    
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setStudentData(parsedData);
      setStudentid(parsedData?.ID.toString());
    }
  }, [studentData]);

  
    return(
          <div>
          <Header style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',width:'100vw'}}>
              <ExploreBtn/>

              <ConfigProvider
                    theme={{
                        token: {
                            borderRadius: 10,
                            colorBgContainer: 'white',
                            colorPrimaryHover: '#E96479',
                        },
                    }}
                    >
                    <Search 
                    placeholder="input search text" 
                    value={searchQuery}
                    onSearch={ onSearch }
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: 200,marginLeft:20, marginRight:580}} 
                    />
              </ConfigProvider>

                <div className='SkillFlex' onClick={homeClick}>
                    <span className='skill'>Skill</span>
                    <span className='flex'>Flex</span>
                </div>

                <ConfigProvider
              theme={{
                components: {
                  Menu: {
                    horizontalItemHoverColor: '#E96479',
                    horizontalItemSelectedColor: '#E96479'
                  }
                }
              }}
              >
                <Menu
                  mode="horizontal"
                  onClick={onMenuClick}
                  items={[
                    {key: 'contact',label: 'Contact us'},
                    ]}
                />
              </ConfigProvider>
              
              <UsernameBtn username={studentData?.FirstName + " " + studentData?.LastName}/>
            </Header>
            <Divider type="horizontal" style={{marginTop: '-1px'}}/>
            
          </div>
    );
}


export default NavBar;