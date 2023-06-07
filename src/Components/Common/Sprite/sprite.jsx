import React, { useEffect, useState } from 'react';
import { Children } from 'react';
import { GetRootDirectory } from '../../../Tools/Utils';
import './sprite.scss'

const GetImageUrl = imageName =>  {
  return `${GetRootDirectory()}/Graficos/${imageName}.png`
}

const Sprite = ({imageName, x, y, width, height, styles, innerRef,...otherProps}) => {
  const imageUrl =  GetImageUrl(imageName)
  var sectionStyle = { 
    width: `${width}px`,
    height: `${height}px`,
    overflow: 'hidden'
  };
  var innerStyle = {
    left: `${-x}px`,
    top: `${-y}px`
  }
  return imageUrl ? (
    <div ref={innerRef} style={sectionStyle} className={'managed-sprite ' + styles} {...otherProps}
      onDragStart={ evt => {evt.preventDefault(); return false;}}>
      <img src={imageUrl} className="image"  style={innerStyle} />
    </div>
  ) : null;
};

export default Sprite;