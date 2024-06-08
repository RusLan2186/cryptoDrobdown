import React, { useState, useEffect } from 'react';
import '../../App.css';
import favIcon from '../../icons/star.svg';
import favIconActive from '../../icons/star__active.svg';
import Loader from '../Loader/Loader';

const Dropdown: React.FC = () => {
  const [coins, setCoins] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredCoins, setFilteredCoins] = useState<string[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [isShowFavourites, setIsShowFavorites] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActiveIcon, setIsActiveIcon] = useState<number[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [loadError, setLoadError] = useState('');

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
    const coinIndex = coins.indexOf(coin);
    const newActiveIcons = [...isActiveIcon];

    if (favourites.includes(coin)) {
      setFavourites(favourites.filter((fav) => fav !== coin));
      const indexToRemove = newActiveIcons.indexOf(coinIndex);
      if (indexToRemove !== -1) {
        newActiveIcons.splice(indexToRemove, 1);
        setIsActiveIcon(newActiveIcons);
      }
    } else {
      setFavourites([...favourites, coin]);
      setIsActiveIcon([...isActiveIcon, coinIndex]);
    }
  };

  useEffect(() => {
    if (isShowFavourites) {
      if (searchValue === '') {
        setFilteredCoins([...favourites]);
      } else {
        setFilteredCoins(
          favourites.filter((favItem) =>
            favItem.toLowerCase().includes(searchValue.toLowerCase()),
          ),
        );
      }
    } else {
      if (searchValue === '') {
        setFilteredCoins([...coins]);
      } else {
        setFilteredCoins(
          coins.filter((coin) =>
            coin.toLowerCase().includes(searchValue.toLowerCase()),
          ),
        );
      }
    }
  }, [searchValue, coins, favourites, isShowFavourites]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='dropdown-container'>
      {loadError && <div> Error: {loadError}</div>}
      <button
        onClick={toggleDropdown}
        className={isOpen ? 'active' : 'toggle-button'}
      >
        Search
      </button>

      {isOpen && (
        <>
          {isLoad
            && <Loader />}
          <div className='search__wrapper'>
            <input
              type='text'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='Search for a coin...'
              className='search-input'
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
              className='filter__item'
              onClick={() => setIsShowFavorites(true)}
            >
              Favourites
            </p>
            <p
              className='filter__item'
              onClick={() => setIsShowFavorites(false)}
            >
              All coins
            </p>
          </div>

          {filteredCoins.length === 0 && <h1>Not Found</h1>}

          {!isShowFavourites ? (
            <div className='dropdown-list'>
              {filteredCoins.map((coin, index) => (
                <div key={coin} className='dropdown-item'>
                  {isActiveIcon.includes(index) ? (
                    <img
                      onClick={() => handleFavorite(coin)}
                      className='fav-icon'
                      src={favIconActive}
                      alt='favourites'
                    />
                  ) : (
                    <img
                      onClick={() => handleFavorite(coin)}
                      className='fav-icon'
                      src={favIcon}
                      alt='favourites'
                    />
                  )}

                  {coin}
                </div>
              ))}
            </div>
          ) : (
            <div className='dropdown-list'>
              {filteredCoins.map((favorite) => (
                <div key={favorite} className='dropdown-item'>
                  <img
                    onClick={() => handleFavorite(favorite)}
                    className='fav-icon'
                    src={favIconActive}
                    alt='favourites'
                  />
                  {favorite}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dropdown;
