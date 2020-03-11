/** @format */

import UserTechView from './userTech/UserTechView.component';

const UserDataViewContainer = props => {
  const { me } = props;
  const { typeName } = props.me.typeUser;

  switch (typeName) {
    case 'Tech':
      return (
        <div>
          <h3>Eres miembro de una asociación</h3>
          <UserTechView me={me} />
        </div>
      );
    case 'Student':
      return <h3>Eres estudiante</h3>;
    case 'Admin':
      return <h3>Eres admin</h3>;
  }
};

export default UserDataViewContainer;
