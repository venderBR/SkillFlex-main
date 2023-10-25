import React,{useEffect, useState} from 'react';
import { Card,Image  } from 'antd';
import { ReadFilled} from '@ant-design/icons';
import  Manutab  from '../../components/Manutab';
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router,Routes,Route,Link,useParams} from "react-router-dom";
import { CoursesInterface } from '../../../interfaces/course';
import { StudentInterface } from '../../../interfaces/IStudent';
import { UnitsInterface } from '../../../interfaces/IUnitCreate';
import { MaterialInterface } from '../../../interfaces/IMaterialCreate';
import { StatusInterface } from '../../../interfaces/status';
import { ConfigProvider,Tabs,TabsProps } from 'antd';
import { ApprovedCoursesInterface } from '../../../interfaces/IApprove';
import { CoursesInfoByID,CoursesInfoByIDstudents,CoursesInfoByIDunits,CoursesInfoByIDmaterials,CoursesInfoByIDstatus,CoursesInfoByIDByApprove,GetCourseById} from '../../services/https/indexforCreate';
import './styleofT.css'

const onChange = (key: string) => {
  console.log(key);;
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: (<Link to="/course" style={{ color: '#4D455D'}}>Course</Link>),
    forceRender: false,
  },
  {
    key: '2',
    label: (<Link to="/student" style={{ color: '#4D455D'}}>Student</Link>),
    forceRender: true,
    
  }
];

const Course: React.FC = () => {
  // const [teacher, setTeacherData] = useState<TeachersInterface[]>([]);
  const [course,SetCourse]= useState<CoursesInterface[]>([]);
 
  const [students,SetStudents]= useState<StudentInterface[]>([]);
  const [materials,SetMaterial]= useState<MaterialInterface[]>([]);
  const [unit,Setunits]= useState<UnitsInterface[]>([]);
  const [status,SetStatus]= useState<StatusInterface[]>([]);
  const [description,SetDescription]= useState<ApprovedCoursesInterface[]>([]);

  const [Course,setIDCourse] = useState<{ ID: number ,Name : string, Image:string} | undefined>(undefined);
  

  useEffect(() => {
    const storedData = localStorage.getItem('courseInfo');
  
        console.log(storedData)
        if (storedData) {
            const parsedData = JSON.parse(storedData);           
              setIDCourse(parsedData);
              getStudents(parsedData?.ID);
              getCourses(parsedData?.ID);
              getMaterials(parsedData?.ID);
              getunits(parsedData?.ID);
              getStatus(parsedData?.ID);
              getDescription(parsedData?.ID);
  
        }
        
  }, [])
  // const {id} = useParams();
  const getDescription = async (id: number) => {
    
    let res = await CoursesInfoByIDByApprove(id); // แทนที่ GetStudentById ด้วยฟังก์ชันการเรียก API จริง
    console.log(res);
    if (!Array.isArray(res)) {
        // ถ้า res ไม่ใช่ array ให้แปลงเป็น array โดยใส่ res ใน array ใหม่
        res = [res];
    }
    SetDescription(res);
}

  const getunits = async (id: number) => {
    let res = await CoursesInfoByIDunits(id); // แทนที่ GetStudentById ด้วยฟังก์ชันการเรียก API จริง
    console.log(res);
    if (!Array.isArray(res)) {
        // ถ้า res ไม่ใช่ array ให้แปลงเป็น array โดยใส่ res ใน array ใหม่
        res = [res];
    }
    Setunits(res);
}

const getStatus = async (id: number) => {
  let res = await CoursesInfoByIDstatus(id); // แทนที่ GetStudentById ด้วยฟังก์ชันการเรียก API จริง
  console.log(res);
  if (!Array.isArray(res)) {
      // ถ้า res ไม่ใช่ array ให้แปลงเป็น array โดยใส่ res ใน array ใหม่
      res = [res];
  }
  SetStatus(res);
}

const getMaterials = async (id: number) => {
    let res = await CoursesInfoByIDmaterials(id); // แทนที่ GetStudentById ด้วยฟังก์ชันการเรียก API จริง
    console.log(res);
    if (!Array.isArray(res)) {
        res = [res];
    }
    SetMaterial(res);
}
  const getStudents = async (id: number) => {
    let res = await CoursesInfoByIDstudents(id); 
    console.log(res);
    if (!Array.isArray(res)) {
        res = [res];
    }
    SetStudents(res);
}

const getCourses = async (id: number) => {
    let res = await CoursesInfoByID(id); 
    console.log(res.ID);
    if (!Array.isArray(res)) {
        res = [res];
    }
    SetCourse(res);
}
console.log(course)
const navigate = useNavigate(); 
const handleGoBack = () => {
  navigate(-1); 
};


  return (
    <div style={{height:"1050px"}} className='layoutOfteacher'>
      <Manutab></Manutab>
            <ConfigProvider
              theme={{
                components: {
                  Tabs: {
                    itemHoverColor:'#E96479',
                    colorPrimary: '#E96479',
                    fontSize: 23,
                    colorBorder:'#4D455D',
                    colorPrimaryHover:'#E96479',
                                      
                        },
                            },
                  }}
            >
            <Tabs defaultActiveKey="1" 
                  items={items} 
                  onChange={onChange}
                  tabBarGutter={70}
                  className='tabselect'
                  destroyInactiveTabPane={true}
                  style={{ paddingTop: '175px' }}       
            />
          </ConfigProvider>
      <div style={{paddingTop: '280px'}}>
          <Card style={{ background:'#F0F3F8',width: 500,height:650, borderRadius:'70px',left:'65%',position:'absolute',top: '330px',fontSize:'25px',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ReadFilled style={{color:'#E96479',fontSize:'270px'}}/>
            <p className="bold-italic1">Hello!!</p>
            <p className="bold-italic1">Welcome to SkillFlex!</p>
          </Card>
          
      </div>
      
      
      <div style={{ display: 'flex', paddingLeft: '200px', fontSize: '18px', marginTop: '-110px' }}>
        <span>
        
            <Image
              width={300}
              height={350}
              src={Course && Course?.Image}
            />
        </span>
      </div>
      < div style={{ fontWeight:'bold',paddingLeft: '600px', fontSize: '25px', marginTop: '-420px',lineHeight:'60px'}}>
      
      <div style={{ fontSize: '30px', marginLeft: '-400px' }}>Course Name: {Course && Course.Name}</div>
   
        
        <div style={{marginTop:'10px'}}>Number of Units : {unit.length}</div>
        <div >Number of Video : {materials.length}</div>
        <div >Number of Student : {students.length}</div>
        {status.map((item, index) => ( <div key={index}>Status : {item.Name}</div>))} 
        {description.map((item, index) => ( <div key={index}>Description from Admin : {item.Description}</div>))} 
        
      
      </div>
        <button onClick={handleGoBack} className="text11" id="home11">BACK</button>



    </div>
  );
};
export default Course;


