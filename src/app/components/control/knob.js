import { getPos } from '@/utils';

let mouseDownFlag = false;

export default function knobInit (knob, initDeg, cb) {
  Object.assign(knob, {
    elementPosition: {
      x: getPos(knob).left,
      y: getPos(knob).top,
    },
    target: initDeg, // 初始从哪个角度转起
    radius: 57,
    maxDiff: 57,
    constraint: 360,
    flag: false,
    onmousedown () {
      mouseDownFlag = true;
      document.onmousemove = (event) => {
        if (mouseDownFlag) {
          var atan, diff, target;
          this.mPos = {
            x: event.pageX - this.elementPosition.x,
            y: event.pageY - this.elementPosition.y,
          };
          atan = Math.atan2(this.mPos.x - this.radius, this.mPos.y - this.radius);
          target = -atan / (Math.PI / 180) + 180;
          diff = Math.abs(target - this.target);
          if (diff < this.maxDiff && target < this.constraint) {
            this.target = Math.round(target);
            let vol = 0;
            if (this.target < 15) {
                vol = 0;
            } else if (this.target > 345) {
                vol = 10;
            } else {
                vol = (this.target - (this.target - 36) % 36) / 36;
            }
            cb(vol);
          }
        }
      }
      document.onmouseup = () => {
        mouseDownFlag = false;
        document.onmousemove = null;
      }
    }
  });
}