import React from 'react';

export const GroupItemsRender = ({
  itemsGroups,
  groupType,
  itemRenderer,
}) => {
  return itemsGroups && itemsGroups.map((ig, idx) => {
    const {
      title: igTitle,
      items,
    } = ig;
    return (
      <div key={`${groupType}_${idx}`} className="items-group">
        <div className="group-title">
          {igTitle}
        </div>
        <div className="items-content">
          {
            items && items.map((item, _idx) => {
              const itemKey = `${idx}_${_idx}`;
              return (
                <div className="item" key={itemKey}>{itemRenderer(item, groupType)}</div>
              );
            })
          }
        </div>
      </div>
    );
  });
};
