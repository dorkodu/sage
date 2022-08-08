import { ISageSchema, ISageResource } from "./interfaces";

export class SageSchema implements ISageSchema {
  public types: { [key: string]: ISageResource };

  constructor(types: { [key: string]: ISageResource }) {
    this.types = types;
  }
}
