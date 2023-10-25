import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    AiOutlineHome,
    AiOutlineMenu,
    AiOutlineClose,
    AiTwotoneStop,
} from "react-icons/ai";
import {
    MailOutlined,
    UserOutlined,
    PhoneOutlined,
    LockOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import "./style.css";
import { Menu, Space, message, Input, Form, Button, Checkbox } from "antd";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { TeachersInterface } from "../../../interfaces/ITeacher";
import { CreateTeacher } from "../../services/https/indexTeacher";

function RegisterTeacher() {
    const [form] = Form.useForm();
    const [expanded, setExpanded] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState("TEACHER");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const navigate = useNavigate();

    const toggleMenu = () => {
        setExpanded(!expanded);
    };

    const handleMenuItemClick = (key: string) => {
        setSelectedMenuItem(key);
    };

    const onChange = (e: CheckboxChangeEvent) => {
        setIsCheckboxChecked(e.target.checked);
    };

    const onFinish = async (values: TeachersInterface) => {
        if (!isCheckboxChecked) {
            message.error("กรุณายอมรับข้อกำหนดการใช้งาน");
            return;
        }

        // Trim the email value here
        if (values.Email) {
            values.Email = values.Email.trim();
        }

        let res = await CreateTeacher(values);
        console.log(res);
        if (res.status) {
            message.success("บันทึกข้อมูลสำเร็จ");
            setTimeout(function () {
                navigate("/LoginTeacher");
            }, 2000);
        } else {
            message.error("บันทึกข้อมูลไม่สำเร็จ โปรดตรวจสอบความถูกต้อง");
        }
    };

    return (
        <div className="reg">
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                <header id="header" className="card">
                    <span className="Skill">Skill</span>
                    <span className="Flex">Flex</span>
                </header>
                <aside>
                    <header className="App-header">
                        <Space>
                            <Menu
                                mode="inline"
                                selectedKeys={[selectedMenuItem]}
                                onClick={({ key }) => handleMenuItemClick(key)}
                                defaultOpenKeys={[]}
                                className="menu-background"
                                style={{ width: expanded ? 300 : 50 }}
                            >
                                <Menu.Item key="home" id="button" className="menu-item">
                                    <Link to="/SelectPage" className="textfont">
                                        {expanded && <AiOutlineHome />} Home
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    key="STUDENT"
                                    id="button"
                                    className={`menu-item ${
                                        selectedMenuItem === "STUDENT" ? "selected" : ""
                                    }`}
                                >
                                    <Link to="/RegisterStudent" className="textfont">
                                        {expanded && <AiTwotoneStop />} STUDENT
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    key="TEACHER"
                                    id="button"
                                    className={`menu-item ${
                                        selectedMenuItem === "TEACHER" ? "selected" : ""
                                    }`}
                                >
                                    <Link to="/RegisterTeacher" className="textfont">
                                        {expanded && <AiTwotoneStop />} TEACHER
                                    </Link>
                                </Menu.Item>
                            </Menu>
                            <button className="expand-button" onClick={toggleMenu}>
                                {expanded ? <AiOutlineClose /> : <AiOutlineMenu />}
                            </button>
                        </Space>
                    </header>
                    <p className={`skillflex ${expanded ? "expanded-color" : ""}`}>
                        S K I L L F L E X
                    </p>
                </aside>

                <main>
                    <div className="boxWhite">
                        <Form.Item
                            className="email"
                            name="Email"
                            rules={[
                                {
                                    required: true,
                                    type: "email",
                                    message: "Please enter a valid email",
                                },
                            ]}
                        >
                            <div className={`inputBox`}>
                                <Input
                                    type="email"
                                    required
                                    id="email_input"
                                    onBlur={() => {
                                        const emailValue = form.getFieldValue('Email');
                                        if (emailValue) {
                                            form.setFieldsValue({ Email: emailValue.trim() });
                                        }
                                    }}
                                />

                                <span className="email_input">
                                    <MailOutlined /> email
                                </span>
                            </div>
                        </Form.Item>

                        <Form.Item 
                            className="firstName"
                            name="FirstName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your first name",
                                },
                            ]}
                        >
                            <div className="inputBox">
                                <Input type="text" name="FirstName" required id="first_name" />
                                <span className="first_name">
                                    <UserOutlined /> firstname
                                </span>
                            </div>
                        </Form.Item>

                        <Form.Item className="lastName"
                            name="LastName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your last name",
                                },
                            ]}
                        >
                            <div className="inputBox">
                                <Input type="text" name="LastName" required id="last_name" />
                                <span className="last_name">
                                    <UserOutlined /> Lastname
                                </span>
                            </div>
                        </Form.Item>

                        <Form.Item
                            className="phon"
                            name="Phone"
                            rules={[
                                {
                                    required: true,
                                    pattern: /^0[0-9]{9}$/,
                                    message: "Please enter a valid phone number",
                                },
                            ]}
                        >
                            <div className={`inputBox`}>
                                <Input
                                    type="tel"
                                    required
                                    id="phone"
                                    onBlur={() => {
                                        const phoneValue = form.getFieldValue('Phone');
                                        if (phoneValue) {
                                            form.setFieldsValue({ Phone: phoneValue.trim() });
                                        }
                                    }}
                                />
                                <span className={`phone`}>
                                    <PhoneOutlined /> Phone Number
                                </span>
                            </div>
                        </Form.Item>


                        <Form.Item className="password"
                            name="Password"
                            rules={[
                                {
                                    required: true,
                                    pattern: /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/,
                                    message: "Please enter your password.",
                                },
                            ]}
                        >
                            <div className="password">
                                <div className={`inputBox`}>
                                    <p className="textpassword">
                                        รหัสผ่าน 6 ตัวขึ้นไป โดยประกอบด้วยอักษร a-z และ A-Z และ 0-9
                                    </p>
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        required
                                        id="password"
                                        name="Password"
                                        onBlur={() => {
                                            const passwordValue = form.getFieldValue('Password');
                                            if (passwordValue) {
                                                form.setFieldsValue({ Password: passwordValue.trim() });
                                            }
                                        }}                                    
                                    />
                                    <span className="password">
                                        <LockOutlined /> Password
                                    </span>
                                    <div
                                        id="toggle"
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        className={passwordVisible ? "hide" : ""}
                                    ></div>
                                </div>
                            </div>
                        </Form.Item>

                        <Form.Item className="confirmPassword"
                            name="ConfirmPassword"
                            dependencies={['Password']}
                            rules={[
                                {
                                    required: true,
                                    message: "Passwords are not the same",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('Password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Passwords do not match"));
                                    },
                                }),
                            ]}
                        >
                            <div className="inputBox">
                                <input
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    required
                                    id="password2"
                                    onBlur={() => {
                                        const confirmPasswordVisible = form.getFieldValue('ConfirmPassword');
                                        if (confirmPasswordVisible) {
                                            form.setFieldsValue({ ConfirmPassword: confirmPasswordVisible.trim() });
                                        }
                                    }}                                
                                />
                                <span className="comfirmPassword">
                                    <LockOutlined /> Confirm Password
                                </span>
                                <div
                                    id="toggle2"
                                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                    className={confirmPasswordVisible ? "hide" : ""}
                                ></div>
                            </div>
                        </Form.Item>

                        <Form.Item className="checkbox"
                            rules={[
                                {
                                    required: true,
                                    message: "Please mark correctly.",
                                },
                            ]}
                        >
                            <div className="maincheckBox">
                                <div className="checkBox">
                                    <span className="checkBox1">การสมัครใช้งาน เราถือว่าคุณยอมรับ</span>
                                    <span className="checkBox2">ข้อกําหนดการใช้งาน</span>
                                    <span className="checkBox3">ของ SkillFlex แล้ว</span>
                                </div>
                                <Checkbox className="evencheckbox" onChange={onChange}></Checkbox>
                            </div>
                        </Form.Item>

                        <div className="signin">
                            <span className="text">มีบัญชีแล้ว ? | </span>
                            <Link to="/SelectPage" className="textsignin"> เข้าสู่ระบบ</Link>
                        </div>

                        <Form.Item>
                            <Button
                                className="bottomsubmid"
                                type="primary"
                                htmlType="submit"
                                disabled={!isCheckboxChecked} // ปิดใช้งานปุ่มถ้า Checkbox ไม่ถูกติก
                            >
                                SUBMIT
                            </Button>
                        </Form.Item>

                        <div className="gobackhome">
                            <Link to="/SelectPage" className="homepage"> <ArrowLeftOutlined /> กลับสู่หน้าหลัก</Link>
                        </div>
                    </div>
                </main>
            </Form>
        </div>
    );
}

export default RegisterTeacher;
