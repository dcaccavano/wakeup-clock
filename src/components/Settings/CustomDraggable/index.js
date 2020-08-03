import React from 'react';
import Draggable from 'react-draggable';

const CustomDraggable = ({ labelText, numToTime, getter, setter }) => {

  const [percent, setPercent] = React.useState(getter / 96);
  const [parentWidth, setParentWidth] = React.useState(null);
  const [leftOffset, setLeftOffset] = React.useState(null);
  const [showTool, setShowTool] = React.useState(false);

  const handleDrag = e => {
    let newPercent, newValue;
    if (e.clientX) {
      if ((e.clientX - 32) > parentWidth) {
        newPercent = 1
      } else if (e.clientX < 0) {
        newPercent = 0;
      } else {
        newPercent = (e.clientX - 32) / parentWidth;
      }
    } else if (e.targetTouches) {
      if ((e.targetTouches[0].clientX - 32) > parentWidth) {
        newPercent = 1
      } else if (e.targetTouches[0].clientX < 0) {
        newPercent = 0;
      } else {
        newPercent = (e.targetTouches[0].clientX - 32) / parentWidth;
      }
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
    >
      { leftOffset &&
        <Draggable
          axis="x"
          position={null}
          scale={1}
          bounds={'parent'}
          defaultPosition={{x: leftOffset, y: 0}}
          onDrag={handleDrag}>
          <div
            className="sliderDraggable -ml-2 absolute w-4 inset-0 bg-white cursor-move"
            onMouseEnter={() => setShowTool(true)}
            onMouseLeave={() => setShowTool(false)}
          >
          {
            showTool &&
            <div className="absolute w-32 h-16 text-white inset-0 bg-gray-700 mt-16 border-box p-2 -ml-12 text-center rounded">
              <p className="">{labelText}</p>
              <p className="leading-none">{numToTime(getter)}</p>
            </div>
          }
          </div>
        </Draggable>
      }
    </React.Fragment>
  );
}

export default CustomDraggable;
