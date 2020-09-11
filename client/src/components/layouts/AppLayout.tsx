import React from 'react';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
}

function AppLayout({ children }: Props): React.ReactElement {
  return (
    <div>
      <Link href="/">
        <a>dev.readers</a>
      </Link>
      <span>Search</span>
      <Link href="/">
        <a>Login</a>
      </Link>
      {children}
    </div>
  );
}

export default AppLayout;
