import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BorrowerPipeline } from './features/borrowers/pages/BorrowerPipeline';

import './App.css'
import { BorrowerDetail } from './features/borrowers/pages/BorrowerDetails';
import { Layout } from './common/layouts/Layout';


function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BorrowerPipeline />} />
          <Route path="borrowers" element={<BorrowerPipeline />} />
          <Route path="borrowers/:id" element={<BorrowerDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
