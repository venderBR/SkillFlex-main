import React from "react";
import { Divider} from "antd";
import "./style.css";
import { Link , useNavigate} from "react-router-dom";
import NavBar from "../../components/navBar/navBar";
import { Card,List } from 'antd';
import { Image } from 'antd';
import { useEffect, useState } from "react"
import { StudentInterface } from "../../../interfaces/IStudent";
import { GetStudentsById,GetEnrollByID } from "../../services/https/index";
import { CoursesInterface } from "../../../interfaces/course";

const { Meta } = Card;

export const StudentE = (): JSX.Element => {
    const [student, setStudentData] = useState<StudentInterface[]>([]);
    const [course,SetCourse]= useState<CoursesInterface[]>([]);
    const getStudent = async (id: number) => {
        let res = await GetStudentsById(id); // แทนที่ GetStudentById ด้วยฟังก์ชันการเรียก API จริง
        if (!Array.isArray(res)) {
            // ถ้า res ไม่ใช่ array ให้แปลงเป็น array โดยใส่ res ใน array ใหม่
            res = [res];
        }
        setStudentData(res);
    }
    const getCourses = async (id: number) => {
        let res = await GetEnrollByID(id); // แทนที่ GetStudentById ด้วยฟังก์ชันการเรียก API จริง
        console.log(res);
        if (!Array.isArray(res)) {
            // ถ้า res ไม่ใช่ array ให้แปลงเป็น array โดยใส่ res ใน array ใหม่
            res = [res];
        }
        SetCourse(res);
    }

    useEffect(() => {
        const storedData = localStorage.getItem('studentInfo');
                // console.log(storedData)
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    getStudent(parsedData?.ID);
                    getCourses(parsedData?.ID);
                }
    }, [])
    console.log(student);
    console.log(course);
    const sliceDesc = (desc: string) => {
        let text = desc;
        if(desc.length > 50){
            text = desc.substring(0, 40) + "..."
        }
        return(text);
    }

    
    const navigate = useNavigate();
    const onMenuClick = (courseid: string) => {
        navigate(`/courseDashboard/${courseid}`);
    };
    
    
    return (
        <div className="element2">
            <div className="background">
            {<NavBar currentPage="profilestudent" />}
                <div className="overlap">
                    <div className="overlap-group">
                    <div className="rectangle-2" >
                            {student.map((stu, index) => (
                                    <Image 
                                    style={{width:'100%',height:'100%'}}
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
                    <Divider className="courselist" orientation="left" >My Course</Divider>
                    <div className="block" id="home" >
                    <Link to="/home" className="text">HOME</Link>
                    </div>
                    <div className="block" id="home1" >
                        <Link to="/profileS/edit" className="text" id="edit" >EDIT PROFILE</Link>
                    </div>
                    <div className="card-container1">
                    <List 
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={course}
                        renderItem={(item) => (
                        <List.Item>
                                <Card
                                    onClick={() => onMenuClick(String(item.ID))}
                                    key={item.ID}
                                    hoverable
                                    cover={<img alt="example" src={item.Image} />}
                                    >
                                    <Meta title={item.Name} description={sliceDesc(String(item.Description))} />
                                </Card>
                        </List.Item>
                        )}
                    />
                    
                    </div>
                    
                </div>
            </div>
        </div>
    
    );
};
export default StudentE;