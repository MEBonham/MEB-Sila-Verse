import React from 'react';
import { Menu, Item, Separator } from 'react-contextify';

const ContextMenu = props => (
    <Menu id={props.menuId}>
        <Item>Edit Hero</Item>
        <Item>View Hero in New Tab</Item>
        <Separator />
        <Item>Copy Link Address</Item>
    </Menu>
);

export default ContextMenu;