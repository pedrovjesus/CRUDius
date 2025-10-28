import { IFileGenerate } from "./fileGenerate.interface";
import { IProperty } from "./property.interface";

export interface IGenerationConfig {
  entityName: string;
  properties: IProperty[];
  filesToGenerate: IFileGenerate[];
}