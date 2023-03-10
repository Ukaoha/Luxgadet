import React from "react";
import { ColorRing } from "react-loader-spinner";
import styles from './Loader.module.scss';
import ReactDOM from "react-dom";  // <-- Correct import statement

const Loader = () => {
    return ReactDOM.createPortal( 
        <div className={styles.wrapper}>
        <div className={styles.loader}>
            <ColorRing 
            visible={true}
            height="80"
            width="80"
            style={{
                // background:"linear-gradiant(to right , white ,#0083b0)"
        background:' orangered'
        // background: ""
            }}
            />
            </div>
        </div>,
        document.getElementById("loader")
     );
}
 
export default Loader
