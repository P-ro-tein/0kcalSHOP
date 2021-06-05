import React, { useCallback, useState } from "react";

import { Link } from "react-router-dom";
import { useGlobalDispatch } from "../GlobalContext";
import './Basic.css';

function Search() {
  const [searchText, setSearch] = useState("");
  const dispatch = useGlobalDispatch();

  const onChangeSearch = useCallback(() => {
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
      <div>
           <table>
        <td className="Tname">검색어</td>
        <td><input type="text" onChange={handleChange} value={searchText} /></td>
        <td>
            <Link to="/admin/psearch">
                <button onClick={onChangeSearch}>검색</button>
            </Link>
        </td>
    </table>
      </div>
  );
}

export default Search;
