import React from 'react';
import {BiSearch} from 'react-icons/bi'
import styles from './Search.module.scss'


const Search = ({value , onChange}) => {
    return (
        <div className={styles.search}>
            <input type='text' placeholder='Search by name' value={value} onChange={onChange}/>
            <BiSearch size={18} className={styles.icon}/>

            
        </div>
    );
}

export default Search;
