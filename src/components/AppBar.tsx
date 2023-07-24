import React from 'react';

import Link from 'next/link';

import SigninButton from './SigninButton';

const AppBar = () => {
  return (
    <header className="flex gap-4 bg-gradient-to-b from-black to-gray-600 p-4 shadow">
      <Link className="transition-colors hover:text-blue-500" href={'/'}>
        Home Page
      </Link>
      <Link className="transition-colors hover:text-blue-500" href={'/UserPost'}>
        User Post Page
      </Link>
      <SigninButton />
    </header>
  );
};

export default AppBar;
