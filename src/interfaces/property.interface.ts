export interface IProperty {
  field: string;
  type: "string" | "number" | "boolean"
  isOptional?: boolean;
  primary?: boolean;
  required?: boolean;
}