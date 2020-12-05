import React from 'react';

const SearchBox = (props) => {
    return (
        <div>
            <input
                className="my-3 search-style"
                type='search'
                placeholder={props.placeholder}
                onChange={props.handleChange}
            />
        </div>
    );
};

export default SearchBox;