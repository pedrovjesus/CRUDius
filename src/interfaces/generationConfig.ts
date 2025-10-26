import { IFileGenerate } from "./fileGenerate";
import { IProperty } from "./property";

export interface IGenerationConfig {
  entityName: string;
  properties: IProperty[];
  filesToGenerate: IFileGenerate[];
}