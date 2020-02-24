import Link from 'next/link';

const Nav = () => (
  <div>
    <Link href="/signup">
      <a> GO TO SIGNUP</a>
    </Link>
    {' || '}{' '}
    <Link href="/">
      <a>got to home</a>
    </Link>
  </div>
);

export default Nav;
