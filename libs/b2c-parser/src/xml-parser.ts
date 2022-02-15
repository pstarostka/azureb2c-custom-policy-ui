import { XMLParser } from 'fast-xml-parser';
import { XmlRoot } from './interfaces/base-profile';
import { trustFrameworkBase } from './starter-files/trustFrameworkBase';

export const getDefaultTrustFrameworkBase = () => {
  const xmlParser = new XMLParser();

  return xmlParser.parse(trustFrameworkBase) as XmlRoot;
};
