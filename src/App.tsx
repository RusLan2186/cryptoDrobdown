import { useState } from 'react';
import './App.css';
import Dropdown from './components/Drobdown/Drobdown';


function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const coins = ['DOGE', 'BTC', 'XTZ', 'ETH'];


  return (
    <div className='wrapper' onClick={() => setIsOpen(false)}>
      <header onClick={(event) => event.stopPropagation()}>
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
          <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} />
        </nav>
      </header>
    </div>
  );
}

export default App;
