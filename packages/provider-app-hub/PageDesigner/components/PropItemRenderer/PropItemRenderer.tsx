import React, { useState } from 'react';
import { PropItemRendererProps } from '@engine/visual-editor/components/PropertiesEditor/types';
import { getPropItem } from '@spec/business-widget/getPropItem';
import { FXContainer } from './FXContainer';

/**
 * 属性项渲染器
 * 根据属性项的 type 选择对应的组件进行渲染
 */
export const PropItemRenderer: React.FC<PropItemRendererProps> = ({
  propItemConfig,
  propItemValue,
  onChange,
}) => {
  const {
    label, propItemCompDef, type, useFx,
    defaultValue
  } = propItemConfig;
  const { type: propItemCompType, ...propsForComponent } = propItemCompDef;

  // console.log('propItemConfig', propItemConfig);
  // console.log('propItemValue', propItemValue);
  let Com;
  const { render: propItemRenderer } = getPropItem(propItemCompType);
  // const { comp } = propItemConfig;
  switch (propItemCompType) {
    // case 'Input':
    //   const Input = comp;
    //   Com = (
    //     <div>
    //       <Input
    //         {...propsForComponent}
    //         value={propItemValue || ''}
    //         onChange={(value) => {
    //         // console.log(e.target.value);
    //           onChange(value, propItemConfig);
    //         }}
    //       />
    //       {
    //         // TODO: 确定需求，是否固定值和表达式只能存在一个
    //         useFx && (
    //           <FXContainer
    //             onChange={(val) => {
    //             // TODO: 完善 useFx
    //               console.log('useFx change:', val);
    //             }}
    //           />
    //         )
    //       }
    //     </div>
    //   );
    //   break;
    // case 'Selector':
    //   const Selector = comp;
    //   Com = (
    //     <Selector
    //       {...propsForComponent}
    //       value={propItemValue || ''}
    //       onChange={(value) => {
    //         // console.log(e.target.value);
    //         onChange(value, propItemConfig);
    //       }}
    //     />
    //   );
    //   break;
    // case 'FieldSelector':
    //   const FieldSelector = comp;
    //   Com = (
    //     <FieldSelector
    //       {...propsForComponent}
    //       value={propItemValue || ''}
    //       onChange={(value) => {
    //         // console.log(e.target.value);
    //         onChange(value, propItemConfig);
    //       }}
    //     />
    //   );
    //   break;
    default:
      Com = propItemRenderer({});
      break;
  }
  return (
    <div className="mb10">
      <div className="label mb5">{label}</div>
      <div className="content">{Com}</div>
    </div>
  );
};