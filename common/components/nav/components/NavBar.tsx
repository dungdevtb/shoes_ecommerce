import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { defaultEase } from '@/common/animations/easings';
import cartAtom, { useToggleCart } from '@/common/recoil/cart';
import filterAtom, { defaultFilter } from '@/common/recoil/filter';
import kidImage from '@/public/img/kid.jpg';
import menImage from '@/public/img/men.jpg';
import unisexImage from '@/public/img/unisex.jpg';
import womenImage from '@/public/img/women.jpg';

import { navBarAnimation } from '../animations/NavBar.animations';
import NavItem from './NavItem';
import NavMenu from './NavMenu';

const NavBar = ({ onHomePage = false }: { onHomePage?: boolean }) => {
  const {
    attributes: { products },
  } = useRecoilValue(cartAtom);

  const [animate, setAnimate] = useState<'from' | 'to'>('from');
  const [opened, setOpened] = useState(false);

  const { pathname } = useRouter();

  const toggleCartOpened = useToggleCart();

  const setFilter = useSetRecoilState(filterAtom);

  useEffect(() => {
    if (onHomePage) {
      setAnimate('from');
      setTimeout(() => {
        setAnimate('to');
      }, 1600);
    } else setAnimate('to');
  }, [onHomePage]);

  return (
    <>
      <NavMenu opened={opened} setOpened={setOpened} />
      <motion.div
        variants={navBarAnimation}
        animate={animate}
        className="-mb-10"
        transition={{
          duration: animate === 'from' ? 0 : 0.4,
          ease: defaultEase,
        }}
      >
        <nav
          className={`z-50 flex items-center justify-between py-5 px-10 transition-colors xl:px-24 2xl:px-48 ${pathname === '/register' && 'text-white'
            }`}
        >
          <h2>
            <Link legacyBehavior href="/">
              {/* <a className="text-xl font-bold">Logo</a> */}
              <img style={{ width: '100px' }} src="data:image/jpeg;base64,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" alt="" />
            </Link>
          </h2>
          <div className="hidden gap-6 px-24 md:flex">
            <NavItem
              title="Men"
              linkTo="/shoes"
              image={menImage}
              handleClick={() =>
                setFilter({
                  ...defaultFilter,
                  gender: { ...defaultFilter.gender, men: true },
                })
              }
            />
            <NavItem
              title="Women"
              linkTo="/shoes"
              image={womenImage}
              handleClick={() =>
                setFilter({
                  ...defaultFilter,
                  gender: { ...defaultFilter.gender, women: true },
                })
              }
            />
            <NavItem
              title="Kids"
              linkTo="/shoes"
              image={kidImage}
              handleClick={() =>
                setFilter({
                  ...defaultFilter,
                  kids: { boys: true, girls: true },
                })
              }
            />
            <NavItem
              title="Unisex"
              linkTo="/shoes"
              image={unisexImage}
              handleClick={() =>
                setFilter({
                  ...defaultFilter,
                  gender: { ...defaultFilter.gender, unisex: true },
                })
              }
            />
          </div>
          <div>
            <Link legacyBehavior href="/register" passHref>
              <button className="btn-icon" aria-label="Account">
                <AiOutlineUser />
              </button>
            </Link>

            <button
              className="btn-icon relative ml-3"
              onClick={toggleCartOpened}
              aria-label="Cart"
            >
              {products.length > 0 && (
                <span className="absolute -top-1 h-5 w-5 rounded-full bg-red-500 text-sm">
                  {products.length}
                </span>
              )}

              <AiOutlineShoppingCart />
            </button>

            <button
              className="btn-icon ml-3 inline md:hidden"
              onClick={() => setOpened(true)}
              aria-label="Menu"
            >
              <AiOutlineMenu />
            </button>
          </div>
        </nav>
      </motion.div>
    </>
  );
};

export default NavBar;
