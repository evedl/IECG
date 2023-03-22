import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetIdPublication } from '../../../../Service/GetPublication';

const slideStyles = {
  width: "100px",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const ImageSlider = ({ slides: urls }) => {
  const Publications = useSelector((state) => state.publication.Publications)
  const [current, setCurrent] = useState(0);
  const [imgs, setUrls] = useState([]);
  const length = urls.length;

  let {id} = useParams();
  useEffect(()=>{
    GetIdPublication(id).then(res=>{
      setUrls(res.data.Urls)
    }).catch((err)=>{
    })
  },[id])

  const setImgs = () => {
    return (
      imgs.map((publication, index) => {
        <div key={index}>
          return (
            <img src={publication.Urls[0]} style={slideStyles} />
          );
        </div>
      })
    )
  }
  
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(urls) || urls.length <= 0) {
    return null;
  }
  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${urls[current].Urls})`,
  };
  
  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
      <div style={slideStylesWidthBackground}></div>
    </section>
  );
};

export default ImageSlider;