import styled from 'styled-components';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { useEffect } from 'react';
import Home from './home';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: '',
    attributesGroupName: '_attributes',
    alwaysCreateTextNode: true,
    commentPropName: '_comment',
    parseAttributeValue: true,
    allowBooleanAttributes: true,
    textNodeName: 'value',
  };
  const parser = new XMLParser(options);
  const b =
    parser.parse(`<TechnicalProfile Id="AAD-UserWriteUsingLogonHashedEmail">
            <Metadata>
              <Item Key="Operation">Write</Item>
              <Item Key="RaiseErrorIfClaimsPrincipalAlreadyExists">true</Item>
            </Metadata>
            <IncludeInSso>false</IncludeInSso>
            <InputClaims>
              <InputClaim ClaimTypeReferenceId="email" PartnerClaimType="signInNames.emailAddress" Required="true" />
            </InputClaims>
            <PersistedClaims>
            
              <PersistedClaim ClaimTypeReferenceId="emailHash" PartnerClaimType="signInNames.emailAddress" />
              <PersistedClaim ClaimTypeReferenceId="passwordPolicies" DefaultValue="DisablePasswordExpiration" />
  
            </PersistedClaims>
            <OutputClaims>
              <OutputClaim ClaimTypeReferenceId="newUser" PartnerClaimType="newClaimsPrincipalCreated" />
              <OutputClaim ClaimTypeReferenceId="signInNames.emailAddress" />
            </OutputClaims>
            <IncludeTechnicalProfile ReferenceId="AAD-Common" />
            <UseTechnicalProfileForSessionManagement ReferenceId="SM-AAD" />
          </TechnicalProfile>
  `);
  useEffect(() => {
    const builder = new XMLBuilder(options);
    const xmlContent = builder.build(b);
    console.log(b);
    console.log('xml', xmlContent);
  }, []);

  return (
    <StyledApp>
      <Home obj={b.TechnicalProfile} />
    </StyledApp>
  );
}

export default App;
