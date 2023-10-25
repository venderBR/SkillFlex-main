import React from 'react'
import { Button, Card, Form, Input, Space } from 'antd'
import { Content } from 'antd/es/layout/layout';
import './style.css'
import TextArea from 'antd/es/input/TextArea';
import NavBar from '../../components/navBar/navBar';

const Contact: React.FC = () => {
    
return (
    <Content className='contact' id='contact'>
    {<NavBar currentPage="contact" />}
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
  )
}
export default Contact;