import House from '../components/House';

// styled
import styled from 'styled-components';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const HousePage = props => (
  <Columns>
    <House />
  </Columns>
);

export default HousePage;