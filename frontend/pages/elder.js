/** @format */

import Elder from '../components/elder/Elder.container';

const ElderPage = props => (
  <Elder
    id={props.query.id}
    assessment={parseFloat(props.query.assessment) || 1}
  />
);

export default ElderPage;
