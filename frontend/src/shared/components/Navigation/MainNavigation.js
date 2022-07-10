import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { MainHeader } from './MainHeader';
import { NavLinks } from './NavLinks';

import './MainNavigation.css';
import { SideDrawer } from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

export const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  return (
    <Fragment>
      {drawerIsOpen && <Backdrop onClick={() => setDrawerIsOpen(false)} />}

      <SideDrawer show={drawerIsOpen} onClick={() => setDrawerIsOpen(false)}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => setDrawerIsOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </Fragment>
  );
};
