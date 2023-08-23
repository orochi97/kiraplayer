import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { systemEventBus, fileDialog } from '@/utils/system';
import { storeChangeState, storeChangeCurrentSong } from '@/store';
import { formatTime } from '@/utils';
import { PLAY_STATE } from '@/utils/const';

import './index.css';

function List() {
  const { musicList, currentSong } = useSelector(state => state);
  const dispatch = useDispatch();

  const choose = useCallback((index) => {
    dispatch(storeChangeCurrentSong(index));
  }, [dispatch]);

  const chooseDir = useCallback(() => {
    fileDialog.showOpenDialog({
      title: '请选择歌曲文件夹',
      buttonLabel : '确定',
      properties: ['openDirectory'],
    }).then((files) => {
      if (files && !files.canceled){
        systemEventBus.emit('chooseDir', files.filePaths[0]);
        dispatch(storeChangeState(PLAY_STATE.STOP));
      }
    });
  }, [dispatch]);

  return (
    <div className="song-list">
      <input type="button" className="button" onClick={chooseDir} value="选择歌曲"/>
      <div className="list"></div>
      <div className="song">
        {
          musicList.map((item, index) =>
            <div className="one-song" title={item.file} key={index} onDoubleClick={() => choose(index)}>
              <span className="index">{index + 1}</span>
              <span className={`title ${(index)===currentSong?"active":null}`}>{item.file}</span>
              <span className="total">{formatTime(item.duration)}</span>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default List;
