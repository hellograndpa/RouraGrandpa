import User from '../components/User';

const ProfilePage = props => (
  <User>
    {({ data: { me } }) => {
      if (me)
        return (
          <p>
            Hello {me.name} you type of user is {me.typeUser.typeName}
          </p>
        );
      return null;
    }}
  </User>
);

export default ProfilePage;
