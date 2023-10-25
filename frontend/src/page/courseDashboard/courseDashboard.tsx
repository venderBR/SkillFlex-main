import React, { useState, useEffect } from "react";
import './courseD.css'
import { Button, Collapse, CollapseProps, Layout, Menu, message, notification } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EnrollmentInterface } from "../../../interfaces/IEnrollment";
import NavBar from "../../components/navBar/navBar";
import { CreateEnrollment, CheckEnrollment } from "../../services/https/sEnrollment";
import type { NotificationPlacement } from 'antd/es/notification/interface';

import { Content } from "antd/es/layout/layout";
import { ApprovedCourseInterface } from "../../../interfaces/IApprovedcourse";
import { GetApprovedCourseById } from "../../services/https/sApprovedCourse";
import { GetUnitByCourseId } from "../../services/https/sUnit";
import { getUnitInterface } from "../../../interfaces/IUnit";


const CourseDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const [messageApi, contextHolder2] = message.useMessage();
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [isEnrolled, setIsEnrolled] = useState<boolean>();
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState<ApprovedCourseInterface[]>([]);
    const [unitData, setUnitData] = useState<getUnitInterface[]>([]);
    const [studentid, setStudentid] = useState();
    
    const openNotification = (placement: NotificationPlacement) => {
        api.success({message: `Enrollment success`,
        description:
          'You have enrolled this course, get started your learning!',
        placement,
        duration: 4.5
        })
      };
    
    const CheckEnrolled = async () => {
        console.log("studentidddd", studentid);
        let res = await CheckEnrollment(courseId,studentid);
        if(res) {
            setIsEnrolled(true);
            console.log("enrolled");
            console.log(res);
        }
        else {
            setIsEnrolled(false);
            console.log("not enrolled");
            console.log(res);
        }
    }

    const createEnrollment = async (enrollmentData: EnrollmentInterface) => {
        let res = await CreateEnrollment(enrollmentData);
        if (res) {
            enterLoading(0);
            
            setTimeout(function () {
                setIsEnrolled(true);
                openNotification('top')
            }, 1000);
            } 
        else {
            messageApi.open({
                type: "error",
                content: "Enrollment failed",
            });
        }
    };

    const enrollmentData: EnrollmentInterface = {
        EnrollTime: new Date(),
        Student_ID: Number(studentid),
        Approve_Course_ID: Number(courseId),
    };

    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
        });

        setTimeout(() => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = false;
            return newLoadings;
        });
        }, 1000);
    };

    

  const GetCourse = async () => {
    let res = await GetApprovedCourseById(Number(courseId));
    if (res) {
      console.log("Fetched course successful\n");
      setCourseData(res);
      console.log(courseData);
    }
  }

  const GetUnitByCId = async () => {
    let res = await GetUnitByCourseId(Number(courseId));
    if (res) {
      console.log("Fetched unit successful\n");
      setUnitData(res);
      console.log(unitData);
    }
  }

    const onChange = (key: string | string[]) => {
    console.log(key);
    };

    const unitItems: CollapseProps['items'] = unitData.map((item) => (
        {
            key: item.Order?.toString(),
            label: item.Name,
            children: item.Description,
        }
    ))

    useEffect(() => {
        const storedData = localStorage.getItem('studentInfo');
        console.log(storedData);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setStudentid(parsedData?.ID.toString());
        }
        CheckEnrolled();
        GetCourse();
        GetUnitByCId();
        
      }, [studentid]);
      
      useEffect(() => {
        // This useEffect will run whenever studentid changes.
        console.log("Updated studentid:", studentid);
      }, [studentid]);
      

    return(
        <Layout style={{backgroundColor: 'white'}}>
            {contextHolder}
            {contextHolder2}
            <NavBar currentPage="courseDashboard" />
            <Content style={{alignContent: 'center', width: '1500px', alignSelf: 'center'}}>
            {courseData.map((item) => (
                <div className="upper" 
                style={{backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${item.Image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center right',
                        backgroundRepeat: 'no-repeat',
                        height: '300px',
                        color: 'white'}}>
                    <div style={{padding: '35px 40px'}}>
                    <h1>{item.Name}</h1>
                    <p style={{padding: '0px 2px', width: '700px', marginBottom: '50px'}}>{item.Description}</p>
                    {isEnrolled? <Button type='default' onClick={() => navigate(`/material/${courseId}`)}>Go to Course</Button> :
                    <Button type='primary' loading={loadings[0]} onClick={() => {createEnrollment(enrollmentData)}}>Enroll</Button>}
                    </div>
                </div>
            ))}
            </Content>
            <Content style={{alignContent: 'center', width: '1000px', alignSelf: 'center', marginTop: '50px', marginBottom: '100px'}}>
                <h3>Module</h3>
                <Collapse items={unitItems} defaultActiveKey={['']} onChange={onChange} />
            </Content>
        </Layout>
    );
}
export default CourseDashboard;