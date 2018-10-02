// @flow

import * as React from 'react';
import gql from 'graphql-tag';

type Props = {
  user: Object,
};

export default function ProfileView(props: Props) {
  const { user } = props;

  return (
    <div className="mb-3" style={{ textAlign: 'center' }}>
      <img
        className="mb-3"
        src={user.avatarUrl}
        alt={`${user.name}'s Avatar`}
        style={{ width: '60px', borderRadius: '30px' }}
      />
      <br />
      {user.name}
    </div>
  );
}

ProfileView.fragments = {
  user: gql`
    fragment ProfileViewUser on User {
      name
      avatarUrl
    }
  `,
};
