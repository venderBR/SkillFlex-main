import React, {  } from 'react';
import { Layout, Input, Card, Space, Form, Button, Typography, Flex  } from 'antd';
import ImageCarousel from '../../components/imageCarousel/imageCarousel';
import 'react-multi-carousel/lib/styles.css';
import {CourseCard} from './courseCard';
import  {CategoryCard}  from './categoryCard';
import NavBar from '../../components/navBar/navBar';
import TextArea from 'antd/es/input/TextArea';
import '../contact/style.css'
import { ApprovedCourseInterface } from '../../../interfaces/IApprovedcourse';
import { useNavigate } from 'react-router-dom';
import image from '../../img/artimg.jpg'
const { Content } = Layout;

const cardStyle: React.CSSProperties = {
    width: 700,
};

const imgStyle: React.CSSProperties = {
    display: 'block',
    width: 400,
};
const Home: React.FC<{courseData: ApprovedCourseInterface[]}> = ({courseData}) => {
    const navigate = useNavigate();
    return (
        <Layout className="layout" style={{backgroundColor: 'white', width:'100vw'}}>
            <NavBar currentPage="home" />
            <Content style={{alignContent: 'center', width: '1500px', alignSelf: 'center'}}>
                <ImageCarousel/>
            </Content>

            <Content style={{ padding: '0px 200px', marginBottom: '100px', marginTop:'50px'}}>
                <div className="site-layout-content" >
                <h1>New on SkillFlex</h1>
                <CourseCard courseData={courseData}/>
                
                <div style={{background: "white", margin: "100px", marginBottom: "200px", marginTop: "150px", paddingLeft: '210px'}}>
                    {courseData.slice(0,1).map((item)=>(
                    <Card hoverable style={cardStyle} bodyStyle={{ padding: 0, overflow: 'hidden' }}>
                        <Flex justify="space-between">
                        <img
                            alt={item.Name}
                            src= {item.Image}
                            style={imgStyle}
                        />
                        <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
                            <Typography.Title level={3}>
                            “{item?.Name}”
                            </Typography.Title>
                            <Button type="primary" onClick={() => (navigate(`/courseDashboard/${item.ID}`))} target="_blank">
                            Get Start
                            </Button>
                        </Flex>
                        </Flex>
                    </Card>
                    ))}
                </div>

                <h1>Top Catagory</h1>
                <p>Explore each category, and earn new skills</p>
                <CategoryCard/>
                </div>
            </Content>

            <Content className='contact' id='contact'>
                <div className="container" 
                style={{ alignSelf:'center',alignItems:'center', justifyContent:'center', display: 'flex', height: '500px', width:'1100'}}>
                    <Space size={100}>
                        <Card style={{width: '500px'}}>
                            <h1 style={{fontSize:'3rem'}}>Contact Us</h1>
                            <Form style={{}}>
                                <Form.Item name="name" rules={[{ required: true }]}>
                                    <Input placeholder='Your Name'/>
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                    ]}
                                >
                                    <Input placeholder='Your E-mail'/>
                                </Form.Item>
                                <TextArea placeholder="Autosize height based on content lines" autoSize />
                                <div style={{ margin: '24px 0' }} />
                            </Form>
                            <Button type="primary" size={'large'} block>
                                Send
                            </Button>
                        </Card>
                            
                        <div style={{ width: '400px', height: '400px', paddingLeft: '200px'}}>
                            <h1>Info</h1>
                            <p>Phone1</p>
                            <p>Phone2</p>
                            <p>Phone3</p>
                            <p>Phone4</p>
                        </div>
                    </Space>
                </div>
            </Content>
        </Layout>
    );
}
export default Home;