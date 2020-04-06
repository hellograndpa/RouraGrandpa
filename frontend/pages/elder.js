/** @format */

import SingleElder from '../components/elder/ElderView.component';

const ElderPage = (props) => (
  <>
    <h2>This Elder profile</h2>
    <SingleElder id={props.query.id} />
  </>
);

export default ElderPage;
