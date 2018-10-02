// @flow

import * as React from 'react';
import gql from 'graphql-tag';
import styled from 'react-emotion';

const UserAvatarImage = styled('img')`
  border-radius: 30px;
  width: 60px;
`;

type Props = {
  user: Object,
};

export default function ProfileView(props: Props) {
  const { user } = props;

  return (
    <div style={{ textAlign: 'center' }}>
      <UserAvatarImage className="mb-3" src={user.avatarUrl} alt={`${user.name}'s Avatar`} />
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
