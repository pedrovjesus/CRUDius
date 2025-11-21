import { IGenerationConfig } from "../interfaces/generationConfig.interface";
import { IProperty } from "../interfaces/property.interface";
import { RootConfig } from "../interfaces/rootConfig.interface";

export class Validator {
  /**
   * Validates a property object.
   * @param property
   * @returns validation property result
   */
  private static async IsValidProperty(
    property: IProperty
  ): Promise<string | boolean> {
    const validTypes = ["string", "number", "boolean", "array"];
    if (typeof property.field !== "string" || property.field.trim() === "") {
      return `There can be no empty fields in properties.`;
    }
    if (!validTypes.includes(property.type)) {
      return `The property ${property.field} has an invalid type.`;
    }
    const booleanFields = ["searchable", "required"];

    for (const boolKey of booleanFields) {
      const value = (property as any)[boolKey];

      if (value !== undefined && typeof value !== "boolean") {
        return `The property "${boolKey}" in "${property.field}" must be true or false.`;
      }
    }

    return true;
  }

  /**
   *
   * @param config
   * @returns validade entity
   */
  public static async IsValidGenerationConfig(
    config: IGenerationConfig
  ): Promise<string | boolean> {
    const errors: string[] = [];
    if (
      typeof config.entityName !== "string" ||
      config.entityName.trim() === ""
    ) {
      return `The generation config has an invalid entity name.`;
    }

    for (const property of config.properties) {
      const isValidProperty = await this.IsValidProperty(property);
      if (isValidProperty !== true) {
        errors.push(isValidProperty as string);
      }
    }

    return errors.length === 0 ? true : errors.join(" | ");
  }

  public static async IsValidRootConfig(
    rootConfig: RootConfig
  ): Promise<string | boolean> {
    if (
      !rootConfig.generationConfigs ||
      !Array.isArray(rootConfig.generationConfigs)
    ) {
      return `The root config has an invalid generationConfigs array.`;
    }

    for (const config of rootConfig.generationConfigs) {
      const isValidConfig = await this.IsValidGenerationConfig(config);
      if (isValidConfig !== true) {
        return isValidConfig;
      }
    }

    return true;
  }
}
