import React from 'react'

const SearchBox = ({handleName}) => {
    return (
        <div>
            <input placeholder='enter user name' onChange={(e) => handleName(e.target.value)}/>
        </div>
    )
}

export default SearchBox
