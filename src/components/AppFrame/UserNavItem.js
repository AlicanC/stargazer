// @flow

import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

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
          <div>
            <img
              className="mr-1"
              src={user.avatarUrl}
              alt={`${user.name}'s Avatar`}
              style={{ width: '20px', borderRadius: '10px' }}
            />
            {user.name}
          </div>
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
