import { Label, Stack } from '@fluentui/react';
import React from 'react';
import { ClaimType } from '../interfaces/building-blocks';

export const ClaimTypeDisplay: React.FC<ClaimType> = (prop: ClaimType) => {
  return (
    <>
      <Stack>
        <Stack.Item>
          <Label>{prop.DisplayName.value}</Label>
          <Label>{prop.DataType.value}</Label>
        </Stack.Item>
      </Stack>
      {/* {JSON.stringify(prop, null, 2)} */}
    </>
  );
};
