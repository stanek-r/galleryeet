import { Route, Routes } from 'react-router-dom';
import { Instax } from './Instax';
import { withColumnPage } from 'gtomy-lib';

export default function InstaxModule() {
  return (
    <Routes>
      <Route path="/" element={withColumnPage(Instax)} />
    </Routes>
  );
}
