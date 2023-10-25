import { Route, Routes,Navigate } from "react-router-dom";
import { RegisterTeacher } from '../page/RegisterTeacher';
import { RegisterStudent } from '../page/RegisterStudent';
import { LoginStudent } from '../page/LoginStudent';
import { LoginTeacher } from '../page/LoginTeacher';
import LoginAdmin from '../page/LoginAdmin/LoginAdmin';
import  Home  from '../page/Home/home';
import SelectPage from '../page/SelectPage/SelectPage'

import  Profiles from '../page/profileview/profileS';
import  Profilet from '../page/profileview/profileT';
import StudentE from '../page/profile/student';
import TeacherE from '../page/profile/teacher';
import DISAPCOURSE from '../page/profile/Discourse/disAPcourse'

import EditT from '../page/edit/editT';
import EditS from '../page/edit/editS';

import Contact from "../page/contact/contact";
import StudentProfile from "../page/studentProject/studentProfile";
import MyCourse from "../page/myCourse/myCourse";
import CourseDashboard from "../page/courseDashboard/courseDashboard";
import Material from "../page/material/material";
import SearchResultsPage from "../page/searchResult/searchResult";
import { useEffect, useState } from "react";
import { ApprovedCourseInterface } from "../../interfaces/IApprovedcourse";
import { GetApprovedCourses } from "../services/https/sApprovedCourse";

import Student from "../page/student_Incourse";
import Course from "../page/courseof_teacher";
import UploadCourse from "../page/uploadcourse";
import AddUnist from "../page/uploadcourse/addunits"

import Approve from '../page/approve';
import Approved from '../page/approved';
import Request from '../page/request';

function AppRoutes(){

    const [courseData, setCourseData] = useState<ApprovedCourseInterface[]>([]);

  const GetCourses = async () => {
    let res = await GetApprovedCourses();
    if (res) {
      console.log("Fetched successful\n");
      setCourseData(res);
      console.log(courseData);
    }
  }
  useEffect(() => {
    GetCourses();
  }, []);

    return(
      <Routes>
      {/* <Route index element={<Navigate to="/SelectPage" />} /> */}
      <Route path='/home' element={<Home courseData={courseData}/>}></Route>
      <Route path="/RegisterTeacher" element={<RegisterTeacher />} />
      <Route path="/RegisterStudent" element={<RegisterStudent />} />
      <Route path="/LoginStudent" element={<LoginStudent />} />
      <Route path="/LoginTeacher" element={<LoginTeacher />} />
      <Route path="/LoginAdmin" element={<LoginAdmin />} />
      <Route path="/" element={<SelectPage/>} />
      <Route path="/viewprofileS" element={<Profiles/>}/>
      <Route path="/viewprofileT" element={<Profilet/>}/>
      <Route path="/profileS" element={<StudentE/>}/>
      <Route path="/profileT" element={<TeacherE/>}/>
      <Route path="/profileT/DiscCourse" element={<DISAPCOURSE/>}/>
      <Route path="/profileT/edit" element={<EditT/>}/>
      <Route path="/profileS/edit" element={<EditS/>}/>
      <Route path='/search' element={<SearchResultsPage courseData={courseData}/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/myCourse' element={<MyCourse/>}></Route>
      <Route path='/studentProfile' element={<StudentProfile/>}></Route>
      <Route path='/courseDashboard/:courseId' element={<CourseDashboard/>}></Route>
      <Route path='/material/:courseId' element={<Material/>}></Route>
      <Route path="/student" element={<Student />}/>
      <Route path="/course"  element={<Course />}/>
      <Route path="/course/:id" element={<Course />} />   
      <Route path="/upload_course"  element={<UploadCourse />}/> 
      <Route path="/addunits"  element={<AddUnist />}/>
      <Route path="/unit:unitNumber" element={<AddUnist />} />
      <Route path='/request' element={<Request/>}></Route>
      <Route path='/approve/:cid' element={<Approve/>}></Route>
      <Route path='/approved' element={<Approved/>}></Route>

    </Routes>
    );
}

export default AppRoutes;