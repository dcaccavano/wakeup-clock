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
          className="sliderBar h-12 absolute w-full"
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
            <div className="border-l border-r border-gray-400 absolute -mt-8 text-center textSpan w-full text-gray-600">Waking</div>
            <button
              onClick={(e) => setShowWakeupColorPicker(true)}
              style={{
                background: wakeupColor,
              }}
              className="box wakeupBox h-12 absolute w-full" >
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
            <div className="border-r border-gray-400 absolute -mt-8 text-center textSpan w-full text-gray-600">Day</div>
            <button
              onClick={(e) => setShowDayColorPicker(true)}
              style={{
                background: dayColor,
              }}
              className="box wakeupBox h-12 absolute w-full" >
            </button>
          </div>
        </React.Fragment>
      }
      <CustomDraggable labelText={'Waking Up'} numToTime={numToTime} getter={wakeupStart} setter={setwakeupStart} />
      <CustomDraggable labelText={'Day Begins'} numToTime={numToTime} getter={dayStart} setter={setDayStart} />
      <CustomDraggable labelText={'Bed Time'} numToTime={numToTime} getter={nightStart} setter={setNightStart} />
    </div>
  );
};

export default CustomSlider;
