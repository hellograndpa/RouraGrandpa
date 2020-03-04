import Users from '../components/users/Users';

const UsersPage = props => (
  <>
    <h2>This is the Users List</h2>
    <Users page={parseFloat(props.query.page) || 1} />;
  </>
);

export default UsersPage;
