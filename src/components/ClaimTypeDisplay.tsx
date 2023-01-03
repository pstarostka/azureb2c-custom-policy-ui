import { Label, Stack } from '@fluentui/react';
import { ClaimType } from '../interfaces/building-blocks/claims-schema';

export function ClaimTypeDisplay(prop: ClaimType) {
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
}
