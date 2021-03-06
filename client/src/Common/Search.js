import React, { useCallback, useState } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { useGlobalDispatch } from "../GlobalContext";
import "../AllCss.css";

const SearchBox = styled.input`
  width: 230px;
  border: #d8d8d8 0.5px solid;
  height: 30px;
  margin-top: 35px;
`;

const SearchImg = styled.img`
  position: relative;
  left: -35px;
  top: 8px;
`;

function Search() {
  const [searchText, setSearch] = useState("");
  const dispatch = useGlobalDispatch();

  const onChangeSearch = useCallback(() => {
    console.log(searchText);
    dispatch({
      type: "SET_SEARCH",
      searchText,
    });

    setSearch("");
  }, [dispatch, searchText]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <SearchBox onChange={handleChange} value={searchText}></SearchBox>
      <Link to="/client/SearchItem">
        <SearchImg
          alt="search"
          src="data:image/png;base64,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"
          width="20"
          onClick={onChangeSearch}
        ></SearchImg>
      </Link>
    </>
  );
}

export default Search;
