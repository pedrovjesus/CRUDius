import { IFileGenerate } from "./fileGenerate.interface";
import { IProperty } from "./property.interface";
import { IRelations } from "./relations.interface";

export interface IGenerationConfig {
  entityName: string;
  properties: IProperty[];
  relations?: IRelations[];
  filesToGenerate: IFileGenerate[];
}
