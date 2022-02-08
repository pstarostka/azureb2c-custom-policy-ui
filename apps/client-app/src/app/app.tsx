import styled from 'styled-components';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { useEffect } from 'react';
import Home from './home';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  useEffect(() => {
    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: '',
      attributesGroupName: '@_attributes',
      alwaysCreateTextNode: true,
    };
    const parser = new XMLParser(options);
    const b = parser.parse(`<?xml version='1.0' encoding='utf-8'?>
  <Library>
     <Books count='1'>
         <Book id='1'>
             <Name>Me Before You</Name>
             <Author>Jojo Moyes</Author>
         </Book>
     </Books>
     <Music count=1>
         <CD id='2'>
             <Name>Houses of the Holy</Name>
             <Artist>Led Zeppelin</Artist>
         </CD>
     </Music>
  </Library>`);

    const builder = new XMLBuilder(options);
    const xmlContent = builder.build(b);
    console.log(b);
    console.log('xml', xmlContent);
  }, []);

  return (
    <StyledApp>
      <Home />
    </StyledApp>
  );
}

export default App;
