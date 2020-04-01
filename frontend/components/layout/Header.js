/** @format */

import Navigation from './Nav';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => (
  <div>
    <div>
      <Link href="/">
        <a> LOGO </a>
      </Link>
    </div>
    <div>
      <Navigation />
    </div>
  </div>
);
export default Header;
