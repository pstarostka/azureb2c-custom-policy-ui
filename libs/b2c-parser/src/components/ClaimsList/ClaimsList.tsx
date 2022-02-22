import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  mergeStyleSets,
  SelectionMode,
} from '@fluentui/react';
import React from 'react';
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
  const classNames = mergeStyleSets({
    fileIconHeaderIcon: {
      padding: 0,
      fontSize: '16px',
    },
    fileIconCell: {
      textAlign: 'center',
      selectors: {
        '&:before': {
          content: '.',
          display: 'inline-block',
          verticalAlign: 'middle',
          height: '100%',
          width: '0px',
          visibility: 'hidden',
        },
      },
    },
    fileIconImg: {
      verticalAlign: 'middle',
      maxHeight: '16px',
      maxWidth: '16px',
    },
    controlWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'auto',
      maxHeight: '300px',
    },
    exampleToggle: {
      display: 'inline-block',
      marginBottom: '10px',
      marginRight: '30px',
    },
    selectionDetails: {
      marginBottom: '20px',
    },
  });

  const columns: ClaimsColumn[] = [
    {
      key: 'column1',
      name: 'Claim Name',
      fieldName: 'name',
      minWidth: 210,
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
      minWidth: 250,
      isResizable: true,
      data: 'string',
      isPadded: true,
    },
    {
      key: 'column3',
      name: 'Claim Type',
      fieldName: 'type',
      minWidth: 140,
      maxWidth: 250,
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

  const items: ClaimRow[] = props.claims.map((claim, index) => ({
    key: index.toString(),
    type: claim.DataType.value,
    name: claim._attributes.Id,
    displayName: claim.DisplayName.value,
  }));

  return (
    <div className={classNames.controlWrapper}>
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
  );
}
