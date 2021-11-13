
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
  HomePage,
  CadidateDetailsPage,
  ShortListPage,
  RejectionListPage
} from './pages';
import './App.css';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
});
function App() {
  return (

    <Router>
      <Provider store={store}>
        <div>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/:id" element={<CadidateDetailsPage />} />
            <Route path="/shortlist" element={<ShortListPage />} />
            <Route path="/rejection" element={<RejectionListPage />} />
            {/* <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/recovery-password" element={<RecoveryPassword/>}/>
        <Route path="*" element={<NotFound/>}/> */}
          </Routes>
        </div>
      </Provider>
    </Router>


  );
}

export default App;
