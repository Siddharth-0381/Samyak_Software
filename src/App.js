import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import UserDataEntry from './Components/UserDataEntry/index';
import UserDataList from './Components/userList/index';


function App() {
  return (
    <div className="App">
      <UserDataList></UserDataList>
       {/* <Router>
          <Routes>
            <Route exact path="/" element={UserDataList} />
            <Route path="/userDataEntr" element={UserDataEntry} />
          </Routes>
        </Router> */}
    </div>
  );
}

export default App;
