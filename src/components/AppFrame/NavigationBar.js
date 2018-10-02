// @flow

import * as React from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';

import UserNavItem from './UserNavItem';

type Props = {
  isCollapseOpen: boolean,
  onToggleCollapseClick: Function,
};

export default function NavigationBar(props: Props) {
  const { isCollapseOpen, onToggleCollapseClick } = props;

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand tag={Link} to="/">
        Superstargazer
      </NavbarBrand>
      <NavbarToggler onClick={onToggleCollapseClick} />
      <Collapse isOpen={isCollapseOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">
              Your Superstars
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/hunt">
              Hunt Superstars
            </NavLink>
          </NavItem>
          <UserNavItem />
        </Nav>
      </Collapse>
    </Navbar>
  );
}
