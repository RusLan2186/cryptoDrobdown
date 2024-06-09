import Dropdown from '../Drobdown/Drobdown';
import cl from './Header.module.css'

const Header = () => {
  const coins = ['DOGE', 'BTC', 'XTZ', 'ETH'];

  return (
    <div>
      <header>
        <nav>
          <ul className={cl.header__menu}>
            {coins.map((coin) => (
              <li key={coin}>
                <a className={cl.header__link} href='#'>
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
