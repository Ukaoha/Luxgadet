import React from "react";
import { ReactDOM } from "react";
import { ColorRing } from "react-loader-spinner";
import  styles from './Loader.module.scss';
const Loader = () => {
    return ReactDOM.createPortal ( 
        <div className={styles.loader}>
            <ColorRing 
            visible={true}
            height="80"
            width="80"
            style={{
                background:"linear-gradiant(to right , white ,#0083b0)"
            }}
            />

        </div>,
        document.getElementById("loader")


     );
}
 
export default Loader;