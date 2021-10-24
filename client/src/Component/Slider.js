import React, {useState, useEffect, useRef} from 'react';
import './Slider.css';
import Slide from './Slide';

function Slider({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  // const total_slides = slides.length;

  const showSlide = (index) => {
    setCurrentSlide(index);
    // if (index >= total_slides) {
    //   setCurrentSlide(0);
    // } else {
    //   setCurrentSlide(index);
    // }
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 2s ease-in-out';
    slideRef.current.style.transform = `translateY(-${currentSlide-1}00%)`
  }, [currentSlide])
  
  return (
    <div className='slider'>
      <div className='slides__container' ref={slideRef}>
        {slides.map((slide, index) => {
          return (
          currentSlide === index ? 
              <Slide currentSlide={currentSlide} className={'slide active'} index={index} text={slide.text} imgsrc={slide.image} />
          :
          <Slide currentSlide={currentSlide} className={'slide'} index={index} text={slide.text} imgsrc={slide.image}/>
          )
        })
      }
      </div>
      <div className='slide__button__container'>
      {slides.map((_, index) => {
          return (
            <a className={index === currentSlide ? 'current__view' : 'view' } onClick={()=>showSlide(index)}>●</a>
            )
      })}
      </div>
    </div>
  )
}

export default Slider
