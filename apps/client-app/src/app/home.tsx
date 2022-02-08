import { TechnicalProfile } from '@azure-b2c-custom-policy-ui/xml-parser/types';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface HomeProps {
  obj: TechnicalProfile;
}

const StyledHome = styled.div``;

export function Home(props: HomeProps) {
  return (
    <StyledHome>
      <h1>Welcome to Home!</h1>

      <h3>Value: {props.obj.IncludeInSso.value.toString()}</h3>
      {/* <h2>{props?.obj && props.obj.Metadata.Item[0].value}</h2> */}
      <pre>{JSON.stringify(props.obj, null, 2)}</pre>
    </StyledHome>
  );
}

export default Home;
