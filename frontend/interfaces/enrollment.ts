import { StudentInterface } from "./IStudent";
import { ApprovedCoursesInterface } from "./approvedCourses";

export interface EnrollsInterface {

  ID?: number;
  CreateTime?: TimerHandler;


  Student_ID?: number
  Student?: StudentInterface;

  ApprovedCourses_ID?: number
  ApprovedCourses?: ApprovedCoursesInterface;

}