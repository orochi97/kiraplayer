import React from 'react';

const map = {
  off: [],
  all: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  0: ['a', 'b', 'c', 'e', 'f', 'g'],
  1: ['c', 'f'],
  2: ['a', 'c', 'd', 'e', 'g'],
  3: ['a', 'c', 'd', 'f', 'g'],
  4: ['b', 'c', 'd', 'f'],
  5: ['a', 'b', 'd', 'f', 'g'],
  6: ['a', 'b', 'd', 'e', 'f', 'g'],
  7: ['a', 'c', 'f'],
  8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  9: ['a', 'b', 'c', 'd', 'f', 'g'],
};

function show(segs, seg) {
  return segs.indexOf(seg) !== -1 ? 'enable' : null;
}

function Led(props) {
  let num = props.num;
  if (isNaN(num) && (num < 0 || num > 9)) {
    num = 'off';
  }
  const segs = map[num];
  return (
    <div className="led">
      <div className="area-1">
        <i className={`seg pin-a ${show(segs, 'a')}`}></i>
      </div>
      <div className="area-2">
        <i className={`seg pin-b ${show(segs, 'b')}`}></i>
        <i className={`seg pin-c ${show(segs, 'c')}`}></i>
      </div>
      <div className="area-3">
        <i className={`seg pin-d ${show(segs, 'd')}`}></i>
      </div>
      <div className="area-4">
        <i className={`seg pin-e ${show(segs, 'e')}`}></i>
        <i className={`seg pin-f ${show(segs, 'f')}`}></i>
      </div>
      <div className="area-5">
        <i className={`seg pin-g ${show(segs, 'g')}`}></i>
      </div>
    </div>
  );
}

export default Led;
