import React from 'react';
import useLocalStorage from '../../../utils/use-local-storage';
import { SwatchesPicker } from 'react-color';

const ColorPicker = ({ type }) => {

  const [typeColor, setTypeColor] = useLocalStorage(`${type}Color`, '#ffffff');
  const [displayPicker, setDisplayPicker] = React.useState(false);

  const updateColor = color => {
    setTypeColor(color.hex);
    setDisplayPicker(false);
  };

  return (
    <div>
      <button
        onClick={() => setDisplayPicker(true)}
        className="selectedColor"
      >
        <span style={{ background: typeColor }}></span>
      </button>
      {
        displayPicker &&
        <SwatchesPicker
          color={typeColor}
          onChangeComplete={updateColor}
        />
      }

    </div>
  );
}

export default ColorPicker;
