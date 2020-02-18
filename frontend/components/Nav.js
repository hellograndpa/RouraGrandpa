import Link from 'next/link';

const Nav = () => (
  <div>
    <Link href="/about">
      <a>go to about</a>
    </Link>
    <Link href="/">
      <a>got to home</a>
    </Link>
  </div>
);

export default Nav;
