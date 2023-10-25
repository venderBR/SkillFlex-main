import React, { useRef, useState } from "react";
import './style.css';
import { Input, ConfigProvider } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Menu, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineHome, AiFillEdit } from "react-icons/ai";

import { GetStudentByEmail } from "../../services/https/indexStudent";

function LoginStudent() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState("log in");
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");
    const email = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const getEmail = localStorage.getItem("emailDataStudent");
    const getPassword = localStorage.getItem("passwordDataStudent");

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleMenuItemClick = (key: string) => {
        setSelectedMenuItem(key);
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const emailValue = email.current?.value;
        const PasswordValue = password.current?.value;
        setConfirmLoading(true);

        try {
            const studentE = await GetStudentByEmail(emailValue);
            if (studentE.Email === emailValue && studentE.Password === PasswordValue) {
                const studentInfo = JSON.stringify(studentE)
                console.log(studentInfo)

                localStorage.setItem("studentInfo", studentInfo);

                message.success("เข้าสู่ระบบสำเร็จ");
                navigate("/home");
            } else {
                message.error("เข้าสู่ระบบไม่สำเร็จ");
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการล็อกอิน:", error);
            message.error("เข้าสู่ระบบไม่สำเร็จ");
        } finally {
            setConfirmLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("studentInfo");
        window.location.reload();
    };

    return (
        <div className="login">
            <div className="appHeader">
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                colorPrimary: '#ffffff',
                            },
                        },
                    }}
                >
                    <Menu
                        selectedKeys={[selectedMenuItem]}
                        onClick={({ key }) => handleMenuItemClick(key)}
                        defaultOpenKeys={['log in']}
                        className="login_menu-background"
                        mode="horizontal"
                    >
                        <Menu.Item
                            key="home"
                            id="Lbotton"
                        >
                            <Link to="/" className="textfont">
                                {<AiOutlineHome />} Home
                            </Link>
                        </Menu.Item>
                        <Menu.SubMenu key="contact us" title="Contact us" style={{ marginLeft: '74.5%'}}>
                            <Menu.Item key="Contact us1" id="Lobotton"> 
                                <Link to="/home" className="textfont">
                                    {<BiLogOut />} Go to contact us
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sign up" title="Sign up" >
                            <Menu.Item key="sign up1" id="Lobotton">
                                <Link to="/RegisterStudent" className="textfont">
                                    {<AiFillEdit />} Sign up for Student
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="sign up2" id="Lobotton">
                                <Link to="/RegisterTeacher" className="textfont">
                                    {<AiFillEdit />} Sign up for Teacher
                                </Link>
                            </Menu.Item>
                            <hr/>
                            <Menu.Item key="log out" id="Lobotton">
                                <Link to="/home" className="textlogout" onClick={handleLogout} style={{color: '#e96479'}}>
                                    {<BiLogOut />} Logout
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item
                            key="log in"
                            id="Lbotton"
                        >
                            <Link to="/LoginStudent" className="textfont">
                                Student
                            </Link>
                        </Menu.Item>
                    </Menu>
                </ConfigProvider>
            </div>
            <div className="backgrounpink">
                <div className="r1"></div>
                <div className="r2"></div>
                <div className="r3"></div>
                <div className="r4"></div>
            </div>
            <header id="header" className="card">
                <span className="Skill">Skill</span>
                <span className="Flex">Flex</span>
            </header>

            {getEmail && getPassword ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <div>
                    <form onSubmit={handleSubmit} className="boxgreen">
                        <div id="text" className="miantext">
                            <span className="text1">เข้าสู่บัญชี</span>
                            <span className="text2"> Skill</span>
                            <span className="text3">Flex</span>
                            <span className="text1"> ของคุณ</span>
                        </div>
                        
                        <div className={`inputBox`}>
                            <input
                                type="text"
                                ref={email}
                                required
                                id="email_input"
                            />
                            <span className="email_input">
                                <MailOutlined /> email
                            </span>
                        </div>

                        
                        <div className="password">
                            <div className={`inputBox`}>
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    required
                                    ref={password}
                                    id="password"
                                    name="Password"
                                />
                                <span className="password">
                                    <LockOutlined /> Password
                                </span>
                                <div
                                    id="toggle"
                                    onClick={() => togglePasswordVisibility()}
                                    className={passwordVisible ? "hide" : ""}
                                ></div>
                            </div>
                        </div>

                            <button
                                className="bottomsubmid"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                SIGNIN
                            </button>

                    </form>
                    {loginMessage && <p>{loginMessage}</p>}
                    <div id="text2">
                    <span className="texx">ยังไม่เป็นสมาชิก | </span>
                        <Link to="/RegisterStudent" className="texxt">สมัครสมาชิก</Link>
                    </div>
                </div>
                
            )}
            
        </div>
    );
}

export default LoginStudent;
