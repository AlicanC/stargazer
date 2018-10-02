// @flow

import * as React from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSearch } from '@fortawesome/free-solid-svg-icons';

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
              <FontAwesomeIcon icon={faStar} fixedWidth className="mr-2" />
              Your Superstars
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/hunt">
              <FontAwesomeIcon icon={faSearch} fixedWidth className="mr-2" />
              Hunt Superstars
            </NavLink>
          </NavItem>
          <UserNavItem />
        </Nav>
      </Collapse>
    </Navbar>
  );
}
