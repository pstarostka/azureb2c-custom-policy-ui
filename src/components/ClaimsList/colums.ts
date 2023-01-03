import { IColumn } from '@fluentui/react';
export interface ClaimRow {
  key: string;
  displayName: string;
  name: string;
  type: string;
}

interface ClaimsColumn extends IColumn {
  fieldName: keyof ClaimRow;
}

export const columns: ClaimsColumn[] = [
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
    maxWidth: 300,
    isRowHeader: true,
    isResizable: true,
    data: 'string',
    isPadded: true,
  },
  {
    key: 'column3',
    name: 'Claim Type',
    fieldName: 'type',
    minWidth: 100,
    maxWidth: 180,
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
