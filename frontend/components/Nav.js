import Link from 'next/link';

const Nav = () => (
  <div>
    <Link href="/signup">GO TO SIGNUP</Link>
    {' || '} <Link href="/">got to home</Link>
  </div>
);

export default Nav;
