import React from 'react';
import './SearchBox.scss'
const SearchBox = ({onSearchChange}) => {
    return (
        <div className='search-box'>
            <input
                className='search-input' 
                placeholder='enter user name'
                onChange={onSearchChange}
            />
        </div>
    )
}

export default SearchBox;
