import React from 'react';
import styled from 'styled-components';
import { Color } from '@web/design/styles/color';
import { logError } from '@web/lib/logger';

const NAVBAR_TESTID = 'navbar';
const NAVBAR_RIGHT_ITEMS_TESTID = 'navbar-right-items';
const NAVBAR_LEFT_ITEMS_TESTID = 'navbar-left-items';

export interface NavbarProps {
  leftItems?: JSX.Element[];
  rightItems?: JSX.Element[];
}

const NavbarBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;
  height: 60px;
  background-color: ${Color.Blue100};
  box-shadow: 0 3px 3px -3px ${Color.Gray600};
  position: relative;
  z-index: 1;
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
        logError('Error: key not passed to <Navbar /> items');
      }

      return (
        <ItemWrapper key={item.key as string | number}>{item}</ItemWrapper>
      );
    }
  );
};

const Navbar = ({ leftItems, rightItems }: NavbarProps): JSX.Element => {
  return (
    <NavbarBox data-testid={NAVBAR_TESTID}>
      <Content>
        <ItemGroup data-testid={NAVBAR_LEFT_ITEMS_TESTID}>
          {renderItems(leftItems)}
        </ItemGroup>
        <ItemGroup data-testid={NAVBAR_RIGHT_ITEMS_TESTID}>
          {renderItems(rightItems)}
        </ItemGroup>
      </Content>
    </NavbarBox>
  );
};

export {
  Navbar,
  NAVBAR_RIGHT_ITEMS_TESTID,
  NAVBAR_LEFT_ITEMS_TESTID,
  NAVBAR_TESTID,
};
