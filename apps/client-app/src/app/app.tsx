import { getDefaultTrustFrameworkBase } from '@azure-b2c-custom-policy-ui/b2c-parser';
import { Button, Layout, Menu } from 'antd';
import 'antd/dist/antd.less';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { useEffect } from 'react';
import styled from 'styled-components';
import XmlViewer from './xml-viewer';

const { Header, Footer, Sider, Content } = Layout;
const Logo = styled.img`
  float: left;
  height: 50px;
  margin: 7px;
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
  const elo = () => {
    getDefaultTrustFrameworkBase();
    console.log('elo');
  };
  return (
    <Layout>
      <Header>
        <Logo src="../assets/b2c-logo.png" alt="logo" />
        <Menu theme="dark" mode="horizontal">
          {['Home', 'Test'].map((item, index) => {
            const key = index + 1;
            return <Menu.Item key={key}>{item}</Menu.Item>;
          })}
        </Menu>
      </Header>
      <Content style={{ margin: '10px' }}>
        <XmlViewer />
        <Button type="primary" onClick={elo}>
          Primary Button
        </Button>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
