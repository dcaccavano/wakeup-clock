import React from 'react';
import ColorPicker from '../ColorPicker';
import CustomDraggable from '../CustomDraggable';
import moment from 'moment';

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
  numToTime,
}) => {

  const [parentWidth, setParentWidth] = React.useState(null);

  const [showWakeupColorPicker, setShowWakeupColorPicker] = React.useState(false);
  const [showDayColorPicker, setShowDayColorPicker] = React.useState(false);
  const [showNightColorPicker, setShowNightColorPicker] = React.useState(false);

  const parentElement = React.useRef(null);

  const ticks = new Array(96).fill(0).map((item, index) => {
    const addMinutes = index * 15
    return index % 8 === 0 ? { value: index, label: moment().startOf('day').add(addMinutes, 'm').format('h:mm a') } : { value: index }
  });

  React.useEffect(() => {
    setParentWidth(parentElement.current.clientWidth);
  }, [])

  return (
    <div
      ref={parentElement}
      id="sliderParentContainer"
      className="sliderContainer relative h-12 w-full">
      {
        parentWidth &&
        <div className="ticksContainer absolute w-full">
          { ticks.map((tick) => <div
              className={`tick absolute w-px h-4 bg-gray-400 ${ tick.label ? 'bg-gray-700' : ''}`}
              style={{left: Math.floor(( tick.value / 96 ) * parentWidth) }}
            >
              {
                tick.label && <div className="tickLabel text-center">{ tick.label  }</div>
              }
            </div>)}
        </div>
      }
      <div className="relative">
        <ColorPicker
          getter={nightColor}
          setter={setNightColor}
          show={showNightColorPicker}
          setShow={setShowNightColorPicker}
        />
        <button
          onClick={(e) => setShowNightColorPicker(true)}
          style={{ background: nightColor }}
          className="sliderBar border-none h-12 absolute w-full hover:shadow-lg"
        >
        </button>
      </div>
      { parentWidth &&
        <React.Fragment>
          <div
            style={{
              left: Math.floor(( wakeupStart / 96 ) * parentWidth),
              width: Math.floor(( dayStart / 96 ) * parentWidth) - Math.floor(( wakeupStart / 96 ) * parentWidth)
            }}
            className="relative">
            <ColorPicker
              getter={wakeupColor}
              setter={setWakeupColor}
              show={showWakeupColorPicker}
              setShow={setShowWakeupColorPicker}
            />
            <button
              onClick={(e) => setShowWakeupColorPicker(true)}
              style={{
                background: wakeupColor,
              }}
              className="box wakeupBox border-none h-12 absolute w-full hover:shadow-lg" >
              Wakeup
            </button>
          </div>
          <div
            style={
              {
                left: Math.floor(( dayStart / 96 ) * parentWidth),
                width: Math.floor(( nightStart / 96 ) * parentWidth) - Math.floor(( dayStart / 96 ) * parentWidth)
              }
            }
            className="relative">
            <ColorPicker
              getter={dayColor}
              setter={setDayColor}
              show={showDayColorPicker}
              setShow={setShowDayColorPicker}
            />
            <button
              onClick={(e) => setShowDayColorPicker(true)}
              style={{
                background: dayColor,
              }}
              className="box wakeupBox border-none h-12 absolute w-full hover:shadow-lg" >
              Day
            </button>
          </div>
        </React.Fragment>
      }
      <CustomDraggable type={'Wake up'} numToTime={numToTime} getter={wakeupStart} setter={setwakeupStart} />
      <CustomDraggable type={'Day'} numToTime={numToTime} getter={dayStart} setter={setDayStart} />
      <CustomDraggable type={'Bed'} numToTime={numToTime} getter={nightStart} setter={setNightStart} />
    </div>
  );
};

export default CustomSlider;
