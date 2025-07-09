import React, { createContext, useContext, useState } from "react";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  const isInWatchlist = (movie) => {
    return watchlist.some((item) => item.id === movie.id);
  };

  const addToWatchlist = (movie) => {
    if (!isInWatchlist(movie)) {
      setWatchlist((prev) => [...prev, movie]);
    }
  };

  const removeFromWatchlist = (movie) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== movie.id));
  };

  const toggleWatchlist = (movie) => {
    isInWatchlist(movie) ? removeFromWatchlist(movie) : addToWatchlist(movie);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
