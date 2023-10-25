import { TeachersInterface } from "./ITeacher";
import { CategorysInterface } from "./ICategory";
export interface CoursesInterface {

  ID?: number;
  Name?: string;
  Description?: string;  
  Image?: string;
  CreateTime?: TimerHandler;


  Teacher_ID?: number
  Teacher?: TeachersInterface;

  Category_ID?: number;
  Category?: CategorysInterface
}