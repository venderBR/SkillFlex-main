import React, { useState, useEffect } from "react";
import {
  Space,
  Modal,
  ConfigProvider,
  Button,
  Form,
  Input,
  message,
  Upload,
  Layout,
} from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";
import { GetLatestUnit,} from "../../../services/https/indexforCreate";
import { BrowserRouter as Router,Routes,Route,Link,} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Menutab from "../../../components/Manutab_upCourse";
import { CreateUnit , CreateMaterial } from "../../../services/https/indexforCreate";
import "./style.css";
import { UnitsInterface } from "../../../../interfaces/IUnitCreate";
import { MaterialInterface } from "../../../../interfaces/IMaterialCreate";
const { Header} = Layout;
const { TextArea } = Input;



const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 350,
  paddingInline: "0px",
  lineHeight: "64px",
  backgroundColor: "#F0F3F8",
  width:'100vw'
};



function AddUnist() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const toScreen = async () =>{
    localStorage.removeItem('course_lastest');
    setTimeout(function () {
      navigate("/profileT"); 
    }, 2000);
  }

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);


  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("Change:", e.target.value);
  };

  // Text from the database
  const textFromDatabase =
    "นี่คือข้อความที่มาจากฐานข้อมูล และมีความยาวเกิน 50 ตัวอักษรที่จะต้องตัดเป็นส่วนๆ";

  // Split the text into parts not exceeding 20 characters
  const textParts = [];
  for (let i = 0; i < textFromDatabase.length; i += 50) {
    const part = textFromDatabase.substring(i, i + 50);
    textParts.push(part);
  }



  const [myData, setMyData] = useState<{ ID: number,Name: string,Description:string} | null>(null);

  // อ่านข้อมูลจาก local storage เมื่อแอพพลิเคชั่นเริ่มต้น
  useEffect(() => {
    const storedData = localStorage.getItem('course_lastest');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setMyData(parsedData);
    }
  }, []);

  const [description, setDescription] = useState("");

  useEffect(() => {
    // ตัดคำหรือแสดงเฉพาะบางส่วนของข้อความ
    let newValue = myData?.Description || "";
    if (newValue.length > 160) {
        newValue = newValue.substring(0, 40) + "\n"  + newValue.substring(40, 100)+"\n"+newValue.substring(101, 160)+"...\n";
    }
    setDescription(newValue);
  }, [myData]);

  
  const [unit, setUnit] = useState(1);
  const [formData, setFormData] = useState({});
  const [showExitUploadButton, setShowExitUploadButton] = useState(false);


  const [form] = Form.useForm();

  const handleShowModalAndCreateUnit = async () => {
    showModal();
    const values = {}; 
    createUnit(values);
  };
  
  const createUnit = async (values: UnitsInterface) => {
    values.Description = form.getFieldValue("Description");
    values.Name = form.getFieldValue("Name");
    values.Order = unit;
    values.Course_ID = myData?.ID;
    let res = await CreateUnit(values);
    console.log(myData?.ID);
    
    console.log(res);

    if (res.status) {
      if (values.Order > 1) {
        setShowExitUploadButton(true);
      } else {
        setShowExitUploadButton(false);
      }
    }
  };
  
  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const handleOk = () => {
    const values = {};
    if( form.getFieldValue("VideoPath") != '' && form.getFieldValue("VideoPath1") != ''){
      createMaterial(values);
      createMaterial2(values);
    }
    if(form.getFieldValue("VideoPath") == '' && form.getFieldValue("VideoPath1") != ''){
      createMaterial2(values);
    }
    if(form.getFieldValue("VideoPath") != '' && form.getFieldValue("VideoPath1") == ''){
      createMaterial(values);
    }       
    setIsModalVisible(false);
    setTimeout(function () {
      form.resetFields();
      setFormData({});
      setUnit(unit + 1);
    }, 1000);
    messageApi.open({
      type: "success",
      content: "Success",
    });
  };


  const createMaterial = async (values: MaterialInterface) => {
    const get_lastunit = await GetLatestUnit(myData?.ID);
    values.Unit_ID = get_lastunit.ID;
    values.VideoPath = form.getFieldValue("VideoPath");
    console.log(values);
    console.log(get_lastunit.ID);
    let res = await CreateMaterial(values);
    if (res.status) {
      if (form.getFieldValue("VideoPath1") !== '') {
        const get_lastunit = await GetLatestUnit(myData?.ID);
        values.Unit_ID = get_lastunit.ID;
        values.VideoPath = form.getFieldValue("VideoPath1");
        console.log("VideoPath1");
      }
    } else {
      messageApi.open({
        type: "error",
        content: "Error",
      });
    }
  };
  
  const createMaterial2 = async (values: MaterialInterface) => {
    const get_lastunit = await GetLatestUnit(myData?.ID);
    values.Unit_ID = get_lastunit.ID;
    values.VideoPath = form.getFieldValue("VideoPath1");
    console.log(values);
    console.log(get_lastunit.ID);
    let res = await CreateMaterial(values);
    if (res.status) {
      // แจ้งเตือนถูกลบออก
    } else {
      messageApi.open({
        type: "error",
        content: "บันทึกข้อมูลไม่สำเร็จ",
      });
    }
  };


  const onFinish = async () => {
    if (unit > 2) {
      setShowExitUploadButton(true);
    } else {
      setShowExitUploadButton(false);
    }
  };
  

  return (
    <div className="layout88" style={{height:'1050px'}}>
      {contextHolder}
      <Form form={form} onFinish={onFinish} >
        <Menutab></Menutab>
        <Header style={headerStyle}  >
          <div>
            <Button
              type="link"
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "black",
                right: "615px",
                top: "80px",
                width:'100vw'
              }}
            >
            {myData ? (<span>{myData.Name}</span>) : (<p>ไม่มีข้อมูล myData ใน local storage</p>)}
            </Button>

          </div>
          <div
            style={{
              marginTop: "80px",
              marginRight: "1000px",
            }}
          >
          <div style={{lineHeight: "1.5",fontSize: "21px",whiteSpace: "pre-line", textAlign: 'left',paddingLeft:'97px'}}> {description}</div> 
          </div>

          <ConfigProvider
            theme={{
              token: {
                colorBgContainerDisabled: "#E96479",
                colorTextDisabled: "white",
              },
            }}
          >
            <Button
              type="primary"
              disabled
              style={{
                left: "-32%",
                top: "45px",
                fontSize: "30px",
                padding: "00px 30px",
                width: "200px",
                height: "50px",
                fontWeight: "bold",
              }}
            >
              Enroll
            </Button>
          </ConfigProvider>
          <span
            style={{
              position : "absolute",
              display: "flex",
              alignItems: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#4D455D",
              left: "100px",
              top:"55%"
            }}
          >
            Unit {unit} :{" "}
            
              <ConfigProvider
                theme={{
                  token: {
                    borderRadius: 10,
                    colorBgContainer: "#F0F3F8",
                    colorPrimaryHover: "#E96479",
                    colorTextPlaceholder: "#E96479",
                  },
                }}
              ><Form.Item name="Name" rules={[{ required: true }]} style={{ marginLeft: "10px" }}>
                <Input
                  placeholder=""
                  style={{
                    width: "350px",
                    height: "70px",
                    position: "absolute",
                    left:"15%",
                    top:"37%"
                  }}
                /></Form.Item>

                
                <p className="blockU"><Form.Item name="VideoPath" rules={[{ required: true }]}>
                <Input
                  placeholder=""
                  style={{
                    width: "300px",
                    height: "50px",
                  }}/>
                  </Form.Item>
                </p>

                <div className="blockU1"> <Form.Item name="VideoPath1">
                <Input
                  placeholder=""
                  style={{
                    width: "300px",
                    height: "50px",
                  }}/>
                  </Form.Item>
                </div>

              </ConfigProvider>
            
            

            <span
              style={{
                display: "flex",
                fontSize: "23px",
                fontWeight: "bold",
                color: "#4D455D",
                position: "absolute",
                left: "850%",
                top: "10%",
                width: "200px"
              }}
            >
              Upload Video:
            </span>
            
          </span>
          <div
            style={{
              position: 'absolute',
              alignItems: "center",
              fontSize: "23px",
              fontWeight: "bold",
              color: "#4D455D",
              width:"250px",
              left : "5%",
              top: "76%"

            }}
          >
            Description of unit : &nbsp;
          </div>
          
            <ConfigProvider
              theme={{
                token: {
                  borderRadius: 10,
                  colorBgContainer: "#F0F3F8",
                  colorPrimaryHover: "#E96479",
                },
              }}
            ><Form.Item name="Description" className="block1"rules={[{ required: true }]} >
              <TextArea
                name="Description"
                autoSize={{ minRows: 5, maxRows: 10 }}
                style={{
                  height: 400,
                  resize: "none",
                  width: "650px",
                  right:'480px',
                  position: "absolute",
                  top: "1000%",
                  left: "17%",
                }}
                onChange={onChange}
                placeholder=""
              /></Form.Item>
            </ConfigProvider>
          
         
        </Header>

        <Space>
        <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#4D455D",
              },
            }}
          >
          <Link to = "/">           
          {showExitUploadButton && (
              <Button 
              
                type="primary"
                style={{
                  fontSize: "20px",
                  padding: "00px 30px",
                  width: "200px",
                  height: "50px",
                  fontWeight: "bold",
                  left: "1000px",
                  top: "348px",
                }}
              onClick={() => {toScreen()}}
              >
                Exit Upload
              </Button>
            )}</Link>  
            </ConfigProvider>
          <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#E96479",
          },
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleShowModalAndCreateUnit}
          
          style={{
            fontSize: "20px",
            padding: "00px 30px",
            width: "200px",
            height: "50px",
            fontWeight: "bold",
            left: "1200px",
            top: "370px",
          }}
        >
          Add more units
        </Button>
      </ConfigProvider>

      <Modal
        title="Confirm Action"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Do you want to add more units?</p>
      </Modal>
    </div>
        </Space>
        {myData && (
            <Form.Item
              name="Course_ID" 
              initialValue={myData.ID}
            >
            </Form.Item>
          )}
        <Form.Item name="Order" initialValue={unit} ></Form.Item>
          
        
      </Form>
    </div>
  );
}

export default AddUnist;
