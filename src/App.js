import React from 'react';
import Settings from './components/Settings';
import useLocalStorage from './utils/use-local-storage';
import moment from 'moment';
import './App.css';

const App = () => {

  const format = 'h:mm a';

  const nowToNum = () => moment().diff(moment().startOf('day'), 'minutes') / 15;

  const numToTime = minutes => moment().startOf('day').add(minutes * 15, 'm').format(format);

  const [dayStart, setDayStart] = useLocalStorage('dayStart', 36);
  const [wakeupStart, setwakeupStart] = useLocalStorage('wakeupStart', 28);
  const [nightStart, setNightStart] = useLocalStorage('nightStart', 80);

  const [dayColor, setDayColor] = useLocalStorage('dayColor', '#fff9c4');
  const [wakeupColor, setWakeupColor] = useLocalStorage('wakeupColor', '#81c784');
  const [nightColor, setNightColor] = useLocalStorage('nightColor', '#455a64');

  const [now, setNow] = React.useState(nowToNum());
  const [backgroundColor, setBackgroundColor] = React.useState('#ffffff');

  const [showSettings, setShowSettings] = React.useState(false);

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
      if (now > dayStart) {
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
  }, [now, wakeupStart, dayStart, nightStart])

  React.useEffect(() => {
    updateBackgroundColor(now);
  }, [dayColor, nightColor, wakeupColor, now])

  const lightOrDark = color => {

    let r, g, b, hsp;

    if (color.match(/^rgb/)) {
      color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
      r = color[1];
      g = color[2];
      b = color[3];
    }
    else {
      color = +("0x" + color.slice(1).replace(
      color.length < 5 && /./g, '$&$&'));

      r = color >> 16;
      g = color >> 8 & 255;
      b = color & 255;
    }

    hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
      );

    if (hsp>127.5) {
      return 'light';
    }
    else {
      return 'dark';
    }
  }

  return (
    <div>
      <button
        className={`absolute top-0 right-0 mt-4 mr-4 ${lightOrDark(backgroundColor) === 'light' ? 'text-gray-800' : 'text-white'}`}
        onClick={(e) => setShowSettings(true)}
      >
        Show Settings
      </button>
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
        numToTime={numToTime}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        reset={reset}
      />
      <div
        style={{ background: backgroundColor }}
        className="clockWrapper w-screen h-screen"
      >

        <div className={`mainClock ${lightOrDark(backgroundColor) === 'light' ? 'darkText' : 'lightText'}`}>
          { numToTime(now) }
        </div>
      </div>
    </div>
  );
}

export default App;
