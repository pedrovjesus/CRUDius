export interface IRelations {
  type: "belongsTo" | "hasOne" | "hasMany" | "manyToMany";
  target: string;
  field: string;
  isOptional: boolean;
  onDelete: "CASCADE" | "RESTRICT" | "SET NULL" | "NO ACTION";
}
