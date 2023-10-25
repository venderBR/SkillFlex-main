import React, { useState, useEffect } from "react";
import { Space,Upload, Modal, ConfigProvider, Button,Image, Form, Input, message, Layout, Col, Checkbox ,Select} from "antd";
import { EditOutlined,PlusOutlined } from "@ant-design/icons";
import { CoursesInterface } from "../../../interfaces/course";
import { CreateCourse,GetLatestCourse ,GetCategory} from "../../services/https/indexforCreate";
import { useNavigate } from "react-router-dom";
import Menutab from "../../components/Manutab_upCourse";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { ImageUpload } from "../../../interfaces/IUpload";
import { CategorysInterface } from "../../../interfaces/ICategory";


const { Header, Content } = Layout;

const { TextArea } = Input;
const {Option} = Select;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 350,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "white",
  
};

function AddCourse() {
  const [myData, setMyData] = useState<{ ID: number} | null>(null);

  const [TextNameCourse, setModalTextNameCourse] = useState("Edit Course Name");
  const [CourseName, setButtonTextNameCourse] = useState("Course Name");
  const [openNameModal, setOpenNameModal] = useState(false);
  const [form] = Form.useForm(); 

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [confirmLoading, setConfirmLoading] = useState(false);






  useEffect(() => {
    const storedData = localStorage.getItem('teacherInfo');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setMyData(parsedData);
    }
  }, []);

  





  const onChange3 = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.length > 0) {
      const valueAtIndex0 = String(checkedValues[0]);
      console.log(valueAtIndex0)
      form.setFieldsValue({ 'Category': valueAtIndex0 });
    } else {
      form.setFieldsValue({ 'Category': undefined });
    }
  };

  const showModalName = () => {
    setOpenNameModal(true);
  };

  
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenNameModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenNameModal(false);
  };

  const handleModalTextChangeName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setModalTextNameCourse(e.target.value);
    setButtonTextNameCourse(e.target.value);
  };

  const [text, setText] = useState(""); // สร้าง state เพื่อเก็บข้อความที่ผู้ใช้ป้อน
  const [description, setDisplayedText] = useState(""); 

  const onChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = e.target.value;
    if (newValue.length > 50) {
      newValue = newValue.substring(0, 40) + "\n"  + newValue.substring(40, 100)+"\n"+newValue.substring(101, 160)+"...\n";
      
    }
    setText(newValue); 
  };

  useEffect(() => {
    setDisplayedText(text);
  }, [text]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      if (e.length > 1) {
        // แจ้งเตือนว่าห้ามเกิน 1 รูป
        message.error("Not use more 1 ");
        return e.slice(0, 1); // รับเฉพาะไฟล์แรกเท่านั้น
      }
      return e;
    }
    if (e?.fileList.length > 1) {
      // แจ้งเตือนว่าห้ามเกิน 1 รูป
      message.error("Not use more 1 ");
      setProfile(e?.fileList[0]);
      return [e?.fileList[0]]; // รับเฉพาะไฟล์แรกเท่านั้น
    }
    setProfile(e?.fileList[0]);
    return e?.fileList;
  };

  const onFinish = async (values: CoursesInterface) => {
    values.Image = profile?.thumbUrl;
    values.Category_ID = form.getFieldValue("Category_ID");
    let res = await CreateCourse(values);
    console.log(values);
    if (CourseName === "Course Name") {
      messageApi.open({
        type: "error",
        content: "Please change Course Name",
      })
    }
    else if (res.status) {
       const get_lastcourse = await GetLatestCourse(myData?.ID);
       const course_lastest = JSON.stringify(get_lastcourse);
       localStorage.setItem("course_lastest", course_lastest);
       messageApi.open({
         type: "success",
         content: "Success",
       });
       setTimeout(function () {
         navigate("/addunits"); 
       }, 2000);
     } else {
       messageApi.open({
         type: "error",
         content: "Error",
       });
     }
  };

  const [category, setCategoryData] = useState<CategorysInterface[]>([]);

  const getCategory = async () => {
      let res = await GetCategory(); 
      if (!Array.isArray(res)) {
          res = [res];
      }
      setCategoryData(res);
      console.log(res)
  }
  useEffect(() => {
      getCategory(); 
  }, [])
  console.log(category);


