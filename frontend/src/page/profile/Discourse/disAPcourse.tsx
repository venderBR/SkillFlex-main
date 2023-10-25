import React from "react";
import {  Divider} from "antd";
import "./style.css";
import { Link ,useNavigate} from "react-router-dom";
import NavBar from "../../../components/navBar/navBar";
import { Card,List } from 'antd';
import { Image } from 'antd';
import { useEffect, useState } from "react"
import { TeachersInterface } from "../../../../interfaces/ITeacher";
import { GetTeacherById,GetDisapprovedCoursesByID } from "../../../services/https/index";
import { CoursesInterface } from "../../../../interfaces/course";
import { GetCourseById} from '../../../services/https/indexforCreate';
import Manutab from "../../../components/Manutab_upCourse";


const { Meta } = Card;
export const TeacherEDis = (): JSX.Element => {
    const [teacher, setTeacherData] = useState<TeachersInterface[]>([]);
    const [course,SetCourse]= useState<CoursesInterface[]>([]);
    const navigate = useNavigate();
    const getTeachers = async (id: number) => {
        let res = await GetTeacherById(id); // แทนที่ GetStudentById ด้วยฟังก์ชันการเรียก API จริง
        if (!Array.isArray(res)) {
            // ถ้า res ไม่ใช่ array ให้แปลงเป็น array โดยใส่ res ใน array ใหม่
            res = [res];
        }
        setTeacherData(res);
    }
    const getCourses = async (id: number) => {
        let res = await GetDisapprovedCoursesByID(id); // แทนที่ GetStudentById ด้วยฟังก์ชันการเรียก API จริง
        console.log(res);
        if (!Array.isArray(res)) {
            // ถ้า res ไม่ใช่ array ให้แปลงเป็น array โดยใส่ res ใน array ใหม่
            res = [res];
        }
        SetCourse(res);
    }
    useEffect(() => {
        const storedData = localStorage.getItem('teacherInfo');
                console.log(storedData)
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    getTeachers(parsedData?.ID);
                    getCourses(parsedData?.ID);
                }
    }, [])
    console.log(teacher);
    const sliceDesc = (desc: string) => {
        let text = desc;
        if(desc.length > 50){
            text = desc.substring(0, 40) + "..."
        }
        return(text);
    }
    const handleGoto = async (id : number | undefined) => {
        console.log(id)
        navigate(`/course/`);
        const getCourse = await GetCourseById(id); 
        const courseInfo = JSON.stringify(getCourse);
        localStorage.setItem("courseInfo", courseInfo);
        setTimeout(function () {
            window.location.reload();
        }, 100);

    };
    
    return (
        <div className="element22">
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
                
                <Divider className="courselist" orientation="left" >Disapproved Course</Divider>
                    <div className="block" id="home" >
                    <Link to="/profileT" className="text">BACK</Link>
                    </div>
                    <div className="card-container1">
                    <List 
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={course}
                        renderItem={(item) => (
                        <List.Item>
                                <Card
                                    
                                    key={item.ID}
                                    hoverable
                                    cover={<img alt="example" src={item.Image} />}
                                    onClick={() => handleGoto(item.ID)}
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
export default TeacherEDis;