/** @format */

import UserTechView from './userTech/UserTechView.component';
import UserStudentView from './userStudent/UserStudenView.component';

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
      return (
        <div>
          <h3>Eres estudiante</h3>
          <UserStudentView me={me} />
        </div>
      );
    case 'Admin':
      return <h3>Eres admin</h3>;
  }
};

export default UserDataViewContainer;
