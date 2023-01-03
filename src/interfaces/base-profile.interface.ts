import { BuildingBlocks } from './building-blocks/building-blocks.interface';

export interface XmlRoot {
  '?xml': XmlHead;
  TrustFrameworkPolicy: TrustFrameworkPolicy;
}

export interface XmlHead {
  _attributes: {
    version: string;
    encoding: string;
    standalone: 'yes' | 'no';
  };
}

export interface TrustFrameworkPolicy {
  _attributes: {
    'xmlns:xsi': string;
    'xmlns:xsd': string;
    xmlns: string;
    PolicySchemaVersion: string;
    TenantId: string;
    PolicyId: string;
    PublicPolicyUri: string;
  };
  BasePolicy?: any;
  BuildingBlocks: BuildingBlocks;
  ClaimsProvider: any;
  UserJourneys: any;
}