const [profile, setProfile] = useState<ImageUpload>()


  return (
    <div className="layoutUpLoad" style={{height:'1050px'}}>
      {contextHolder}
          <Form form={form} onFinish={onFinish}>
          <Header style={headerStyle}>
          <div>
            <Image.PreviewGroup
              items={[
              
                
              ]}
            >
              <Image
                style={{ width: '1778px', height: '350px', zIndex: -1 }}
                src={profile?.thumbUrl}
              />
            </Image.PreviewGroup>
          </div>
          <div style={{ marginTop: '-350px', position: 'relative' }}>
            <Menutab></Menutab>
          </div>
          <div style={{ position: 'relative' }}>

        <div>
          <Button
            type="link"
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "black",
              right: "615px",
              top: "80px",
            }}
            onClick={showModalName}
          >
            {CourseName}
            <EditOutlined />
            
          </Button>
          
          <Modal
            title="Edit Course Name"
            open={openNameModal}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <Form.Item name="Name">
              <Input
                type="text"
                value={TextNameCourse}
                onChange={handleModalTextChangeName}
              />
            </Form.Item>
          </Modal>
        </div>

    
    </div>

              <div>
                
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
                          right: "625px",
                          marginTop: "213px",
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
              </div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "570px",
              fontSize: "23px",
              fontWeight: "bold",
              color: "#4D455D",
              marginTop:'210px'
            }}
          >
            
            <Form.Item
              name="Description"
              rules={[
                { required: true, message: "กรุณากรอก Description" },
              ]}
            >
              <TextArea
                autoSize={{ minRows: 5, maxRows: 5 }}
                style={{ height: 200, resize: "none", width: "440px",fontSize:'16px' }}
                onChange={onChange2}
              />
            </Form.Item>
            
          </span>
          
          <div style={{ whiteSpace: "pre-line",lineHeight: "1.5",fontSize:'20px' ,top:'150px', textAlign: 'left',paddingLeft:'110px',position: 'absolute'}}>{description}</div>
        </Header>
        <div style={{ position: "absolute", right: "788px", fontSize: "23px", fontWeight: "bold", color: "#4D455D", top: "480px" }}>Description of Course : </div>
        <div style={{ position: "absolute", left: "138px", fontSize: "23px", fontWeight: "bold", color: "#4D455D", top: "480px" }}>Select category :
        <ConfigProvider
                  theme={{
                    token: {
                      colorBorder: "#B4B4B3",
                      colorPrimary: "#4D455D",
                      fontSize: 20,
                      colorText: "#4D455D",
                      colorBgContainer: "#F0F3F8",
                      controlHeight: 35,
                  
                    },
                  }}
                >
                  <Form.Item
                      style={{width:"300px",marginTop:'40px'}}
                      name="Category_ID"
                      rules={[{ required: true, message: 'Please pick a Category!' }]}
                    >
                      <Select allowClear>
                    {category.map((item) => (
                    <Option value={item.ID} key={item.Name}>{item.Name}</Option>
                  ))}
                </Select>
    
                  </Form.Item>
                </ConfigProvider>
        </div>
        <div style={{ position: "absolute", right: "200px", fontSize: "23px", fontWeight: "bold", color: "#4D455D", top: "480px" }}>Upload picture :
        <div style={{marginTop:'50px'}}>
        <Form.Item
                name="Image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                
              >
                <Upload maxCount={1} multiple={false} listType="picture-card"  >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item></div>
        </div>
        
          <div style={{ marginLeft: "639px", marginTop: "155px" }}>
            <Content>
                             
            </Content>
         
        </div>
        <Space>
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
              style={{ fontSize: "20px", padding: "00px 30px", width: "200px", height: "50px", fontWeight: "bold", left: "1350px", top: "-300px" }}
            >
              Create Course
            </Button>
          </ConfigProvider>
        </Space>
        <div>
          {myData && (
            <Form.Item
              name="Teacher_ID" 
              initialValue={myData.ID}
            >
            </Form.Item>
          )}
        </div>
      </Form>
    </div>
  );
}
export default AddCourse;
