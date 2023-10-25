import React,{useEffect,useState} from 'react';

//const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
import { Card , ConfigProvider,Tabs,TabsProps} from 'antd';
import { ReadFilled } from '@ant-design/icons';
import  Manutab  from '../../components/Manutab';
import { BrowserRouter as Router,Routes,Route,Link,} from "react-router-dom";
import { StudentInterface } from '../../../interfaces/IStudent';
import { CoursesInfoByIDstudents ,GetCourseById} from '../../services/https/indexforCreate';
import { Table } from 'antd';
import type { ColumnsType} from 'antd/es/table';

const nbsp = '\u00a0'.repeat(90);
const columns: ColumnsType<StudentInterface> = [
  {
    title: 'Name',
    dataIndex: 'FirstName',
    width: '30%',
  },
  {
    title: 'LastName',
    dataIndex: 'LastName',
    width: '30%',
  },
];


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
]

const Student: React.FC = () => {
  const [students,SetStudents]= useState<StudentInterface[]>([]);
  console.log(students)
  const getCourses = async (id: number) => {
      let res = await CoursesInfoByIDstudents(id); // แทนที่ GetStudentById ด้วยฟังก์ชันการเรียก API จริง
      console.log(res);
      if (!Array.isArray(res)) {
          // ถ้า res ไม่ใช่ array ให้แปลงเป็น array โดยใส่ res ใน array ใหม่
          res = [res];
      }
      SetStudents(res);
  }
  useEffect(() => {
    
      const storedData = localStorage.getItem('courseInfo');
          console.log(storedData)
          if (storedData) {
              const parsedData = JSON.parse(storedData);
              getCourses(parsedData?.ID);
          }
  }, [])
  
  return (
    <div style={{height:"1050px"}}> 
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
            <Tabs defaultActiveKey="2" 
                  items={items} 
                  onChange={onChange}
                  tabBarGutter={70}
                  className='tabselect'
                  destroyInactiveTabPane={true}
                  style={{ paddingTop: '175px' }}       
            />
          </ConfigProvider>
              <div className='front_YourCourse' style={{fontSize:'22px',paddingTop: '20px'}}>
          <span  style={{ marginLeft: '70px' }}>Your Student</span>{nbsp} 

      </div>
         <div>
         <div style={{background:'black',height:'2px',marginTop:'20px',alignItems:'center',width:'923px',marginLeft:'70px'}}></div>
         
          <div >
          <Table  columns={columns} dataSource={students}   style={{ width: '61%',paddingLeft:'70px' }}/>
          </div>
        
         <div style={{paddingTop: '280px'}}>
          <Card style={{ background:'#F0F3F8',width: 500,height:650, borderRadius:'70px',left:'65%',position:'absolute',top: '330px',fontSize:'25px',display: 'flex', justifyContent: 'center', alignItems: 'center',fontWeight:'bold',fontStyle:'italic'}}>
          <ReadFilled style={{color:'#E96479',fontSize:'270px'}}/>
            <p className="bold-italic">Hello!!</p>
            <p className="bold-italic">Welcome to SkillFlex!</p>
            
          </Card> 
        </div>

        


        </div>
    </div>
  );
};
export default Student;

