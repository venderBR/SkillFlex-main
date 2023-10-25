import { UnitsInterface } from "./IUnit";

export interface MaterialInterface {
  ID?: number;
  Name?: string;
  Description?: string;
  VideoPath?: string;
  FilePath?: string;
  CreateTime?: TimerHandler;

  Unit_ID?: number;
  Unit?:UnitsInterface;
}

