import { CoursesInterface} from "./course";
import { AdminsInterface } from "./admin";
import { StatusInterface } from "./status";
export interface ApprovedCoursesInterface {

  Description?: string;
  Time_Approve?: TimerHandler;


  Course_ID?: number
  Course?: CoursesInterface;

  Admin_ID?: number
  Admin?: AdminsInterface;

  Status_ID?: number
  Status?: StatusInterface;

}