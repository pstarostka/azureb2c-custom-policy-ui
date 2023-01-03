import { getDefaultTrustFrameworkBase } from 'src/xml-parser';
import { ClaimTypeDisplay } from './ClaimTypeDisplay';

/* eslint-disable-next-line */
export interface XmlViewerProps {}

const a = getDefaultTrustFrameworkBase();
export function XmlViewer(props: XmlViewerProps) {
  return (
    <>
      <div>Claims</div>
      {a.TrustFrameworkPolicy.BuildingBlocks.ClaimsSchema.ClaimType.map(
        (x, index) => {
          return <ClaimTypeDisplay key={index} {...x} />;
        }
      )}
    </>
  );
}

export default XmlViewer;
