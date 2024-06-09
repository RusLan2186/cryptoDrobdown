import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';
import favIcon from '../../icons/star.svg';
import favIconActive from '../../icons/star__active.svg';
import searchIcon from '../../icons/search.svg';
import favFilterIcon from '../../icons/favFilter.svg';
import Loader from '../Loader/Loader';
import './Drobdown.css';

const Dropdown: React.FC = () => {
  const [coins, setCoins] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredCoins, setFilteredCoins] = useState<string[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [isShowFavourites, setIsShowFavorites] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState(false);
  const [loadError, setLoadError] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsLoad(true);
    fetch('https://api-eu.okotoki.com/coins')
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
        setIsLoad(false);
        setLoadError('');
      })
      .catch((error) => {
        setLoadError(`Error fetching the coin data, ${error}`);
        setIsLoad(false);
      });
  }, []);

  const handleFavorite = (coin: string) => {
    setFavourites((prevFavourites) =>
      prevFavourites.includes(coin)
        ? prevFavourites.filter((fav) => fav !== coin)
        : [...prevFavourites, coin],
    );
  };

  useEffect(() => {
    const sourceList = isShowFavourites ? favourites : coins;
    setFilteredCoins(
      sourceList.filter((coin) =>
        coin.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    );
  }, [searchValue, coins, favourites, isShowFavourites]);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  },[isOpen])

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
};

  return (
    <div className='dropdown-wrapper'>
      <div
        onClick={toggleDropdown}
        className={isOpen ? 'active' : 'search__button'}
      >
        <img src={searchIcon} alt='search' />
        <button className='toggle-button'>SEARCH</button>
      </div>

      <div className={isOpen ? 'dropdown-container' : ''}>
        {isOpen && (
          <>
            {isLoad && <div className='loader'><Loader /></div> }
            {loadError && <div className='error'> Error: {loadError}</div>}
            <div className='search__wrapper'>
              <img className='search__icon' src={searchIcon} alt='search' />
              <input
                type='text'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className='search-input'
                placeholder='Search for a coin...'
                ref={searchInputRef}
              />
              {searchValue && (
                <span
                  onClick={() => setSearchValue('')}
                  className='clear__search'
                >
                  X
                </span>
              )}
            </div>

            <div className='filter__coins'>
              <p
                className={
                  isShowFavourites
                    ? 'filter__item filter__active'
                    : 'filter__item'
                }
                onClick={() => setIsShowFavorites(true)}
              >
                <img src={favFilterIcon} alt='favFilterIcon' />
                FAVORITES
              </p>
              <p
                className={
                  !isShowFavourites
                    ? 'filter__item filter__active'
                    : 'filter__item'
                }
                onClick={() => setIsShowFavorites(false)}
              >
                ALL COINS
              </p>
            </div>

            {filteredCoins.length === 0 && !loadError && <h1>Not Found</h1>}

            <div className='dropdown-list'>
              {filteredCoins.map((coin) => (
                <div key={coin} className='dropdown-item'>
                  <img
                    onClick={() => handleFavorite(coin)}
                    className='fav-icon'
                    src={favourites.includes(coin) ? favIconActive : favIcon}
                    alt='favourites'
                  />
                  {coin}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
