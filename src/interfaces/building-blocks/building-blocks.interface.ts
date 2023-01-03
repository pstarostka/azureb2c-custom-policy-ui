import { ClaimsSchema } from './claims-schema.interface';
import { ClaimsTransformation } from './claims-transformation.interface';
export interface BuildingBlocks {
  ClaimsSchema: ClaimsSchema;
  ClaimsTransformations: ClaimsTransformation[];
}
