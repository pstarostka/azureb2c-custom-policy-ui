/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-useless-escape */
export const trustFrameworkBase: string = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<TrustFrameworkPolicy
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns="http://schemas.microsoft.com/online/cpim/schemas/2013/06"
  PolicySchemaVersion="0.3.0.0"
  TenantId="yourtenant.onmicrosoft.com"
  PolicyId="B2C_1A_TrustFrameworkBase"
  PublicPolicyUri="http://yourtenant.onmicrosoft.com/B2C_1A_TrustFrameworkBase">

  <BuildingBlocks>
    <ClaimsSchema>
      <!-- The ClaimsSchema is divided into three sections:
           1. Section I lists the minimum claims that are required for the user journeys to work properly.
           2. Section II lists the claims required for query string parameters and other special parameters 
              to be passed to other claims providers, esp. login.microsoftonline.com for authentication. 
              Please do not modify these claims.
           3. Section III lists any additional (optional) claims that can be collected from the user, stored 
              in the directory and sent in tokens during sign in. Add new claims to be collected from the user 
              and/or sent in the token in Section III. -->

      <!-- NOTE: The claims schema contains restrictions on certain claims such as passwords and usernames. 
           The trust framework policy treats Azure AD as any other claims provider and all its restrictions 
           are modelled in the policy. A policy could be modified to add more restrictions, or use another 
           claims provider for credential storage which will have its own restrictions. -->

      <!-- SECTION I: Claims required for user journeys to work properly -->

      <ClaimType Id="socialIdpUserId">
        <DisplayName>Username</DisplayName>
        <DataType>string</DataType>
        <UserHelpText/>
        <UserInputType>TextBox</UserInputType>
        <Restriction>
          <Pattern RegularExpression="^[a-zA-Z0-9]+[a-zA-Z0-9_-]*$" HelpText="The username you provided is not valid. It must begin with an alphabet or number and can contain alphabets, numbers and the following symbols: _ -" />
        </Restriction>
      </ClaimType>

      <ClaimType Id="tenantId">
        <DisplayName>User's Object's Tenant ID</DisplayName>
        <DataType>string</DataType>
        <DefaultPartnerClaimTypes>
          <Protocol Name="OAuth2" PartnerClaimType="tid" />
          <Protocol Name="OpenIdConnect" PartnerClaimType="tid" />
          <Protocol Name="SAML2" PartnerClaimType="http://schemas.microsoft.com/identity/claims/tenantid" />
        </DefaultPartnerClaimTypes>
        <UserHelpText>Tenant identifier (ID) of the user object in Azure AD.</UserHelpText>
      </ClaimType>

      <ClaimType Id="objectId">
        <DisplayName>User's Object ID</DisplayName>
        <DataType>string</DataType>
        <DefaultPartnerClaimTypes>
          <Protocol Name="OAuth2" PartnerClaimType="oid" />
          <Protocol Name="OpenIdConnect" PartnerClaimType="oid" />
          <Protocol Name="SAML2" PartnerClaimType="http://schemas.microsoft.com/identity/claims/objectidentifier" />
        </DefaultPartnerClaimTypes>
        <UserHelpText>Object identifier (ID) of the user object in Azure AD.</UserHelpText>
      </ClaimType>

      <!-- Claims needed for local accounts. -->
      <ClaimType Id="signInName">
        <DisplayName>Sign in name</DisplayName>
        <DataType>string</DataType>
        <UserHelpText/>
        <UserInputType>TextBox</UserInputType>
      </ClaimType>

      <ClaimType Id="signInNames.emailAddress">
        <DisplayName>Email Address</DisplayName>
        <DataType>string</DataType>
        <UserHelpText>Email address to use for signing in.</UserHelpText>
        <UserInputType>TextBox</UserInputType>
      </ClaimType>

      <ClaimType Id="accountEnabled">
        <DisplayName>Account Enabled</DisplayName>
        <DataType>boolean</DataType>
        <AdminHelpText>Specifies whether the user's account is enabled.</AdminHelpText>
        <UserHelpText>Specifies whether your account is enabled.</UserHelpText>
      </ClaimType>

      <ClaimType Id="password">
        <DisplayName>Password</DisplayName>
        <DataType>string</DataType>
        <UserHelpText>Enter password</UserHelpText>
        <UserInputType>Password</UserInputType>
      </ClaimType>

      <!-- The claim types newPassword and reenterPassword are considered special, please do not change the names. 
           The UI validates that the user correctly re-entered their password during account creation based on these 
           claim types.	  -->
      <ClaimType Id="newPassword">
        <DisplayName>New Password</DisplayName>
        <DataType>string</DataType>
        <UserHelpText>Enter new password</UserHelpText>
        <UserInputType>Password</UserInputType>
        <Restriction>
          <Pattern RegularExpression="^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]))([A-Za-z\d@#$%^&amp;*\-_+=[\]{}|\\:',?/\`~&quot;();!]|\.(?!@)){8,16}$" HelpText="8-16 characters, containing 3 out of 4 of the following: Lowercase characters, uppercase characters, digits (0-9), and one or more of the following symbols: @ # $ % ^ &amp; * - _ + = [ ] { } | \ : ' , ? / \` ~ &quot; ( ) ; ." />
        </Restriction>
      </ClaimType>
      <!-- The password regular expression above is constructed for AAD passwords based on restrictions at https://msdn.microsoft.com/en-us/library/azure/jj943764.aspx
        ^( # one of the following four combinations must appear in the password
         (?=.*[a-z])(?=.*[A-Z])(?=.*\d) |            # matches lower case, upper case or digit
         (?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]) |  # matches lower case, upper case or special character (i.e. non-alpha or digit)
         (?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]) |     # matches lower case, digit, or special character
         (?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])       # matches upper case, digit, or special character
        )
        ( # The password must match the following restrictions
         [A-Za-z\d@#$%^&*\-_+=[\]{}|\\:',?/\`~"();!] |   # The list of all acceptable characters (without .)
         \.(?!@)                                        # or . can appear as long as not followed by @
        ) {8,16}$                                       # the length must be between 8 and 16 chars inclusive
      -->

      <ClaimType Id="reenterPassword">
        <DisplayName>Confirm New Password</DisplayName>
        <DataType>string</DataType>
        <UserHelpText>Confirm new password</UserHelpText>
        <UserInputType>Password</UserInputType>
        <Restriction>
          <Pattern RegularExpression="^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])|(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]))([A-Za-z\d@#$%^&amp;*\-_+=[\]{}|\\:',?/\`~&quot;();!]|\.(?!@)){8,16}$" HelpText=" " />
        </Restriction>
      </ClaimType>

      <ClaimType Id="passwordPolicies">
        <DisplayName>Password Policies</DisplayName>
        <DataType>string</DataType>
        <UserHelpText>Password policies used by Azure AD to determine password strength, expiry etc.</UserHelpText>
      </ClaimType>

      <ClaimType Id="client_id">
        <DisplayName>client_id</DisplayName>
        <DataType>string</DataType>
        <AdminHelpText>Special parameter passed to EvoSTS.</AdminHelpText>
        <UserHelpText>Special parameter passed to EvoSTS.</UserHelpText>
      </ClaimType>

      <ClaimType Id="resource_id">
        <DisplayName>resource_id</DisplayName>
        <DataType>string</DataType>
        <AdminHelpText>Special parameter passed to EvoSTS.</AdminHelpText>
        <UserHelpText>Special parameter passed to EvoSTS.</UserHelpText>
      </ClaimType>

      <ClaimType Id="sub">
        <DisplayName>Subject</DisplayName>
        <DataType>string</DataType>
        <DefaultPartnerClaimTypes>
          <Protocol Name="OpenIdConnect" PartnerClaimType="sub" />
        </DefaultPartnerClaimTypes>
        <UserHelpText/>
      </ClaimType>

      <ClaimType Id="identityProvider">
        <DisplayName>Identity Provider</DisplayName>
        <DataType>string</DataType>
        <DefaultPartnerClaimTypes>
          <Protocol Name="OAuth2" PartnerClaimType="idp" />
          <Protocol Name="OpenIdConnect" PartnerClaimType="idp" />
          <Protocol Name="SAML2" PartnerClaimType="http://schemas.microsoft.com/identity/claims/identityprovider" />
        </DefaultPartnerClaimTypes>
        <UserHelpText/>
      </ClaimType>

      <ClaimType Id="displayName">
        <DisplayName>Display Name</DisplayName>
        <DataType>string</DataType>
        <DefaultPartnerClaimTypes>
          <Protocol Name="OAuth2" PartnerClaimType="unique_name" />
          <Protocol Name="OpenIdConnect" PartnerClaimType="name" />
          <Protocol Name="SAML2" PartnerClaimType="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name" />
        </DefaultPartnerClaimTypes>
        <UserHelpText>Your display name.</UserHelpText>
        <UserInputType>TextBox</UserInputType>
      </ClaimType>

      <ClaimType Id="email">
        <DisplayName>Email Address</DisplayName>
        <DataType>string</DataType>
        <DefaultPartnerClaimTypes>
          <Protocol Name="OpenIdConnect" PartnerClaimType="email" />
        </DefaultPartnerClaimTypes>
        <UserHelpText>Email address that can be used to contact you.</UserHelpText>
        <UserInputType>TextBox</UserInputType>
        <Restriction>
          <Pattern RegularExpression="^[a-zA-Z0-9.!#$%&amp;'^_\`{}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" HelpText="Please enter a valid email address." />
        </Restriction>
      </ClaimType>

      <ClaimType Id="otherMails">
        <DisplayName>Alternate Email Addresses</DisplayName>
        <DataType>stringCollection</DataType>
        <UserHelpText>Email addresses that can be used to contact the user.</UserHelpText>
      </ClaimType>

      <ClaimType Id="userPrincipalName">
        <DisplayName>UserPrincipalName</DisplayName>
        <DataType>string</DataType>
        <DefaultPartnerClaimTypes>
          <Protocol Name="OAuth2" PartnerClaimType="upn" />
          <Protocol Name="OpenIdConnect" PartnerClaimType="upn" />
          <Protocol Name="SAML2" PartnerClaimType="http://schemas.microsoft.com/identity/claims/userprincipalname" />
        </DefaultPartnerClaimTypes>
        <UserHelpText>Your user name as stored in the Azure Active Directory.</UserHelpText>
      </ClaimType>

      <ClaimType Id="upnUserName">
        <DisplayName>UPN User Name</DisplayName>
        <DataType>string</DataType>
        <UserHelpText>The user name for creating user principal name.</UserHelpText>
      </ClaimType>

      <ClaimType Id="newUser">
        <DisplayName>User is new</DisplayName>
        <DataType>boolean</DataType>
        <UserHelpText/>
      </ClaimType>

      <ClaimType Id="executed-SelfAsserted-Input">
        <DisplayName>Executed-SelfAsserted-Input</DisplayName>
        <DataType>string</DataType>
        <UserHelpText>A claim that specifies whether attributes were collected from the user.</UserHelpText>
      </ClaimType>

      <ClaimType Id="authenticationSource">
        <DisplayName>AuthenticationSource</DisplayName>
        <DataType>string</DataType>
        <UserHelpText>Specifies whether the user was authenticated at Social IDP or local account.</UserHelpText>
      </ClaimType>

      <!-- SECTION II: Claims required to pass on special parameters (including some query string parameters) to other claims providers -->

      <ClaimType Id="nca">
        <DisplayName>nca</DisplayName>
        <DataType>string</DataType>
        <UserHelpText>Special parameter passed for local account authentication to login.microsoftonline.com.</UserHelpText>
      </ClaimType>

      <ClaimType Id="grant_type">
        <DisplayName>grant_type</DisplayName>
        <DataType>string</DataType>
        <UserHelpText>Special parameter passed for local account authentication to login.microsoftonline.com.</UserHelpText>
      </ClaimType>

      <ClaimType Id="scope">
        <DisplayName>scope</DisplayName>
        <DataType>string</DataType>
        <UserHelpText>Special parameter passed for local account authentication to login.microsoftonline.com.</UserHelpText>
      </ClaimType>

      <ClaimType Id="objectIdFromSession">
        <DisplayName>objectIdFromSession</DisplayName>
        <DataType>boolean</DataType>
        <UserHelpText>Parameter provided by the default session management provider to indicate that the object id has been retrieved from an SSO session.</UserHelpText>
      </ClaimType>

      <ClaimType Id="isActiveMFASession">
        <DisplayName>isActiveMFASession</DisplayName>
        <DataType>boolean</DataType>
        <UserHelpText>Parameter provided by the MFA session management to indicate that the user has an active MFA session.</UserHelpText>
      </ClaimType>

      <!-- SECTION III: Additional claims that can be collected from the users, stored in the directory, and sent in the token. Add additional claims here. -->

      <ClaimType Id="givenName">
        <DisplayName>Given Name</DisplayName>
        <DataType>string</DataType>
        <DefaultPartnerClaimTypes>
          <Protocol Name="OAuth2" PartnerClaimType="given_name" />
          <Protocol Name="OpenIdConnect" PartnerClaimType="given_name" />
          <Protocol Name="SAML2" PartnerClaimType="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname" />
        </DefaultPartnerClaimTypes>
        <UserHelpText>Your given name (also known as first name).</UserHelpText>
        <UserInputType>TextBox</UserInputType>
      </ClaimType>

      <ClaimType Id="surname">
        <DisplayName>Surname</DisplayName>
        <DataType>string</DataType>
        <DefaultPartnerClaimTypes>
          <Protocol Name="OAuth2" PartnerClaimType="family_name" />
          <Protocol Name="OpenIdConnect" PartnerClaimType="family_name" />
          <Protocol Name="SAML2" PartnerClaimType="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname" />
        </DefaultPartnerClaimTypes>
        <UserHelpText>Your surname (also known as family name or last name).</UserHelpText>
        <UserInputType>TextBox</UserInputType>
      </ClaimType>

    </ClaimsSchema>

    <ClaimsTransformations>
      <ClaimsTransformation Id="CreateOtherMailsFromEmail" TransformationMethod="AddItemToStringCollection">
        <InputClaims>
          <InputClaim ClaimTypeReferenceId="email" TransformationClaimType="item" />
          <InputClaim ClaimTypeReferenceId="otherMails" TransformationClaimType="collection" />
        </InputClaims>
        <OutputClaims>
          <OutputClaim ClaimTypeReferenceId="otherMails" TransformationClaimType="collection" />
        </OutputClaims>
      </ClaimsTransformation>

      <ClaimsTransformation Id="AssertAccountEnabledIsTrue" TransformationMethod="AssertBooleanClaimIsEqualToValue">
        <InputClaims>
          <InputClaim ClaimTypeReferenceId="accountEnabled" TransformationClaimType="inputClaim" />
        </InputClaims>
        <InputParameters>
          <InputParameter Id="valueToCompareTo" DataType="boolean" Value="true" />
        </InputParameters>
      </ClaimsTransformation>
    </ClaimsTransformations>

    <ClientDefinitions>
      <ClientDefinition Id="DefaultWeb">
        <ClientUIFilterFlags>LineMarkers, MetaRefresh</ClientUIFilterFlags>
      </ClientDefinition>
    </ClientDefinitions>

    <ContentDefinitions>

      <!-- This content definition is to render an error page that displays unhandled errors. -->
      <ContentDefinition Id="api.error">
        <LoadUri>~/tenant/templates/AzureBlue/exception.cshtml</LoadUri>
        <RecoveryUri>~/common/default_page_error.html</RecoveryUri>
        <DataUri>urn:com:microsoft:aad:b2c:elements:contract:globalexception:1.2.1</DataUri>
        <Metadata>
          <Item Key="DisplayName">Error page</Item>
        </Metadata>
      </ContentDefinition>

      <ContentDefinition Id="api.idpselections">
        <LoadUri>~/tenant/templates/AzureBlue/idpSelector.cshtml</LoadUri>
        <RecoveryUri>~/common/default_page_error.html</RecoveryUri>
        <DataUri>urn:com:microsoft:aad:b2c:elements:contract:providerselection:1.2.1</DataUri>
        <Metadata>
          <Item Key="DisplayName">Idp selection page</Item>
          <Item Key="language.intro">Sign in</Item>
        </Metadata>
      </ContentDefinition>

      <ContentDefinition Id="api.idpselections.signup">
        <LoadUri>~/tenant/templates/AzureBlue/idpSelector.cshtml</LoadUri>
        <RecoveryUri>~/common/default_page_error.html</RecoveryUri>
        <DataUri>urn:com:microsoft:aad:b2c:elements:contract:providerselection:1.2.1</DataUri>
        <Metadata>
          <Item Key="DisplayName">Idp selection page</Item>
          <Item Key="language.intro">Sign up</Item>
        </Metadata>
      </ContentDefinition>

      <ContentDefinition Id="api.signuporsignin">
        <LoadUri>~/tenant/templates/AzureBlue/unified.cshtml</LoadUri>
        <RecoveryUri>~/common/default_page_error.html</RecoveryUri>
        <DataUri>urn:com:microsoft:aad:b2c:elements:contract:unifiedssp:2.1.5</DataUri>
        <Metadata>
          <Item Key="DisplayName">Signin and Signup</Item>
        </Metadata>
      </ContentDefinition>

      <ContentDefinition Id="api.selfasserted">
        <LoadUri>~/tenant/templates/AzureBlue/selfAsserted.cshtml</LoadUri>
        <RecoveryUri>~/common/default_page_error.html</RecoveryUri>
        <DataUri>urn:com:microsoft:aad:b2c:elements:contract:selfasserted:2.1.7</DataUri>
        <Metadata>
          <Item Key="DisplayName">Collect information from user page</Item>
        </Metadata>
      </ContentDefinition>

      <ContentDefinition Id="api.selfasserted.profileupdate">
        <LoadUri>~/tenant/templates/AzureBlue/selfAsserted.cshtml</LoadUri>
        <RecoveryUri>~/common/default_page_error.html</RecoveryUri>
        <DataUri>urn:com:microsoft:aad:b2c:elements:contract:selfasserted:2.1.7</DataUri>
        <Metadata>
          <Item Key="DisplayName">Collect information from user page</Item>
        </Metadata>
      </ContentDefinition>

      <ContentDefinition Id="api.localaccountsignup">
        <LoadUri>~/tenant/templates/AzureBlue/selfAsserted.cshtml</LoadUri>
        <RecoveryUri>~/common/default_page_error.html</RecoveryUri>
        <DataUri>urn:com:microsoft:aad:b2c:elements:contract:selfasserted:2.1.7</DataUri>
        <Metadata>
          <Item Key="DisplayName">Local account sign up page</Item>
        </Metadata>
      </ContentDefinition>

      <ContentDefinition Id="api.localaccountpasswordreset">
        <LoadUri>~/tenant/templates/AzureBlue/selfAsserted.cshtml</LoadUri>
        <RecoveryUri>~/common/default_page_error.html</RecoveryUri>
        <DataUri>urn:com:microsoft:aad:b2c:elements:contract:selfasserted:2.1.7</DataUri>
        <Metadata>
          <Item Key="DisplayName">Local account change password page</Item>
        </Metadata>
      </ContentDefinition>

      <ContentDefinition Id="api.localaccountsignin">
        <LoadUri>~/tenant/templates/AzureBlue/selfAsserted.cshtml</LoadUri>
        <RecoveryUri>~/common/default_page_error.html</RecoveryUri>
        <DataUri>urn:com:microsoft:aad:b2c:elements:contract:selfasserted:2.1.7</DataUri>
        <Metadata>
          <Item Key="DisplayName">Collect information from user page</Item>
        </Metadata>
      </ContentDefinition>
    </ContentDefinitions>
  </BuildingBlocks>

  <!--
        A list of all the claim providers that can be used in the technical policies. If a claims provider is not listed 
        in this section, then it cannot be used in a technical policy.
    -->
  <ClaimsProviders>

    <ClaimsProvider>
      <DisplayName>Local Account SignIn</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="login-NonInteractive">
          <DisplayName>Local Account SignIn</DisplayName>
          <Protocol Name="OpenIdConnect" />
          <Metadata>
            <Item Key="ProviderName">https://sts.windows.net/</Item>
            <Item Key="METADATA">https://login.microsoftonline.com/{tenant}/.well-known/openid-configuration</Item>
            <Item Key="authorization_endpoint">https://login.microsoftonline.com/{tenant}/oauth2/token</Item>
            <Item Key="response_types">id_token</Item>
            <Item Key="response_mode">query</Item>
            <Item Key="scope">email openid</Item>
            <!-- <Item Key="grant_type">password</Item> -->

            <!-- Policy Engine Clients -->
            <Item Key="UsePolicyInRedirectUri">false</Item>
            <Item Key="HttpBinding">POST</Item>
          </Metadata>
          <InputClaims>
            <InputClaim ClaimTypeReferenceId="signInName" PartnerClaimType="username" Required="true" />
            <InputClaim ClaimTypeReferenceId="password" Required="true" />
            <InputClaim ClaimTypeReferenceId="grant_type" DefaultValue="password" AlwaysUseDefaultValue="true" />
            <InputClaim ClaimTypeReferenceId="scope" DefaultValue="openid" AlwaysUseDefaultValue="true" />
            <InputClaim ClaimTypeReferenceId="nca" PartnerClaimType="nca" DefaultValue="1" />
          </InputClaims>
          <OutputClaims>
            <OutputClaim ClaimTypeReferenceId="objectId" PartnerClaimType="oid" />
            <OutputClaim ClaimTypeReferenceId="tenantId" PartnerClaimType="tid" />
            <OutputClaim ClaimTypeReferenceId="givenName" PartnerClaimType="given_name" />
            <OutputClaim ClaimTypeReferenceId="surName" PartnerClaimType="family_name" />
            <OutputClaim ClaimTypeReferenceId="displayName" PartnerClaimType="name" />
            <OutputClaim ClaimTypeReferenceId="userPrincipalName" PartnerClaimType="upn" />
            <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="localAccountAuthentication" />
          </OutputClaims>
        </TechnicalProfile>
      </TechnicalProfiles>
    </ClaimsProvider>

    <ClaimsProvider>
      <DisplayName>Azure Active Directory</DisplayName>
      <TechnicalProfiles>

        <TechnicalProfile Id="AAD-Common">
          <DisplayName>Azure Active Directory</DisplayName>
          <Protocol Name="Proprietary" Handler="Web.TPEngine.Providers.AzureActiveDirectoryProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />

          <CryptographicKeys>
            <Key Id="issuer_secret" StorageReferenceId="B2C_1A_TokenSigningKeyContainer" />
          </CryptographicKeys>

          <!-- We need this here to suppress the SelfAsserted provider from invoking SSO on validation profiles. -->
          <IncludeInSso>false</IncludeInSso>
          <UseTechnicalProfileForSessionManagement ReferenceId="SM-Noop" />
        </TechnicalProfile>

        <!-- Technical profiles for local accounts -->

        <TechnicalProfile Id="AAD-UserWriteUsingLogonEmail">
          <Metadata>
            <Item Key="Operation">Write</Item>
            <Item Key="RaiseErrorIfClaimsPrincipalAlreadyExists">true</Item>
          </Metadata>
          <IncludeInSso>false</IncludeInSso>
          <InputClaims>
            <InputClaim ClaimTypeReferenceId="email" PartnerClaimType="signInNames.emailAddress" Required="true" />
          </InputClaims>
          <PersistedClaims>
            <!-- Required claims -->
            <PersistedClaim ClaimTypeReferenceId="email" PartnerClaimType="signInNames.emailAddress" />
            <PersistedClaim ClaimTypeReferenceId="newPassword" PartnerClaimType="password" />
            <PersistedClaim ClaimTypeReferenceId="displayName" DefaultValue="unknown" />
            <PersistedClaim ClaimTypeReferenceId="passwordPolicies" DefaultValue="DisablePasswordExpiration" />

            <!-- Optional claims. -->
            <PersistedClaim ClaimTypeReferenceId="givenName" />
            <PersistedClaim ClaimTypeReferenceId="surname" />
          </PersistedClaims>
          <OutputClaims>
            <OutputClaim ClaimTypeReferenceId="objectId" />
            <OutputClaim ClaimTypeReferenceId="newUser" PartnerClaimType="newClaimsPrincipalCreated" />
            <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="localAccountAuthentication" />
            <OutputClaim ClaimTypeReferenceId="userPrincipalName" />
            <OutputClaim ClaimTypeReferenceId="signInNames.emailAddress" />
          </OutputClaims>
          <IncludeTechnicalProfile ReferenceId="AAD-Common" />
          <UseTechnicalProfileForSessionManagement ReferenceId="SM-AAD" />
        </TechnicalProfile>

        <TechnicalProfile Id="AAD-UserReadUsingEmailAddress">
          <Metadata>
            <Item Key="Operation">Read</Item>
            <Item Key="RaiseErrorIfClaimsPrincipalDoesNotExist">true</Item>
          </Metadata>
          <IncludeInSso>false</IncludeInSso>
          <InputClaims>
            <InputClaim ClaimTypeReferenceId="email" PartnerClaimType="signInNames.emailAddress" Required="true" />
          </InputClaims>
          <OutputClaims>
            <!-- Required claims -->
            <OutputClaim ClaimTypeReferenceId="objectId" />
            <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="localAccountAuthentication" />

            <!-- Optional claims -->
            <OutputClaim ClaimTypeReferenceId="userPrincipalName" />
            <OutputClaim ClaimTypeReferenceId="displayName" />
            <OutputClaim ClaimTypeReferenceId="accountEnabled" />
            <OutputClaim ClaimTypeReferenceId="otherMails" />
            <OutputClaim ClaimTypeReferenceId="signInNames.emailAddress" />
          </OutputClaims>
          <OutputClaimsTransformations>
            <OutputClaimsTransformation ReferenceId="AssertAccountEnabledIsTrue" />
          </OutputClaimsTransformations>
          <IncludeTechnicalProfile ReferenceId="AAD-Common" />
        </TechnicalProfile>

        <TechnicalProfile Id="AAD-UserWritePasswordUsingObjectId">
          <Metadata>
            <Item Key="Operation">Write</Item>
            <Item Key="RaiseErrorIfClaimsPrincipalDoesNotExist">true</Item>
          </Metadata>
          <IncludeInSso>false</IncludeInSso>
          <InputClaims>
            <InputClaim ClaimTypeReferenceId="objectId" Required="true" />
          </InputClaims>
          <PersistedClaims>
            <PersistedClaim ClaimTypeReferenceId="objectId" />
            <PersistedClaim ClaimTypeReferenceId="newPassword" PartnerClaimType="password" />

          </PersistedClaims>
          <IncludeTechnicalProfile ReferenceId="AAD-Common" />
        </TechnicalProfile>

        <!-- Technical profiles for updating user record using objectId -->

        <TechnicalProfile Id="AAD-UserWriteProfileUsingObjectId">
          <Metadata>
            <Item Key="Operation">Write</Item>
            <Item Key="RaiseErrorIfClaimsPrincipalAlreadyExists">false</Item>
            <Item Key="RaiseErrorIfClaimsPrincipalDoesNotExist">true</Item>
          </Metadata>
          <IncludeInSso>false</IncludeInSso>
          <InputClaims>
            <InputClaim ClaimTypeReferenceId="objectId" Required="true" />
          </InputClaims>
          <PersistedClaims>
            <!-- Required claims -->
            <PersistedClaim ClaimTypeReferenceId="objectId" />

            <!-- Optional claims -->
            <PersistedClaim ClaimTypeReferenceId="givenName" />
            <PersistedClaim ClaimTypeReferenceId="surname" />
          </PersistedClaims>
          <IncludeTechnicalProfile ReferenceId="AAD-Common" />
        </TechnicalProfile>

        <!-- The following technical profile is used to read data after user authenticates. -->
        <TechnicalProfile Id="AAD-UserReadUsingObjectId">
          <Metadata>
            <Item Key="Operation">Read</Item>
            <Item Key="RaiseErrorIfClaimsPrincipalDoesNotExist">true</Item>
          </Metadata>
          <IncludeInSso>false</IncludeInSso>
          <InputClaims>
            <InputClaim ClaimTypeReferenceId="objectId" Required="true" />
          </InputClaims>
          <OutputClaims>

            <!-- Optional claims -->
            <OutputClaim ClaimTypeReferenceId="signInNames.emailAddress" />
            <OutputClaim ClaimTypeReferenceId="displayName" />
            <OutputClaim ClaimTypeReferenceId="otherMails" />
            <OutputClaim ClaimTypeReferenceId="givenName" />
            <OutputClaim ClaimTypeReferenceId="surname" />
          </OutputClaims>
          <IncludeTechnicalProfile ReferenceId="AAD-Common" />
        </TechnicalProfile>

      </TechnicalProfiles>
    </ClaimsProvider>

    <ClaimsProvider>
      <DisplayName>Self Asserted</DisplayName>
      <TechnicalProfiles>

        <TechnicalProfile Id="SelfAsserted-ProfileUpdate">
          <DisplayName>User ID signup</DisplayName>
          <Protocol Name="Proprietary" Handler="Web.TPEngine.Providers.SelfAssertedAttributeProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />
          <Metadata>
            <Item Key="ContentDefinitionReferenceId">api.selfasserted.profileupdate</Item>
          </Metadata>
          <IncludeInSso>false</IncludeInSso>
          <InputClaims>
            <InputClaim ClaimTypeReferenceId="userPrincipalName" />

            <!-- Optional claims. These claims are collected from the user and can be modified. Any claim added here should be updated in the
                 ValidationTechnicalProfile referenced below so it can be written to directory after being updated by the user, i.e. AAD-UserWriteProfileUsingObjectId. -->
            <InputClaim ClaimTypeReferenceId="givenName" />
            <InputClaim ClaimTypeReferenceId="surname" />
          </InputClaims>
          <OutputClaims>
            <!-- Required claims -->
            <OutputClaim ClaimTypeReferenceId="executed-SelfAsserted-Input" DefaultValue="true" />

            <!-- Optional claims. These claims are collected from the user and can be modified. Any claim added here should be updated in the
                 ValidationTechnicalProfile referenced below so it can be written to directory after being updated by the user, i.e. AAD-UserWriteProfileUsingObjectId. -->
            <OutputClaim ClaimTypeReferenceId="givenName" />
            <OutputClaim ClaimTypeReferenceId="surname" />
          </OutputClaims>
          <ValidationTechnicalProfiles>
            <ValidationTechnicalProfile ReferenceId="AAD-UserWriteProfileUsingObjectId" />
          </ValidationTechnicalProfiles>
        </TechnicalProfile>
      </TechnicalProfiles>
    </ClaimsProvider>

    <ClaimsProvider>
      <DisplayName>Local Account</DisplayName>
      <TechnicalProfiles>

        <TechnicalProfile Id="LocalAccountSignUpWithLogonEmail">
          <DisplayName>Email signup</DisplayName>
          <Protocol Name="Proprietary" Handler="Web.TPEngine.Providers.SelfAssertedAttributeProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />
          <Metadata>
            <Item Key="IpAddressClaimReferenceId">IpAddress</Item>
            <Item Key="ContentDefinitionReferenceId">api.localaccountsignup</Item>
          </Metadata>
          <CryptographicKeys>
            <Key Id="issuer_secret" StorageReferenceId="B2C_1A_TokenSigningKeyContainer" />
          </CryptographicKeys>
          <InputClaims>
            <InputClaim ClaimTypeReferenceId="email" />
          </InputClaims>
          <OutputClaims>
            <OutputClaim ClaimTypeReferenceId="objectId" />
            <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="Verified.Email" Required="true" />
            <OutputClaim ClaimTypeReferenceId="newPassword" Required="true" />
            <OutputClaim ClaimTypeReferenceId="reenterPassword" Required="true" />
            <OutputClaim ClaimTypeReferenceId="executed-SelfAsserted-Input" DefaultValue="true" />
            <OutputClaim ClaimTypeReferenceId="authenticationSource" />
            <OutputClaim ClaimTypeReferenceId="newUser" />

            <!-- Optional claims, to be collected from the user -->
            <OutputClaim ClaimTypeReferenceId="displayName" />
            <OutputClaim ClaimTypeReferenceId="givenName" />
            <OutputClaim ClaimTypeReferenceId="surName" />
          </OutputClaims>
          <ValidationTechnicalProfiles>
            <ValidationTechnicalProfile ReferenceId="AAD-UserWriteUsingLogonEmail" />
          </ValidationTechnicalProfiles>
          <UseTechnicalProfileForSessionManagement ReferenceId="SM-AAD" />
        </TechnicalProfile>

        <!-- This technical profile uses a validation technical profile to authenticate the user. -->
        <TechnicalProfile Id="SelfAsserted-LocalAccountSignin-Email">
          <DisplayName>Local Account Signin</DisplayName>
          <Protocol Name="Proprietary" Handler="Web.TPEngine.Providers.SelfAssertedAttributeProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />
          <Metadata>
            <Item Key="SignUpTarget">SignUpWithLogonEmailExchange</Item>
            <Item Key="setting.operatingMode">Email</Item>
            <Item Key="ContentDefinitionReferenceId">api.localaccountsignin</Item>
          </Metadata>
          <IncludeInSso>false</IncludeInSso>
          <InputClaims>
            <InputClaim ClaimTypeReferenceId="signInName" />
          </InputClaims>
          <OutputClaims>
            <OutputClaim ClaimTypeReferenceId="signInName" Required="true" />
            <OutputClaim ClaimTypeReferenceId="password" Required="true" />
            <OutputClaim ClaimTypeReferenceId="objectId" />
            <OutputClaim ClaimTypeReferenceId="authenticationSource" />
          </OutputClaims>
          <ValidationTechnicalProfiles>
            <ValidationTechnicalProfile ReferenceId="login-NonInteractive" />
          </ValidationTechnicalProfiles>
          <UseTechnicalProfileForSessionManagement ReferenceId="SM-AAD" />
        </TechnicalProfile>

        <!-- This technical profile forces the user to verify the email address that they provide on the UI. Only after email is verified, the user account is
        read from the directory. -->
        <TechnicalProfile Id="LocalAccountDiscoveryUsingEmailAddress">
          <DisplayName>Reset password using email address</DisplayName>
          <Protocol Name="Proprietary" Handler="Web.TPEngine.Providers.SelfAssertedAttributeProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />
          <Metadata>
            <Item Key="IpAddressClaimReferenceId">IpAddress</Item>
            <Item Key="ContentDefinitionReferenceId">api.localaccountpasswordreset</Item>
          </Metadata>
          <CryptographicKeys>
            <Key Id="issuer_secret" StorageReferenceId="B2C_1A_TokenSigningKeyContainer" />
          </CryptographicKeys>
          <IncludeInSso>false</IncludeInSso>
          <OutputClaims>
            <OutputClaim ClaimTypeReferenceId="email" PartnerClaimType="Verified.Email" Required="true" />
            <OutputClaim ClaimTypeReferenceId="objectId" />
            <OutputClaim ClaimTypeReferenceId="userPrincipalName" />
            <OutputClaim ClaimTypeReferenceId="authenticationSource" />

          </OutputClaims>
          <ValidationTechnicalProfiles>
            <ValidationTechnicalProfile ReferenceId="AAD-UserReadUsingEmailAddress" />
          </ValidationTechnicalProfiles>
        </TechnicalProfile>

        <TechnicalProfile Id="LocalAccountWritePasswordUsingObjectId">
          <DisplayName>Change password (username)</DisplayName>
          <Protocol Name="Proprietary" Handler="Web.TPEngine.Providers.SelfAssertedAttributeProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />
          <Metadata>
            <Item Key="ContentDefinitionReferenceId">api.localaccountpasswordreset</Item>
          </Metadata>
          <CryptographicKeys>
            <Key Id="issuer_secret" StorageReferenceId="B2C_1A_TokenSigningKeyContainer" />
          </CryptographicKeys>
          <InputClaims>
            <InputClaim ClaimTypeReferenceId="objectId" />

          </InputClaims>
          <OutputClaims>
            <OutputClaim ClaimTypeReferenceId="newPassword" Required="true" />
            <OutputClaim ClaimTypeReferenceId="reenterPassword" Required="true" />
          </OutputClaims>
          <ValidationTechnicalProfiles>
            <ValidationTechnicalProfile ReferenceId="AAD-UserWritePasswordUsingObjectId" />
          </ValidationTechnicalProfiles>
        </TechnicalProfile>

      </TechnicalProfiles>
    </ClaimsProvider>

    <ClaimsProvider>
      <DisplayName>Session Management</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="SM-Noop">
          <DisplayName>Noop Session Management Provider</DisplayName>
          <Protocol Name="Proprietary" Handler="Web.TPEngine.SSO.NoopSSOSessionProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />
        </TechnicalProfile>

        <TechnicalProfile Id="SM-AAD">
          <DisplayName>Session Mananagement Provider</DisplayName>
          <Protocol Name="Proprietary" Handler="Web.TPEngine.SSO.DefaultSSOSessionProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />
          <PersistedClaims>
            <PersistedClaim ClaimTypeReferenceId="objectId" />
            <PersistedClaim ClaimTypeReferenceId="signInName" />
            <PersistedClaim ClaimTypeReferenceId="authenticationSource" />
            <PersistedClaim ClaimTypeReferenceId="identityProvider" />
            <PersistedClaim ClaimTypeReferenceId="newUser" />
            <PersistedClaim ClaimTypeReferenceId="executed-SelfAsserted-Input" />
          </PersistedClaims>
          <OutputClaims>
            <OutputClaim ClaimTypeReferenceId="objectIdFromSession" DefaultValue="true" />
          </OutputClaims>
        </TechnicalProfile>

      </TechnicalProfiles>
    </ClaimsProvider>

    <ClaimsProvider>
      <DisplayName>Trustframework Policy Engine TechnicalProfiles</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="TpEngine_c3bd4fe2-1775-4013-b91d-35f16d377d13">
          <DisplayName>Trustframework Policy Engine Default Technical Profile</DisplayName>
          <Protocol Name="None" />
          <Metadata>
            <Item Key="url">{service:te}</Item>
          </Metadata>
        </TechnicalProfile>
      </TechnicalProfiles>
    </ClaimsProvider>

    <ClaimsProvider>
      <DisplayName>Token Issuer</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="JwtIssuer">
          <DisplayName>JWT Issuer</DisplayName>
          <Protocol Name="None" />
          <OutputTokenFormat>JWT</OutputTokenFormat>
          <Metadata>
            <Item Key="client_id">{service:te}</Item>
            <Item Key="issuer_refresh_token_user_identity_claim_type">objectId</Item>
            <Item Key="SendTokenResponseBodyWithJsonNumbers">true</Item>
          </Metadata>
          <CryptographicKeys>
            <Key Id="issuer_secret" StorageReferenceId="B2C_1A_TokenSigningKeyContainer" />
            <Key Id="issuer_refresh_token_key" StorageReferenceId="B2C_1A_TokenEncryptionKeyContainer" />
          </CryptographicKeys>
          <InputClaims />
          <OutputClaims />
        </TechnicalProfile>
      </TechnicalProfiles>
    </ClaimsProvider>
  </ClaimsProviders>

  <UserJourneys>

    <UserJourney Id="SignUpOrSignIn">
      <OrchestrationSteps>

        <OrchestrationStep Order="1" Type="CombinedSignInAndSignUp" ContentDefinitionReferenceId="api.signuporsignin">
          <ClaimsProviderSelections>
            <ClaimsProviderSelection ValidationClaimsExchangeId="LocalAccountSigninEmailExchange" />
          </ClaimsProviderSelections>
          <ClaimsExchanges>
            <ClaimsExchange Id="LocalAccountSigninEmailExchange" TechnicalProfileReferenceId="SelfAsserted-LocalAccountSignin-Email" />
          </ClaimsExchanges>
        </OrchestrationStep>

        <OrchestrationStep Order="2" Type="ClaimsExchange">
          <Preconditions>
            <Precondition Type="ClaimsExist" ExecuteActionsIf="true">
              <Value>objectId</Value>
              <Action>SkipThisOrchestrationStep</Action>
            </Precondition>
          </Preconditions>
          <ClaimsExchanges>
            <ClaimsExchange Id="SignUpWithLogonEmailExchange" TechnicalProfileReferenceId="LocalAccountSignUpWithLogonEmail" />
          </ClaimsExchanges>
        </OrchestrationStep>

        <!-- This step reads any user attributes that we may not have received when in the token. -->
        <OrchestrationStep Order="3" Type="ClaimsExchange">
          <ClaimsExchanges>
            <ClaimsExchange Id="AADUserReadWithObjectId" TechnicalProfileReferenceId="AAD-UserReadUsingObjectId" />
          </ClaimsExchanges>
        </OrchestrationStep>

        <OrchestrationStep Order="4" Type="SendClaims" CpimIssuerTechnicalProfileReferenceId="JwtIssuer" />

      </OrchestrationSteps>
      <ClientDefinition ReferenceId="DefaultWeb" />
    </UserJourney>

    <UserJourney Id="ProfileEdit">
      <OrchestrationSteps>

        <OrchestrationStep Order="1" Type="ClaimsProviderSelection" ContentDefinitionReferenceId="api.idpselections">
          <ClaimsProviderSelections>
            <ClaimsProviderSelection TargetClaimsExchangeId="LocalAccountSigninEmailExchange" />
          </ClaimsProviderSelections>
        </OrchestrationStep>
        <OrchestrationStep Order="2" Type="ClaimsExchange">
          <ClaimsExchanges>
            <ClaimsExchange Id="LocalAccountSigninEmailExchange" TechnicalProfileReferenceId="SelfAsserted-LocalAccountSignin-Email" />
          </ClaimsExchanges>
        </OrchestrationStep>
        <OrchestrationStep Order="3" Type="ClaimsExchange">
          <ClaimsExchanges>
            <ClaimsExchange Id="AADUserReadWithObjectId" TechnicalProfileReferenceId="AAD-UserReadUsingObjectId" />
          </ClaimsExchanges>
        </OrchestrationStep>

        <OrchestrationStep Order="4" Type="ClaimsExchange">
          <ClaimsExchanges>
            <ClaimsExchange Id="B2CUserProfileUpdateExchange" TechnicalProfileReferenceId="SelfAsserted-ProfileUpdate" />
          </ClaimsExchanges>
        </OrchestrationStep>
        <OrchestrationStep Order="5" Type="SendClaims" CpimIssuerTechnicalProfileReferenceId="JwtIssuer" />

      </OrchestrationSteps>
      <ClientDefinition ReferenceId="DefaultWeb" />
    </UserJourney>

    <UserJourney Id="PasswordReset">
      <OrchestrationSteps>
        <OrchestrationStep Order="1" Type="ClaimsExchange">
          <ClaimsExchanges>
            <ClaimsExchange Id="PasswordResetUsingEmailAddressExchange" TechnicalProfileReferenceId="LocalAccountDiscoveryUsingEmailAddress" />
          </ClaimsExchanges>
        </OrchestrationStep>
        <OrchestrationStep Order="2" Type="ClaimsExchange">
          <ClaimsExchanges>
            <ClaimsExchange Id="NewCredentials" TechnicalProfileReferenceId="LocalAccountWritePasswordUsingObjectId" />
          </ClaimsExchanges>
        </OrchestrationStep>
        <OrchestrationStep Order="3" Type="SendClaims" CpimIssuerTechnicalProfileReferenceId="JwtIssuer" />
      </OrchestrationSteps>
      <ClientDefinition ReferenceId="DefaultWeb" />
    </UserJourney>

  </UserJourneys>
</TrustFrameworkPolicy>
`;
