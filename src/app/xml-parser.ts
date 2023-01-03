import { XMLParser } from 'fast-xml-parser';
import { useEffect, useState } from 'react';
import { XmlRoot } from '../interfaces/base-profile.interface';
import { trustFrameworkBase } from '../starter-files/trustFrameworkBase';

export const useDefaultTrustFrameworkBase = () => {
  const [defaultTrustFrameworkBase, setDefaultTrustFrameworkBase] =
    useState<XmlRoot>();

  useEffect(() => {
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
    const xmlParser = new XMLParser(options);
    setDefaultTrustFrameworkBase(xmlParser.parse(trustFrameworkBase));
  }, []);

  return defaultTrustFrameworkBase;
};
