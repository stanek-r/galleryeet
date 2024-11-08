import { Route, Routes } from 'react-router-dom';
import { Instax } from './Instax';
import { ColumnPage } from 'gtomy-lib';

export default function InstaxModule() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ColumnPage>
            <Instax />
          </ColumnPage>
        }
      />
    </Routes>
  );
}
