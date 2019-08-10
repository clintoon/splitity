import React from 'react';
import styled from 'styled-components';
import { Color } from '@web/design/styles/color';

export interface NavbarProps {
  leftItems?: JSX.Element[];
  rightItems?: JSX.Element[];
}

const NavbarBox = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  top: 0;
  margin: 0;
  height: 60px;
  background-color: ${Color.LightOrange};
  box-shadow: 0 4px 4px -4px ${Color.Gray};
`;

const ItemGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const ItemWrapper = styled.div`
  margin: 0 4px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 16px;
  width: 100%;
`;

const renderItems = (items?: JSX.Element[]): JSX.Element[] | null => {
  if (!items) {
    return null;
  }
  return items.map(
    (item): JSX.Element => {
      if (item.key === null) {
        console.error('Error: key not passed to <Navbar /> items');
      }

      return (
        <ItemWrapper key={item.key as string | number}>{item}</ItemWrapper>
      );
    }
  );
};

const Navbar = ({ leftItems, rightItems }: NavbarProps): JSX.Element => {
  return (
    <NavbarBox>
      <Content>
        <ItemGroup>{renderItems(leftItems)}</ItemGroup>
        <ItemGroup>{renderItems(rightItems)}</ItemGroup>
      </Content>
    </NavbarBox>
  );
};

export { Navbar, renderItems as renderItemsForTest };
