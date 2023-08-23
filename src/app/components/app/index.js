import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { systemEventBus } from '@/utils/system';
import { storeChangeMusicList } from '@/store';
import Tape from '../tape';
import Info from '../info';
import Control from '../control';
import List from '../list';
import Audio from '../audio';

import './index.css';

let $loading = null;
function loading(flag) {
  if (!$loading) {
    $loading = document.getElementById('loading');
  }
  $loading.style.display = flag ? 'block' : 'none';
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    loading(false);
    systemEventBus.on('chooseDir', () => {
      loading(true);
    });
    systemEventBus.on('storeChangeMusicList', (data) => {
      dispatch(storeChangeMusicList(data));
      loading(false);
    });
  }, [dispatch]);

  return (
    <div className="App">
      <div className="player">
        <Audio></Audio>
        <Tape></Tape>
        <Info></Info>
        <Control></Control>
      </div>
      <List></List>
    </div>
  );
}

export default App;
