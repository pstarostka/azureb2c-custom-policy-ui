import React from 'react';
import { getDefaultTrustFrameworkBase } from 'src/xml-parser';
import { ClaimTypeDisplay } from './ClaimTypeDisplay';

/* eslint-disable-next-line */
export interface XmlViewerProps {}

const a = getDefaultTrustFrameworkBase();
export const XmlViewer: React.FC<XmlViewerProps> = (props: XmlViewerProps) => {
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
};

export default XmlViewer;
