import  styles from './Footer.module.scss'
import { Link} from 'react-router-dom';
import {AiOutlineTwitter, AiFillLinkedin} from 'react-icons/ai';


const date = new Date();
const year =date.getFullYear();

const logo = (
    <div className={styles.logo}>
        <Link to="/">
       <h2>
        Lu<span>xG</span>adget
        </h2>
        </Link>
        </div>


)

const Footer = () => {
    return ( 
        <div className={styles.footer}>
            <div className={styles['main-footer']}>
            
                        {logo}

                        <div className={styles.socials}>
                <Link to="https://twitter.com/chixobam" target="_blank" >
                    <AiOutlineTwitter size={28}/>
                    </Link>
             <Link to="https://twitter.com/chixobam" target="_blank" ><AiFillLinkedin size={28}/></Link>

                        </div>

        
    
            <div>
          &copy {year} all rights reserved 
    </div>
     
        </div>
        </div>
        
    
     );
}
 
export default Footer;