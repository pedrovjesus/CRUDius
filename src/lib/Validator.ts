import { IGenerationConfig } from "../interfaces/generationConfig.interface";
import { IProperty } from "../interfaces/property.interface";
import { IRelations } from "../interfaces/relations.interface";
import { RootConfig } from "../interfaces/rootConfig.interface";

export class Validator {
  private static validRelationTypes = ["belongsTo"];

  /**
   * Validates a property object.
   */
  private static async IsValidProperty(
    property: IProperty
  ): Promise<string | boolean> {
    const validTypes = ["string", "number", "boolean", "array"];

    if (typeof property.field !== "string" || property.field.trim() === "") {
      return `There can be no empty fields in properties.`;
    }

    if (!validTypes.includes(property.type)) {
      return `The property "${property.field}" has an invalid type "${property.type}".`;
    }

    const booleanFields = ["searchable", "required", "optional"];

    for (const boolKey of booleanFields) {
      const value = (property as any)[boolKey];

      if (value !== undefined && typeof value !== "boolean") {
        return `The property "${boolKey}" in "${property.field}" must be true or false.`;
      }
    }

    return true;
  }

  /**
   * Validates relation objects.
   */
  private static async IsValidRelation(
    relation: IRelations,
    config: IGenerationConfig,
    allEntities: string[]
  ): Promise<string | boolean> {
    if (
      !relation.type ||
      !Validator.validRelationTypes.includes(relation.type)
    ) {
      return `Invalid relation type "${relation.type}" in "${config.entityName}".`;
    }

    if (!relation.target || typeof relation.target !== "string") {
      return `Relation target must be a valid entity name in "${config.entityName}".`;
    }

    if (!allEntities.includes(relation.target)) {
      return `Relation target "${relation.target}" does not exist in generationConfigs.`;
    }

    if (!relation.field || typeof relation.field !== "string") {
      return `Relation field must be a valid string in "${config.entityName}".`;
    }

    if (relation.target === config.entityName) {
      return `"${config.entityName}" cannot have a relation pointing to itself.`;
    }

    if (relation.field.toLowerCase() === "id") {
      return `Relation field cannot be "id" in "${config.entityName}".`;
    }

    const existsInProps = config.properties.some(
      (p) => p.field === relation.field
    );

    // belongsTo MUST have the field inside properties
    if (relation.type === "belongsTo" && !existsInProps) {
      return `Relation field "${relation.field}" must exist in properties for belongsTo relation in "${config.entityName}".`;
    }

    return true;
  }

  /**
   * Validates an entity configuration.
   */
  public static async IsValidGenerationConfig(
    config: IGenerationConfig,
    allEntities: string[]
  ): Promise<string | boolean> {
    const errors: string[] = [];

    if (
      typeof config.entityName !== "string" ||
      config.entityName.trim() === ""
    ) {
      return `The generation config has an invalid entity name.`;
    }

    // Validate properties
    for (const property of config.properties) {
      const isValidProperty = await this.IsValidProperty(property);
      if (isValidProperty !== true) {
        errors.push(isValidProperty as string);
      }
    }

    // Validate relations
    if (config.relations && config.relations.length > 0) {
      for (const relation of config.relations) {
        const isValid = await this.IsValidRelation(
          relation,
          config,
          allEntities
        );
        if (isValid !== true) {
          errors.push(isValid as string);
        }
      }

      // Check for duplicated fields inside relations
      const relFieldNames = config.relations.map((r) => r.field);
      const duplicates = relFieldNames.filter(
        (name, index) => relFieldNames.indexOf(name) !== index
      );
      if (duplicates.length > 0) {
        errors.push(
          `Duplicate relation fields found in "${
            config.entityName
          }": ${duplicates.join(", ")}`
        );
      }
    }

    return errors.length === 0 ? true : errors.join(" | ");
  }

  /**
   * Validates root configuration file.
   */
  public static async IsValidRootConfig(
    rootConfig: RootConfig
  ): Promise<string | boolean> {
    if (
      !rootConfig.generationConfigs ||
      !Array.isArray(rootConfig.generationConfigs)
    ) {
      return `The root config has an invalid generationConfigs array.`;
    }

    const allEntities = rootConfig.generationConfigs.map((c) => c.entityName);

    for (const config of rootConfig.generationConfigs) {
      const isValidConfig = await this.IsValidGenerationConfig(
        config,
        allEntities
      );
      if (isValidConfig !== true) {
        return isValidConfig;
      }
    }

    return true;
  }
}
