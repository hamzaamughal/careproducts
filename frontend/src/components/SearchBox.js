import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { debounce } from 'lodash'; // Optional: You can also implement debounce manually

const SearchBox = ({ history, closeSearch }) => {
  const [keyword, setKeyword] = useState('');
  const searchRef = useRef(null);

  // Debounce function to auto search after user stops typing for 1 second
  const delayedSearch = debounce((searchTerm) => {
    if (searchTerm.trim()) {
      history.push(`/search/${searchTerm}`);
    } else {
      history.push('/');
    }
  }, 1000); // 1 second delay

  // Handle search input
  const onSearchChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    delayedSearch(value); // Trigger debounce search
  };

  // Close search when clicking outside the search box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        closeSearch(); // Close the search box when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeSearch]);

  return (
    <Form ref={searchRef} className="search-form" inline>
      <Form.Control
        type="text"
        value={keyword}
        name="q"
        onChange={onSearchChange}
        placeholder="Search Products..."
        className="mr-sm-3 ml-sm-7"
        autoFocus
      />
    </Form>
  );
};

export default SearchBox;
