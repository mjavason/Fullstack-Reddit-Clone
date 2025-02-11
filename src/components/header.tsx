import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
} from '@heroui/react';
import HeaderAuth from './header-auth';
import SearchInput from '@/components/search-input';
import { Suspense } from 'react';

export default function HeaderNav() {
  return (
    <Navbar className='shadow mb-6'>
      <NavbarBrand>
        <Link href='/' className='font-bold'>
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify='center'>
        <NavbarItem>
          <Suspense>
            <SearchInput></SearchInput>
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <HeaderAuth></HeaderAuth>
      </NavbarContent>
    </Navbar>
  );
}
