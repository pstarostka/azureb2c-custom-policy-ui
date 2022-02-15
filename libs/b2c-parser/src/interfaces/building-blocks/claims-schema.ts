export interface ClaimsSchema {
  ClaimType: ClaimType[];
}

export type ClaimDataType =
  | 'boolean'
  | 'date'
  | 'dateTime'
  | 'duration'
  | 'phoneNumber'
  | 'int'
  | 'long'
  | 'string'
  | 'stringCollection'
  | 'userIdentity'
  | 'userIdentityCollection';

export type ClaimUserInputType =
  | 'CheckboxMultiSelect'
  | 'DateTimeDropdown'
  | 'DropdownSingleSelect'
  | 'EmailBox'
  | 'Paragraph'
  | 'Password'
  | 'RadioSingleSelect'
  | 'Readonly'
  | 'TextBox';

export interface ClaimType {
  _attributes: {
    Id: string;
  };
  DisplayName: {
    value: string;
  };
  DataType: {
    value: ClaimDataType;
  };
  UserInputType?: {
    value: ClaimUserInputType;
  };
  DefaultPartnerClaimTypes?: {
    _attributes: {
      Name: string;
      PartnerClaimType: string;
    }[];
  };
  UserHelpText?: {
    value: string;
  };

  AdminHelpText?: {
    value: string;
  };
  Mask?: {
    _attributes: {
      Type: 'Simple' | 'Regex';
    };
    value: string;
  };
  Restriction?: {
    Pattern?: {
      _attributes: {
        RegularExpression: string;
        HelpText: string;
      };
    }[];
    Enumeration: {
      _attributes: {
        Text: string;
        Value: string;
        SelectByDefault: boolean;
      };
    }[];
  };
}
