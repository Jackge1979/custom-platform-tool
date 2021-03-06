import React from 'react';
import classnames from 'classnames';
import { FacToComponentProps, RegisterComponentConfig } from '@engine/visual-editor/spec';
// import ContainerWrapperCom from './ContainerWrapperCom';

export interface ComponentTypeRendererProps extends FacToComponentProps {
  className?
  registeredEntity: RegisterComponentConfig
}

const FormLabel = ({
  children,
  className = '',
  ...props
}) => (children ? (
  <div
    className="control-label form-title"
    {...props}
  >
    {children}
  </div>
) : null);

/**
 * 根据 component entity 解析的组件渲染器
 */
export const ComponentRenderer: React.FC<ComponentTypeRendererProps> = (props) => {
  const {
    entity,
    entityState = {},
    node,
    className,
    onClick,
    nestingInfo,
    registeredEntity,
    ...otherProps
  } = props;
  const { component } = entity;
  const { comp } = registeredEntity;

  const compContext = {
    entityState
  };
  // console.log(entityState);

  let Com = <div></div>;
  if (!component) return Com;

  const { type, ...compProps } = component;
  /**
   * 如果需要特殊处理，则在此做
   */
  switch (type) {
    default:
      const RendererComp = comp;
      Com = (
        <RendererComp
          compContext={compContext}
          {...entityState}
          {...compProps}
        />
      );
      break;
  }
  const classes = classnames(
    "comp-renderer",
    className
  );
  return (
    <div
      {...otherProps}
      onClick={onClick}
      className={classes}
    >
      {Com}
      <div className="__mark"></div>
    </div>
  );
};
