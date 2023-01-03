import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
  Text,
  TextField,
} from '@fluentui/react';
import React, { useState } from 'react';
import { ClaimType } from '../../interfaces/building-blocks/claims-schema';

export interface ClaimRow {
  key: string;
  displayName: string;
  name: string;
  type: string;
}

interface ClaimsColumn extends IColumn {
  fieldName: keyof ClaimRow;
}
export function ClaimsList(props: { claims: ClaimType[] }) {
  const getKey = (item: any, index?: number): string => {
    return item.key;
  };

  const columns: ClaimsColumn[] = [
    {
      key: 'column1',
      name: 'Claim Name',
      fieldName: 'name',
      minWidth: 210,
      maxWidth: 300,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      data: 'string',
      isPadded: true,
    },
    {
      key: 'column2',
      name: 'Display Name',
      fieldName: 'displayName',
      minWidth: 280,
      isRowHeader: true,
      isResizable: true,
      data: 'string',
      isPadded: true,
    },
    {
      key: 'column3',
      name: 'Claim Type',
      fieldName: 'type',
      maxWidth: 180,
      minWidth: 160,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: 'Sorted A to Z',
      sortDescendingAriaLabel: 'Sorted Z to A',
      data: 'string',
      isPadded: true,
    },
  ];

  const allItems: ClaimRow[] = props.claims.map((claim, index) => ({
    key: index.toString(),
    type: claim.DataType.value,
    name: claim._attributes.Id,
    displayName: claim.DisplayName.value,
  }));

  const [items, setItems] = useState(allItems);

  const filterItems = (value: string | undefined) => {
    const filtered = allItems.filter(
      (x) =>
        x.name.toLowerCase().includes(value?.toLowerCase() ?? '') ||
        x.displayName.toLowerCase().includes(value?.toLowerCase() ?? '')
    );
    setItems(filtered);
  };

  const controlStyles = {
    root: {
      margin: '1em 0',
      maxWidth: '300px',
    },
  };
  return (
    <div>
      <div>
        <Text variant="xxLarge">Claims List</Text>
        <TextField
          label="Filter by name:"
          onChange={(_, value) => filterItems(value)}
          styles={controlStyles}
        />
      </div>
      <div style={{ maxHeight: '30em', overflow: 'auto' }}>
        <DetailsList
          items={items}
          compact={true}
          columns={columns}
          selectionMode={SelectionMode.none}
          getKey={getKey}
          setKey="none"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
        />
      </div>
    </div>
  );
}
