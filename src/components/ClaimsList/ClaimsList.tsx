import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Text,
  TextField,
} from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { ClaimType } from 'src/interfaces/building-blocks';
import { ClaimRow, columns } from './colums';

type Props = {
  claims: ClaimType[];
  onRemoveClaim: () => void;
  onAddClaim: () => void;
};

export const ClaimsList: React.FC<Props> = ({ claims }: Props) => {
  useEffect(() => {
    const allItems: ClaimRow[] = claims.map((claim, index) => ({
      key: index.toString(),
      type: claim.DataType.value,
      name: claim._attributes.Id,
      displayName: claim.DisplayName.value,
    }));
    setItems(allItems);
    setFilteredItems(allItems);
  }, [claims]);

  const [items, setItems] = useState<ClaimRow[]>([]);
  const [filteredItems, setFilteredItems] = useState<ClaimRow[]>([]);

  const filterItems = (value: string | undefined) => {
    if (!value) setFilteredItems(items);

    const filtered = items.filter(
      (x) =>
        x.name.toLowerCase().includes(value?.toLowerCase() ?? '') ||
        x.displayName.toLowerCase().includes(value?.toLowerCase() ?? '')
    );
    setFilteredItems(filtered);
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
          items={filteredItems}
          compact={true}
          columns={columns}
          selectionMode={SelectionMode.none}
          getKey={(item, _) => item.key}
          setKey="none"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
        />
      </div>
    </div>
  );
};
