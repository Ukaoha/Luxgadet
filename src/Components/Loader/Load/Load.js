import React from 'react';
import { ColorRing } from "react-loader-spinner";
import styles from './Load.module.scss';



const Load = () => {
    return (
        <div className={styles.wrapper}>
        <div className={styles.loader}>
            <ColorRing 
            visible={true}
            height="80"
            width="80"
            />
            </div>
        </div>

    );
}

export default Load;
