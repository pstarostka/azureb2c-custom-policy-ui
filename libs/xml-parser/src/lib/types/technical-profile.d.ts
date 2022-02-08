export interface TechnicalProfile {
  _attributes: {
    Id: string;
  };
  Metadata: Metadata;
  IncludeInSso: { value: boolean };
  InputClaims: Claim[];
  PersistentClaims: Claim[];
  OutputClaims: Claim[];
  IncludeTechnicalProfile: CustomObjectReference;
  UseTechnicalProfileForSessionManagement: CustomObjectReference;
}

interface CustomObjectReference {
  _attributes: {
    ReferenceId: string;
  };
}

export interface Claim {
  _attributes: {
    ClaimTypeReferenceId: string;
    PartnerClaimType?: string;
    Required?: boolean;
    DefaultValue?: string;
    AlwaysUseDefaultValue?: string;
  };
}

export interface Metadata {
  Item: Item[];
}

interface Item {
  attributes: {
    Key: 'Operation' | 'RaiseErrorIfClaimsPrincipalAlreadyExists';
  };
  value: string;
}
