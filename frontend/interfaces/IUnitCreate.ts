import { CoursesInterface } from "./course";

export interface UnitsInterface {
  ID?: number;
  Name?: string;
  Order?: number;
  Description?: string;
  
  Course_ID?: number;
  Course?: CoursesInterface
}

