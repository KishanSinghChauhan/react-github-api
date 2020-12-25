import React from 'react'
const SearchBox = ({onSearchChange}) => {
    return (
        <div>
            <input placeholder='enter user name' onChange={onSearchChange}/>
        </div>
    )
}

export default SearchBox;
