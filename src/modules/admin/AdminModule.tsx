import { Route, Routes } from 'react-router-dom';
import { Admin } from './Admin';
import { withColumnPage } from 'gtomy-lib';

export default function AdminModule() {
  return (
    <Routes>
      <Route path="/" element={withColumnPage(Admin)} />
    </Routes>
  );
}
