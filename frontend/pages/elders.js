/** @format */

import Elders from '../components/elder/Elders';

const EldersPage = props => (
  <>
    <h2>This is the Users List</h2>
    <Elders page={parseFloat(props.query.page) || 1} />
  </>
);

export default EldersPage;
