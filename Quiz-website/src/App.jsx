import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Setting from './page/Setting';
import Result from './page/Result';
import Question from './page/Question';

function App() {
  return (
    <>
    <BrowserRouter>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/setting' element={<Setting></Setting>}></Route>
            <Route path="/result" element={<Result />} />
            <Route path="/question" element={<Question />} />
          </Routes>
      
    </BrowserRouter>
    </>

  );
}

export default App;
