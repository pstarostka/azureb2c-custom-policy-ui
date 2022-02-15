export interface ClaimsTransformation {
  _attributes: {
    Id: string;
    TransformationMethod: ClaimsTransformationMethod;
  };
}

export type ClaimsTransformationMethod =
  | ClaimsTransformationBooleanMethod
  | ClaimsTransformationDateMethod;

type ClaimsTransformationBooleanMethod =
  | 'AndClaims'
  | 'AssertBooleanClaimIsEqualToValue'
  | 'CompareBooleanClaimToValue'
  | 'NotClaims'
  | 'OrClaims';

type ClaimsTransformationDateMethod =
  | 'AssertDateTimeIsGreaterThan'
  | 'ConvertDateTimeToDateClaim'
  | 'ConvertDateToDateTimeClaim'
  | 'DateTimeComparison'
  | 'IsTermsOfUseConsentRequired'
  | 'GetCurrentDateTime';
