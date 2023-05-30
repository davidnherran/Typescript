import React, { FC } from "react";
import { searchIcon } from "../../assets/icons";
import { SearchBarTypes } from "./types";
import { Searcher } from "./searchbar.sc"

const SearchBar: FC<{handleSearch: (value: string) => void}> = ({handleSearch}) : JSX.Element => {
  return (
    <Searcher>
      <img src={searchIcon} alt="search-icon" />
      <input
        type="text"
        name="search"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Buscar contenidos"
        autoComplete="off"
      />
    </Searcher>
  );
};

export default SearchBar;
