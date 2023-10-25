import React from 'react';
import { Carousel } from 'antd';
import './style.css';

const contentStyle: React.CSSProperties = {
  height: '300px',
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  marginBottom: "5px",
};

const ImageCarousel: React.FC = () => (
  <Carousel autoplay >
    <div className='index1' >
      <h3  style={contentStyle}>1</h3>
    </div>
    <div className='index2'>
      <h3  style={contentStyle}>2</h3>
    </div>
    <div className='index3'>
      <h3  style={contentStyle}>3</h3>
    </div>
    <div className='index4'>
      <h3  style={contentStyle}>4</h3>
    </div>
  </Carousel>
);

export default ImageCarousel;