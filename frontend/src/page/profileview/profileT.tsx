import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import {Link, Navigate, useParams} from "react-router-dom";
import NavBar from "../../components/navBar/navBar";
import { Card,List } from 'antd';
import { Image } from 'antd';
import { useEffect, useState } from "react"
import { TeachersInterface } from "../../../interfaces/ITeacher";
import { GetApprovedCoursesByID, GetTeacherById } from "../../services/https/index";
import { CoursesInterface } from "../../../interfaces/course";
import { GetCourseById} from '../../services/https/indexforCreate';
import Manutab from "../../components/Manutab_upCourse";
const { Meta } = Card;

export const Profilet = (): JSX.Element => {
        const [teacher, setTeacherData] = useState<TeachersInterface[]>([]);
        const [course,SetCourse]= useState<CoursesInterface[]>([]);
        const getTeachers = async (id: number) => {
            let res = await GetTeacherById(id); // แทนที่ GetStudentById ด้วยฟังก์ชันการเรียก API จริง
            if (!Array.isArray(res)) {
                // ถ้า res ไม่ใช่ array ให้แปลงเป็น array โดยใส่ res ใน array ใหม่
                res = [res];
            }
            setTeacherData(res);
        }
        const getCourses = async (id: number) => {
            let res = await GetApprovedCoursesByID(id); // แทนที่ GetStudentById ด้วยฟังก์ชันการเรียก API จริง
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
        console.log(course);
        const sliceDesc = (desc: string) => {
            let text = "";
            if(desc.length > 50){
                text = desc.substring(0, 40) + "..."
            }
            return(text);
        }
        const navigate = useNavigate(); 
        const handleGoto = async (id : number | undefined) => {
            console.log(id)
            
            const getCourse = await GetCourseById(id); 
            const courseInfo = JSON.stringify(getCourse);
            localStorage.setItem("courseInfo", courseInfo);
            navigate(`/course/`);

        };
        
    return (
        <div className="element1">
            <div className="background">
            {<Manutab/>}
                <div className="registter">
                    <Link to="/home"><div className="textBack">&lt;-- กลับหน้าหลัก</div></Link>
                </div>
                <div className="overlap">
                    <div className="overlap-group">
                        <div className="rectangle-2" >
                            {teacher.map((teac, index) => (
                                <div key={index}>
                                    <Image
                                    className="backgroundpc"
                                    src={teac.Background_Pic}
                                    />
                                </div>
                            ))}
                            </div>
                        <div className="ellipse" >
                            {teacher.map((teac, index) => (
                                <div key={index}>
                                    <Image
                                    className="profilepc"
                                    id="gom"
                                    src={teac.Profile_Pic}
                                    />
                                </div>
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
                    <div className="courselist">Course</div>
                    <div className="card-container">
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
export default Profilet;