import React from 'react';
import Settings from './components/Settings';
import useLocalStorage from './utils/use-local-storage';
import moment from 'moment';

const App = () => {

  const format = 'h:mm a';

  const [dayStart, setDayStart] = useLocalStorage('dayStart', 36);
  const [wakeupStart, setwakeupStart] = useLocalStorage('wakeupStart', 28);
  const [nightStart, setNightStart] = useLocalStorage('nightStart', 80);

  const [dayColor, setDayColor] = useLocalStorage('dayColor', '#ffffff');
  const [wakeupColor, setWakeupColor] = useLocalStorage('wakeupColor', '#ffffff');
  const [nightColor, setNightColor] = useLocalStorage('nightColor', '#ffffff');

  const [now, setNow] = React.useState(moment());
  const [backgroundColor, setBackgroundColor] = React.useState('#ffffff');

  const updateBackgroundColor = now => {
    const timeRightNow = moment(now);
    const dayTimeStart = moment(dayStart);
    const wakeupTimeStart = moment(wakeupStart);
    const nightTimeStart = moment(nightStart);

    if (timeRightNow.isAfter(wakeupTimeStart)) {
      if (timeRightNow.isAfter(dayTimeStart)) {
        if (timeRightNow.isBefore(nightTimeStart)) {
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
      setNow(moment());
    }, 60000);
    return () => clearInterval(interval);
    updateBackgroundColor(now);
  }, [])

  React.useEffect(() => {
    updateBackgroundColor(now);
  }, [now])

  React.useEffect(() => {
    updateBackgroundColor(now);
  }, [dayColor, nightColor, wakeupColor])

  return (
    <div>
      <Settings
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
      <div className="w-screen h-screen" style={{ background: backgroundColor }}>{ now.format(format) }</div>
    </div>
  );
}

export default App;
