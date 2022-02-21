import { Label, Stack } from '@fluentui/react';
import styled from 'styled-components';
import { ClaimType } from '../interfaces/building-blocks/claims-schema';

const StyledClaim = styled.div``;

export function ClaimTypeDisplay(prop: ClaimType) {
  return (
    <StyledClaim>
      <Stack>
        <Stack.Item>
          <Label>{prop.DisplayName.value}</Label>
          <Label>{prop.DataType.value}</Label>
        </Stack.Item>
      </Stack>
      {/* {JSON.stringify(prop, null, 2)} */}
    </StyledClaim>
  );
}

export default ClaimTypeDisplay;
