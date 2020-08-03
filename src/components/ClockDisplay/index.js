import React from 'react';
import { ClockContext } from '../../context';

const ClockDisplay = ({ lightOrDark }) => {
  const [
    [wakeupStart, setwakeupStart, wakeupColor, setWakeupColor],
    [dayStart, setDayStart, dayColor, setDayColor],
    [nightStart, setNightStart, nightColor, setNightColor],
    [now, setNow, nowToNum, numToTime],
    [backgroundColor, setBackgroundColor],
    format
  ] = React.useContext(ClockContext);


  return (
    <div
      style={{ background: backgroundColor }}
      className="clockWrapper w-screen h-screen"
    >

      <div className={`mainClock text-custom lg:text-customxl ${lightOrDark(backgroundColor) === 'light' ? 'darkText' : 'lightText'}`}>
        { numToTime(now) }
      </div>
    </div>
  );
};

export default ClockDisplay;
