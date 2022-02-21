import { getDefaultTrustFrameworkBase } from '@azure-b2c-custom-policy-ui/b2c-parser';
import { ClaimTypeDisplay } from '@azure-b2c-custom-policy-ui/b2c-parser/components';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface XmlViewerProps {}

const StyledXmlViewer = styled.div``;
const a = getDefaultTrustFrameworkBase();
export function XmlViewer(props: XmlViewerProps) {
  return (
    <StyledXmlViewer>
      <div>Claims</div>
      {a.TrustFrameworkPolicy.BuildingBlocks.ClaimsSchema.ClaimType.map(
        (x, index) => {
          return <ClaimTypeDisplay key={index} {...x} />;
        }
      )}
    </StyledXmlViewer>
  );
}

export default XmlViewer;
