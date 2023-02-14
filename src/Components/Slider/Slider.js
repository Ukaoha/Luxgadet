import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';
import { SliderData } from './SliderData';
import  './Slider.scss';


const Slider = () => {
    const [currentSlide , setCurrentSlide] = useState(0);
    const slideLength = SliderData.length;

    // auto scroll 
    const autoScroll = true;
    let slideInterval ;
    let intervalTime = 5000;

    // slider logic 

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength -1 ? 0 : currentSlide + 1)
    };
    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0  ? slideLength - 1 : currentSlide -1)
    };

    useEffect(() => {
        setCurrentSlide(0)

    }, []);

    // const auto = () => {
    //     slideInterval = setInterval(nextSlide, intervalTime)
    // }


    useEffect(() => { 
        if(autoScroll) {
            // auto()
            const auto = () => {
                slideInterval = setInterval(nextSlide, intervalTime)
            }
            auto();
        
        }
        return () => clearInterval(slideInterval)

    }, [currentSlide , slideInterval , autoScroll ])





    return (
        <div className="slider">
            <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide}/>
            <AiOutlineArrowRight className='arrow next' onClick={nextSlide}/>

            {SliderData.map((slide, index) => {

                const {image , heading , desc} = slide 

                return(
                    <div key={index} className={index == currentSlide ? 'slide current' : 'slide' }>

                        {index === currentSlide   && (
                            <>
                            <div className='hero-content'>

                            <div className='content'>
                            <div className='hero-title'>
                                 <h2>{heading}</h2>
                          </div>
                          <div>
                                <p>{desc}</p>
                        </div>
                              <button className='btn-blue'><a href='#products' className='--btn--btn-primary'> Shop now</a></button>  
                            </div>
                            <div>
                                       <img src={image} alt='slide' />
                            </div>
 

                            </div>
                            </>

                        )}




                    </div>
                )

            }) }
            
        </div>
    )
}


export default Slider ;