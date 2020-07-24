import React from 'react';
import ColorPicker from './ColorPicker';
import CustomSlider from './CustomSlider';
import WakeupTimePicker from './WakeupTimePicker';

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
 }) => {

  return (
    <div>
      <div>
        <label>Wakeup Time</label>
        <div className="flex justify-start items-center">
          <WakeupTimePicker
            type={'wakeup'}
            getter={wakeupStart}
            setter={setwakeupStart}
          />
          <ColorPicker
            type={'Wakeup'}
            getter={wakeupColor}
            setter={setWakeupColor}
          />
        </div>
      </div>
      <div>
        <label>Day Time</label>
        <WakeupTimePicker
          type={'day'}
          getter={dayStart}
          setter={setDayStart}
        />
        <ColorPicker
          type={'Day'}
          getter={dayColor}
          setter={setDayColor}
        />
      </div>
      <div>
        <label>Night Time</label>
        <WakeupTimePicker
          type={'night'}
          getter={nightStart}
          setter={setNightStart}
        />
        <ColorPicker
          type={'Night'}
          getter={nightColor}
          setter={setNightColor}
        />
      </div>
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
      />
    </div>
  );
}

export default Settings;
