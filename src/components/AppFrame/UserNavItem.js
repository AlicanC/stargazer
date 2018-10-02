// @flow

import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'react-emotion';

const UserAvatarImage = styled('img')`
  border-radius: 10px;
  width: 20px;
`;

type Props = {
  data: Object,
};

function UserNavItem(props: Props) {
  const { data } = props;

  const user = !data.loading && !data.error && data.viewer;

  return (
    <NavItem>
      <NavLink tag={Link} to="/login">
        {user ? (
          <>
            <UserAvatarImage className="mr-1" src={user.avatarUrl} alt={`${user.name}'s Avatar`} />
            <span>{user.name}</span>
          </>
        ) : (
          'Login'
        )}
      </NavLink>
    </NavItem>
  );
}

export default graphql(gql`
  query UserNavItemQuery {
    viewer {
      id
      name
      avatarUrl
    }
  }
`)(UserNavItem);
