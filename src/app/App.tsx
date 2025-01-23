import { MainPage } from '@pages/MainPage';
import { memo } from 'react';

import cls from './App.module.scss';

const App = memo(() => {
  return (
    <div className={cls.app}>
      <MainPage />
    </div>
  );
});

export default App;
