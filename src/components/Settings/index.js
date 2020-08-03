import React from 'react';
import CustomSlider from './CustomSlider';
import { ClockContext } from '../../context';

const Settings = ({ lightOrDark, showSettings, setShowSettings }) => {
  const [
    [wakeupStart, setwakeupStart, wakeupColor, setWakeupColor],
    [dayStart, setDayStart, dayColor, setDayColor],
    [nightStart, setNightStart, nightColor, setNightColor],
    [now, setNow, nowToNum, numToTime],
    [backgroundColor, setBackgroundColor],
    format
  ] = React.useContext(ClockContext);

  const reset = () => {
    setDayStart(36);
    setwakeupStart(28);
    setNightStart(80);

    setDayColor('#fff9c4');
    setWakeupColor('#81c784');
    setNightColor('#455a64');
  }

  const updateBackgroundColor = now => {
    if (now > wakeupStart) {
      if (now >   dayStart) {
        if (now < nightStart) {
          setBackgroundColor(dayColor);
        } else {
          setBackgroundColor(nightColor);
        }
      } else {
        setBackgroundColor(wakeupColor);
      }
    } else {
      setBackgroundColor(nightColor);
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(nowToNum());
    }, 60000);
    return () => clearInterval(interval);
    updateBackgroundColor(now);
  }, [])

  React.useEffect(() => {
    updateBackgroundColor(now);
  }, [
    now,
    wakeupStart,
    dayStart,
    nightStart,
  ]);

  React.useEffect(() => {
    updateBackgroundColor(now);
  }, [
    dayColor,
    nightColor,
    wakeupColor,
  ]);

  return (
    <React.Fragment>
      <button
        className={`absolute top-0 right-0 mt-4 mr-4 ${lightOrDark(backgroundColor) === 'light' ? 'text-gray-800' : 'text-white'}`}
        onClick={(e) => setShowSettings(true)}
      >
        Show Settings
      </button>
      <div className={`settingsContainer shadow-lg fixed inset-0 border-box py-12 px-8 ${ showSettings ? 'isVisible' : 'isHidden'}`}>
        <button
          className="absolute top-0 right-0 mt-4 mr-4"
          onClick={(e) => setShowSettings(false)}
        >
          Hide Settings
        </button>
        <button
          className="absolute top-0 left-0 mt-4 ml-4 text-red-700"
          onClick={reset}
        >
          Clear Settings
        </button>
        <CustomSlider />
      </div>
    </React.Fragment>
  );
}

export default Settings;
