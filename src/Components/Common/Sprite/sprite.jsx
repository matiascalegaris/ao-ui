import React, { useEffect, useState } from 'react';
import { GetRootDirectory } from '../../../Tools/Utils';
import './sprite.scss'

const GetImageUrl = imageName =>  {
  return `${GetRootDirectory()}/Graficos/${imageName}.png`
}

const Sprite = ({ imageName, x, y, width, height }) => {
  const imageUrl =  GetImageUrl(imageName)
  var sectionStyle = { 
    width: `${width}px`,
    height: `${height}px`
  };
  var innerStyle = {
    left: `${-x}px`,
    top: `${-y}px`
  }
  return imageUrl ? (
    <div className='managed-sprite' style={sectionStyle}>
      <img src={imageUrl} className="image"  style={innerStyle} />
    </div>
  ) : null;
};

export default Sprite;