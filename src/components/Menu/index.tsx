import React from 'react';
import {MenuLayout} from './styles';
import {OverflowMenu, MenuItem, OverflowMenuProps} from '@ui-kitten/components';

type MenuProps = {
  visible: boolean;
  onSelect: OverflowMenuProps['onSelect'];
  onBackdropPress: OverflowMenuProps['onBackdropPress'];
  menuItems: Array<{title: string}>;
  anchor: OverflowMenuProps['anchor'];
  selectedIndex: OverflowMenuProps['selectedIndex'];
  placement: OverflowMenuProps['placement'];
} & OverflowMenuProps;

const Menu = (props: MenuProps) => {
  return (
    <MenuLayout>
      <OverflowMenu {...props} fullWidth={true}>
        {props.menuItems.map((item, index) => (
          <MenuItem key={index} title={item.title} />
        ))}
      </OverflowMenu>
    </MenuLayout>
  );
};

export default Menu;
