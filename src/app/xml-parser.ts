import { XMLParser } from 'fast-xml-parser';
import { XmlRoot } from '../interfaces/base-profile';
import { trustFrameworkBase } from '../starter-files/trustFrameworkBase';

export const getDefaultTrustFrameworkBase = () => {
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
  console.log(xmlParser.parse(trustFrameworkBase));
  return xmlParser.parse(trustFrameworkBase) as XmlRoot;
};
