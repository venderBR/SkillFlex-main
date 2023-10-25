import React from "react";
import {Input } from "antd";
import { Image } from 'antd';
import "./styleE.css";
import { BrowserRouter, Link, Route, Router, Routes,Outlet,useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/navBar";
import { Card } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Upload,Form,message,Button } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useEffect, useState } from "react"
import { TeachersInterface } from "../../../interfaces/ITeacher";
import { GetTeacherById,UpdateTeachersById } from "../../services/https/index";
import Manutab from "../../components/Manutab_upCourse";
const { Meta } = Card;

export const EditT = (): JSX.Element => {
  const [teacher, setTeacherData] = useState<TeachersInterface[]>([]);
  const [idStudent,setIdStudent] = useState<number>();
  const getTeachers = async (id: number) => {
      let res = await GetTeacherById(id); // แทนที่ GetStudentById ด้วยฟังก์ชันการเรียก API จริง
      if (!Array.isArray(res)) {
          // ถ้า res ไม่ใช่ array ให้แปลงเป็น array โดยใส่ res ใน array ใหม่
          res = [res];
      }
      setTeacherData(res);
  }
  useEffect(() => {
    const storedData = localStorage.getItem('teacherInfo');
    console.log(storedData)
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        getTeachers(parsedData?.ID);
        setIdStudent(parsedData?.ID)
    }
  }, [])
  console.log(teacher);
  const navigate = useNavigate(); 

  const handleGoBack = () => {
    navigate(-1); 
  };
  const [profileFileList, setProfileFileList] = useState<UploadFile[]>([]);
  const [backgroundFileList, setBackgroundFileList] = useState<UploadFile[]>([]);
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const onChangeProfile: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setProfileFileList(newFileList);
    if (newFileList.length > 0) {
      setUploadDisabled(true);
    }
  };

  const onChangeBackground: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setBackgroundFileList(newFileList);
    if (newFileList.length > 0) {
      setUploadDisabled(true);
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const imgWindow = window.open('', '_blank');
  imgWindow?.document.write(`<img src="${src}" alt="Preview" />`);
  };
  const [profile, setProfile] = useState<TeachersInterface>()
  const [messageApi, contextHolder] = message.useMessage();
  const id: number = 1;
  const onFinish = async (values: TeachersInterface) => {
    if (profileFileList.length > 0 && profileFileList[0].thumbUrl) {
      values.Profile_Pic = profileFileList[0].thumbUrl;
    }
    if (backgroundFileList.length > 0 && backgroundFileList[0].thumbUrl) {
      values.Background_Pic = backgroundFileList[0].thumbUrl;
    }
    console.log(values)
    let res = await UpdateTeachersById(idStudent, values);
    console.log(res);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
        
      });
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    } else {
      messageApi.open({
        type: "error",
        content: "บันทึกข้อมูลไม่สำเร็จ",
      });
    }
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    setProfile(e?.fileList[0])
    console.log(e?.fileList[0])
    return e?.fileList;
  };

    return (
        <div className="element3">
            <div className="background">
            {<Manutab/>}
              <div className="overlap">
                <div className="overlap-group">
                <div className="rectangle-2" >
                            {teacher.map((teac, index) => (
                                    <Image
                                    key={index}
                                    className="backgroundpc"
                                    src={teac.Background_Pic}
                                    />
                            ))}
                            </div>
                        <div className="ellipse" >
                            {teacher.map((teac, index) => (
                                    <Image
                                    key={index}
                                    className="profilepc"
                                    id="gom"
                                    src={teac.Profile_Pic}
                                    />
                            ))}
                        </div>
                        {teacher.map (teac=> (
                          <div className="name-lastname">{teac.FirstName}&nbsp;&nbsp; {teac.LastName} </div>
                        ))}
                        {teacher.map (teac=> (
                          <div className="ininformation">{teac.Infomation}</div>
                        ))}
                    </div>
              </div>
              <div className="rectangle-3" >
              <button onClick={handleGoBack} className="button1" id="position1">กลับ</button>
              <Form name="basic"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off">
                  {contextHolder}
                <Form.Item className="block1" >
                  <Button type="primary" htmlType="submit"  className="button" id="position">บันทึก</Button>
                </Form.Item>
                  <div className="text" id="position3" >+ Name And Infomation</div>
                  
                  <div className="block" >
                    <Form.Item name="FirstName">
                      <Input className="name"  placeholder="name" required/>
                    </Form.Item>
                    <Form.Item name="LastName">
                      <Input className="name"  placeholder="Lastname" required/>
                    </Form.Item>
                    <Form.Item  name="Infomation">
                      <Input className="information"  placeholder="Information" required/>
                    </Form.Item>
                  </div>
                  <div className="khob"></div>
                  <div className="text" id="position4" >+ Profile Pictuer</div>
                  <Form.Item name="Profile_Pic" valuePropName="fileList" getValueFromEvent={normFile}>
                    <ImgCrop rotationSlider>
                      <Upload
                        className="picture" 
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        listType="picture-card"
                        fileList={profileFileList}
                        onChange={onChangeProfile}
                        onPreview={onPreview}
                        
                      >
                        {profileFileList.length < 1 && '+ Upload'}
                      </Upload>
                    </ImgCrop>
                  </Form.Item>
                  
                  <div className="khob1"></div>
                  <div className="text" id="position5" >+ Background Pictuer</div>
                  <Form.Item name="Background_Pic" valuePropName="fileList" getValueFromEvent={normFile} >
                    <ImgCrop aspectSlider>
                      <Upload
                        className="picture1" 
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        listType="picture-card"
                        fileList={backgroundFileList}
                        onChange={onChangeBackground}
                        onPreview={onPreview}
                      >
                        {backgroundFileList.length < 1 && '+ Upload'}
                      </Upload>
                    </ImgCrop>
                  </Form.Item>
                  
                  </Form>
              </div>
            </div>
        </div>
      
    );
  };
  export default EditT;