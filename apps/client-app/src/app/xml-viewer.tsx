import { getDefaultTrustFrameworkBase } from '@azure-b2c-custom-policy-ui/b2c-parser';
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
          return <div key={index}> {JSON.stringify(x, null, 2)}</div>;
        }
      )}
    </StyledXmlViewer>
  );
}

export default XmlViewer;
