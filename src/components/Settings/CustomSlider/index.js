import React from 'react';
import moment from 'moment';
import Draggable from 'react-draggable';
import CustomDraggable from '../CustomDraggable';

const CustomSlider = ({
  wakeupStart,
  setwakeupStart,
  dayStart,
  setDayStart,
  nightStart,
  setNightStart,
  wakeupColor,
  setWakeupColor,
  dayColor,
  setDayColor,
  nightColor,
  setNightColor,
}) => {

  const [parentWidth, setParentWidth] = React.useState(null);

  const parentElement = React.useRef(null);

  const format = 'h:mm a';

  const valueText = value => `the value is ${value}`

  const marks = new Array(96).fill(0).map((item, index) => {
    const addMinutes = index * 15
    return index % 8 === 0 ? { value: index, label: moment().startOf('day').add(addMinutes, 'm').format(format) } : { value: index, label: "" }
  });

  React.useEffect(() => {
    setParentWidth(parentElement.current.clientWidth);
  }, [])

  return (
    <div
      ref={parentElement}
      id="sliderParentContainer"
      className="sliderContainer relative h-8 w-full mb-8">
      <div
        style={{ background: nightColor }}
        className="sliderBar h-8 absolute w-full"
      ></div>
      { parentWidth &&
        <React.Fragment>
          <div
            style={{
              background: wakeupColor,
              left: Math.floor(( wakeupStart / 96 ) * parentWidth),
              width: Math.floor(( dayStart / 96 ) * parentWidth) - Math.floor(( wakeupStart / 96 ) * parentWidth)
            }}
            className="box wakeupBox h-8 absolute"
          ></div><div
          style={{
            background: dayColor,
            left: Math.floor(( dayStart / 96 ) * parentWidth),
            width: Math.floor(( nightStart / 96 ) * parentWidth) - Math.floor(( dayStart / 96 ) * parentWidth)
          }}
            className="box dayBox h-8 absolute"
          ></div>
        </React.Fragment>
      }
      <CustomDraggable getter={wakeupStart} setter={setwakeupStart} />
      <CustomDraggable getter={dayStart} setter={setDayStart} />
      <CustomDraggable getter={nightStart} setter={setNightStart} />
    </div>
  );
};

export default CustomSlider;
