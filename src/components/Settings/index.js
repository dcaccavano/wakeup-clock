import React from 'react';
import CustomSlider from './CustomSlider';

const Settings = ({
  dayStart,
  setDayStart,
  wakeupStart,
  setwakeupStart,
  nightStart,
  setNightStart,
  dayColor,
  setDayColor,
  wakeupColor,
  setWakeupColor,
  nightColor,
  setNightColor,
  numToTime,
  showSettings,
  setShowSettings,
  reset,
 }) => {

  return (
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
      <CustomSlider
        dayStart={dayStart}
        setDayStart={setDayStart}
        wakeupStart={wakeupStart}
        setwakeupStart={setwakeupStart}
        nightStart={nightStart}
        setNightStart={setNightStart}
        dayColor={dayColor}
        setDayColor={setDayColor}
        wakeupColor={wakeupColor}
        setWakeupColor={setWakeupColor}
        nightColor={nightColor}
        setNightColor={setNightColor}
        numToTime={numToTime}
      />
    </div>
  );
}

export default Settings;
