import React from 'react';
import Link from 'next/link';

function Header(): React.ReactElement {
  return (
    <div>
      <Link href="/">
        <a>dev.readers</a>
      </Link>
      <Link href="/search">
        <a>Search</a>
      </Link>
      <Link href="/profile">
        <a>Profile</a>
      </Link>
    </div>
  );
}

export default Header;
