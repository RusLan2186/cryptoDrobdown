import React from 'react';
import Dropdown from '../Drobdown/Drobdown';

const Header = () => {
  const coins = ['DOGE', 'BTC', 'XTZ', 'ETH'];

  return (
    <div>
      <header>
        <nav>
          <ul className='header__menu'>
            {coins.map((coin) => (
              <li key={coin}>
                <a className='header__link' href='#'>
                  {coin}
                </a>
              </li>
            ))}
          </ul>
          <Dropdown />
        </nav>
      </header>
    </div>
  );
};

export default Header;
