import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import NavBar from "../../components/navBar/navBar";
import { Image } from 'antd';
import { useEffect, useState } from "react"
import { StudentInterface } from "../../../interfaces/IStudent";
import { GetStudentsById } from "../../services/https/index";

export const Profiles = (): JSX.Element => {
    const [student, setStudentData] = useState<StudentInterface[]>([]);
    const getStudent = async (id: number) => {
        let res = await GetStudentsById(id); // แทนที่ GetStudentById ด้วยฟังก์ชันการเรียก API จริง
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
        }
        
    }, [])
    console.log(student);


    
    
    return (
        <div className="element1">
            <div className="background">
            {<NavBar currentPage="profileViewstudent" />}
                <div className="registter">
                    <Link to="/home"><div className="textBack">&lt;-- กลับหน้าหลัก</div></Link>
                </div>
                <div className="overlap">
                    <div className="overlap-group">
                    <div className="rectangle-2" >
                        {student.map((stu, index) => (
                            <div key={index}>
                                <Image
                                    className="backgroundpc"
                                    src={stu?.Background_Pic}
                                />
                            </div>
                        ))}

                            </div>
                        <div className="ellipse" >
                            {student.map((stu, index) => (//ดึงข้อมูลมาใช้
                                <div key={index}>
                                    <Image
                                    className="profilepc"
                                    id="gom"
                                    src={stu?.Profile_Pic}
                                    />
                                </div>
                            ))}
                        </div>
                        {student.map((stu, index)=> (
                            <div key={index}>
                            <div className="name-lastname">{stu?.FirstName}&nbsp;&nbsp; {stu?.LastName} </div>
                            </div>
                        ))}
                        {student.map((stu, index)=> (
                            <div className="ininformation">{stu?.Infomation}</div>
                        ))}
                        
                    </div>
                </div>
                <div className="rectangle-3" >
                </div>
               
            </div>
        </div>
        
    
    );
  };
  export default Profiles;