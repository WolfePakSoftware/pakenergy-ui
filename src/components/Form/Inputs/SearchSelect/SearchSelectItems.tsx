import React, { useCallback, useEffect, useState } from 'react';
import { Keys, Menu, MenuItem } from '@blueprintjs/core';
import { isArray, findIndex } from 'lodash';
import VirtualList from 'react-tiny-virtual-list';

import { IItem } from '../../types';
import { SelectItemCheckbox } from './styled';

interface IProps {
  options: IItem[];
  selection: any;
  multi?: boolean;
  selectDeselectItem: (value: IItem) => void;
  invokeKeyPress?: number | 'NONE';
  allowNewItem?: boolean;
  onAddNewItem?: () => void;
  search: string;
  allowEmpty?: boolean;
  onKeyPressed?:()=>void
}

export const SearchSelectItems = (props: IProps) => {
  const [active, setActive] = useState<any>(null);
  const [isKeyUpOrDownPressed, setIsKeyUpOrDownPressed] = useState<boolean>(false)

  const findOptionsIndexValue = (
    options: IItem[],
    value: number | string
  ): any => {
    return findIndex(
      options,
      (v: IItem) => v.value.toString() === value.toString()
    );
  };

  useEffect(() => {
    if (props.invokeKeyPress !== 'NONE') {
      switch (props.invokeKeyPress) {
        case Keys.ARROW_DOWN:
          onKeyDown();
          break;
        case Keys.ARROW_UP:
          onKeyUp();
          break;
        case Keys.DELETE:
          setIsKeyUpOrDownPressed(false)
          setActive(-1);
          props.onKeyPressed && props.onKeyPressed();

          break;
        case Keys.ENTER:
          if (props.options[active]) {
            props.selectDeselectItem(props.options[active]);
          }
          props.onKeyPressed && props.onKeyPressed();
      }
    }
  }, [props.invokeKeyPress]);

  useEffect(() => {
    const index = findOptionsIndexValue(props.options, props.selection);
    setActive(index);
  }, [props.selection]);

  const onKeyUp = () => {
    active === 0 ? setActive(props.options.length - 1) : setActive(active - 1);
    setIsKeyUpOrDownPressed(true)
  };

  const onKeyDown = () => {
    active === props.options.length - 1 ? setActive(0) : setActive(active + 1);
    setIsKeyUpOrDownPressed(true)
  };

  const getSelectedLabel = (value: any) => {
    if (props.multi && isArray(props.selection)) {
      return (
        <SelectItemCheckbox
          checked={props.selection.includes(value)}
          onClick={() => props.selectDeselectItem(value)}
        />
      );
    }
    return null;
  };


  const getVirtualHeight = useCallback(() => {
    return props.options.length > 4 ? 150 : 30 * props.options.length + 1;
  }, [props.options]);

  return (
    <Menu>
      {props.allowEmpty && !props.multi && (
        <MenuItem
          active={ !isKeyUpOrDownPressed && (active === -1 || props.selection === '')}
          className={'select-item'}
          text={'No Selection'}
          onClick={() => props.selectDeselectItem({ value: '', label: '' })}
        />
      )}
      {props.options.length > 0 ? (
        <VirtualList
          scrollToIndex={active}
          width="100%"
          height={getVirtualHeight()}
          itemCount={props.options.length}
          itemSize={30} // Also supports variable heights (array or function getter)
          renderItem={({ index, style }) => (
            <MenuItem
              style={style}
              active={index === active}
              key={index}
              className={'select-item'}
              icon={props.options[index].icon}
              text={props.options[index].label}
              labelElement={getSelectedLabel(props.options[index].value)}
              onClick={() => props.selectDeselectItem(props.options[index])}
            />
          )}
        />
      ) : props.allowNewItem ? (
        <MenuItem
          text={`Create ${props.search}`}
          icon={'add'}
          onClick={() => props.onAddNewItem && props.onAddNewItem()}
        />
      ) : (
        <MenuItem text={'No results.'} disabled />
      )}
    </Menu>
  );
};
