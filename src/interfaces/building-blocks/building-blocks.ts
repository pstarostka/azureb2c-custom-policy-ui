import { ClaimsSchema } from './claims-schema';
import { ClaimsTransformation } from './claims-transformation';
export interface BuildingBlock {
  ClaimsSchema: ClaimsSchema;
  ClaimsTransformations: ClaimsTransformation[];
}
 