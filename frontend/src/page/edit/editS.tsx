import React from "react";
import {Input } from "antd";
import { Image } from 'antd';
import "./styleE.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/navBar";
import { Card } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Upload,Progress,Form,message,Button } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/lib/upload/interface';
import { useEffect, useState } from "react"
import { StudentInterface } from "../../../interfaces/IStudent";
import { GetStudentsById, UpdateStudentsById } from "../../services/https/index";
const { Meta } = Card;

export const EditS = (): JSX.Element => {
  const [student, setStudentData] = useState<StudentInterface[]>([]);
  const [idStudent,setIdStudent] = useState<number>();
  
  const getStudent = async (id: number) => {
      let res = await GetStudentsById(id); // แทนที่ GetStudentById ด้วยฟังก์ชันการเรียก API จริง
      console.log(res);
      if (!Array.isArray(res)) {
          // ถ้า res ไม่ใช่ array ให้แปลงเป็น array โดยใส่ res ใน array ใหม่
          res = [res];
      }
      setStudentData(res);
      
  }
  useEffect(() => {
    const storedData = localStorage.getItem('studentInfo');
    console.log(storedData)
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        getStudent(parsedData?.ID);
        setIdStudent(parsedData?.ID)
        
        console.log(idStudent);
    }
  }, [idStudent])
  const navigate = useNavigate(); 

  const handleGoBack = () => {
    navigate(-1); 
  };
  console.log(idStudent);
  const [profileFileList, setProfileFileList] = useState<UploadFile[]>([]);
  const [backgroundFileList, setBackgroundFileList] = useState<UploadFile[]>([]);
  const [uploadDisabled, setUploadDisabled] = useState(false);

  const onChangeProfile: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const newProfileFile = newFileList[0];
    console.log(newProfileFile);
    // Check if there's a new profile file and it has a thumbUrl
    if (newProfileFile && newProfileFile.thumbUrl) {
      console.log(newProfileFile.thumbUrl);
    }
  
    setProfileFileList(newFileList);
  
    if (newFileList.length > 0) {
      setUploadDisabled(true);
    }
  };
  const onChangeBackground: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const newBackgroundFile = newFileList[0];
    console.log(newBackgroundFile);
  
    // Check if there's a new background file and it has a thumbUrl
    if (newBackgroundFile && newBackgroundFile.thumbUrl) {
      console.log(newBackgroundFile.thumbUrl);
    }
  
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
    // Check if there's a thumbUrl for the profile picture
    if (file.thumbUrl) {
      // Use the thumbUrl for preview or export as needed
      src = file.thumbUrl;
      console.log(src)
    }
  
    const imgWindow = window.open('', '_blank');
    imgWindow?.document.write(`<img src="${src}" alt="Preview" />`);
  };
  const [profile, setProfile] = useState<StudentInterface>()
  const [messageApi, contextHolder] = message.useMessage();
  
  
  const onFinish = async (values: StudentInterface) => {
      // Add the thumbUrls to the values object if available
      
    if (profileFileList.length > 0 && profileFileList[0].thumbUrl) {
      values.Profile_Pic = profileFileList[0].thumbUrl;
    }
    if (backgroundFileList.length > 0 && backgroundFileList[0].thumbUrl) {
      values.Background_Pic = backgroundFileList[0].thumbUrl;
    }
    
    console.log(values);
    let res = await UpdateStudentsById(idStudent, values);
    console.log(res.message);
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
              {<NavBar currentPage="editS" />}
              <div className="overlap">
                <div className="overlap-group">
                 <div className="rectangle-2" >
                            {student.map((stu, index) => (
                          
                                    <Image
                                    key={index}
                                    className="backgroundpc"
                                    src={stu.Background_Pic}
                                    />
                            ))}
                            </div>
                        <div className="ellipse" >
                            {student.map((stu, index) => (
                                    <Image
                                    key={index}
                                    className="profilepc"
                                    id="gom"
                                    src={stu.Profile_Pic}
                                    />
                            ))}
                        </div>
                        {student.map (stu=> (
                            <div className="name-lastname">{stu.FirstName}&nbsp;&nbsp; {stu.LastName} </div>
                        ))}
                        {student.map (stu=> (
                            <div className="ininformation">{stu.Infomation}</div>
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
  export default EditS;