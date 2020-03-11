/** @format */

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UserTech from './userTech/UserTech.component';
import User from './UserMe.component';

const UserDataContainer = props => (
  <User>
    {({ data: { me } }) => {
      switch (me.typeUser.typeName) {
        case 'Tech':
          return (
            <div>
              <p>
                {' '}
                <h3>Eres miembro de una asociación</h3>
              </p>
              <UserTech />
            </div>
          );
        case 'Student':
          return <h3>Eres estudiante</h3>;
        case 'Admin':
          return <h3>Eres admin</h3>;
      }
    }}
  </User>
);

export default UserDataContainer;
