import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const MenuLink = ({ children, href, disabled }) => {
  const router = useRouter();
  const currentPathname = href.pathname ? href.pathname : href;

  return (
    <Link href={href}>
      <a disabled={disabled} className={currentPathname === router.pathname ? 'active' : ''}>
        {children}
      </a>
    </Link>
  );
};

export default MenuLink;
