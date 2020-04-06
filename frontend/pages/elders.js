/** @format */

import Elders from '../components/elder/Elders';

const EldersPage = props => (
  <>
    <Elders page={parseFloat(props.query.page) || 1} />
  </>
);

export default EldersPage;
