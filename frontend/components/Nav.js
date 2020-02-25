import Link from 'next/link';
import User from './User';

const Nav = () => (
  <div>
    <User>
      {({ data: { me } }) => {
        if (me)
          return (
            <p>
              {me.name} {me.typeUser.typeName}
            </p>
          );
        return null;
      }}
    </User>
    <Link href="/signup">
      <a> GO TO SIGNUP</a>
    </Link>{' '}
    {' || '}{' '}
    <Link href="/">
      <a>got to home</a>
    </Link>
  </div>
);

export default Nav;
