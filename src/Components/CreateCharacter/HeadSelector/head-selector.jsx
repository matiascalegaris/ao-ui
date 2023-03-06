import SelectOption from '../../Common/SelectOption/select-option';
import Sprite from '../../Common/Sprite/sprite'
import './head-selector.scss'
import { useEffect, useRef, useState } from "react";

const buildArray = (start, end) =>{
  let array = []
  for (let i = start; i < end; i++) {
    array.push(window.parent.BabelUI.GetHeadDrawInfo(i))
    array[array.length-1] = {...array[array.length-1], index: i}
  }
  return array;
}
export default function HeadSelector({ children, onUpdateSelection, start, end, currentSelected, ...otherProps }) {
  const options = buildArray(start, end);
  const columns = Math.ceil(options.length /2); // calculate number of columns
  const containerRef = useRef(null);
  const strollAnimation = {
    container: containerRef.current,
    active: false,
    remaining: 0,
    step: 10
  }
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScrollButtons = () => {
    const container = containerRef.current;
    setShowLeftButton(container.scrollLeft > 0);
    setShowRightButton(container.scrollLeft + container.clientWidth < container.scrollWidth);
  };

  useEffect(() => {
    checkScrollButtons();
    const ref = containerRef.current
    ref.addEventListener("scroll", checkScrollButtons);
    return () => {
      ref.removeEventListener("scroll", checkScrollButtons);
    };
  }, []);
  const scrollLeft = (distance, strollAnimation) => {
    if (strollAnimation.active) return
    strollAnimation.active = true
    strollAnimation.remaining = distance;
    strollAnimation.step = distance
    const animate = () => {
      if (strollAnimation.remaining > 0) {
        strollAnimation.container.scrollBy(strollAnimation.step, 0);
        strollAnimation.remaining -= strollAnimation.step;
        requestAnimationFrame(animate);
      }
      else {
        strollAnimation.active = false
      }
    };
    animate();
  };

  const scrollRight = (distance, strollAnimation) => {
    if (strollAnimation.active) return
    strollAnimation.active = true
    strollAnimation.remaining = distance;
    strollAnimation.step = distance
    const animate = () => {
      if (strollAnimation.remaining > 0) {
        strollAnimation.container.scrollBy(-strollAnimation.step, 0);
        strollAnimation.remaining -= strollAnimation.step;
        requestAnimationFrame(animate);
      }
      else {
        strollAnimation.active = false
      }
    };
    animate();
  };
  
  return (
    <div className="selector">
      <div className='button-area'>
        { showLeftButton ?
        <div className='button' onClick={() => scrollRight(containerRef.current.clientWidth, strollAnimation)}>
          <img className='icon' src={require('../../../assets/Icons/ico_arrow_back.png')} />
        </div>
        : null
        }
      </div>
      <div className="container" ref={containerRef}>
        {Array.from({ length: columns }).map((_, columnIndex) => (
          <div className="head-column" key={columnIndex}>
            {options.slice(columnIndex * 2, columnIndex * 2 + 2).map((head, index) => (
              <SelectOption key={index} selected={head.index == currentSelected} styles="head-button" onClick={ ()=> {onUpdateSelection(head.index)}}>
                <Sprite
                  styles="offset-head"
                  imageName={head.imageNumber}
                  x={head.startX}
                  y={head.startY}
                  width={head.width}
                  height={head.height}
                />
              </SelectOption>
            ))}
          </div>
        ))}
      </div>
      <div className='button-area'>
        {
          showRightButton ?
            <div className='button' onClick={() => scrollLeft(containerRef.current.clientWidth, strollAnimation)}>
            <img className='arrow-right' src={require('../../../assets/Icons/ico_arrow_back.png')} />
            </div>
        : null
        }
      </div>
    </div>
  );
}