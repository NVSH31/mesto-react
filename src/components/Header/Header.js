import React from 'react';
import logoPath from '../../images/logoheader.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Mesto Russia" />
    </header>
  );
}

export default Header;
