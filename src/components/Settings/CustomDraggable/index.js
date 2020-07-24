import React from 'react';
import moment from 'moment';
import Draggable from 'react-draggable';

const CustomDraggable = ({ getter, setter }) => {

  const [percent, setPercent] = React.useState(getter / 96);
  const [parentWidth, setParentWidth] = React.useState(null);
  const [leftOffset, setLeftOffset] = React.useState(null);

  const handleStop = e => {
    let newPercent, newValue;
    if (e.clientX > parentWidth) {
      newPercent = 1
    } else if (e.clientX < 0) {
      newPercent = 0;
    } else {
      newPercent = e.clientX / parentWidth;
    }
    newValue = Math.floor( 96 * newPercent );
    setter(newValue);
    setPercent(newPercent);
  }

  React.useEffect(() => {
    setPercent(getter / 96)
  }, [getter])

  React.useEffect(() => {
    setParentWidth(document.getElementById('sliderParentContainer').clientWidth);
  }, [])

  React.useEffect(() => {
    setLeftOffset(Math.floor(percent * parentWidth));
  }, [percent, parentWidth])

  return (
    <React.Fragment>
      { leftOffset &&
        <Draggable
          axis="x"
          position={null}
          scale={1}
          bounds={'parent'}
          defaultPosition={{x: leftOffset, y: 0}}
          onStop={handleStop}>
          <div
            className="sliderDraggable absolute w-8 h-8"
          >
            {getter}
          </div>
        </Draggable>
      }
    </React.Fragment>
  );
}

export default CustomDraggable;
