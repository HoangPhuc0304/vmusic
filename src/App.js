import './App.scss';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import BookSinger from './components/BookSinger/BookSinger';
import KindSong from './components/pages/KindSong/KindSong';
import SongNav from './components/Song/SongNav/SongNav';
import { useSelector } from 'react-redux';
import { getRequestAccess } from './redux/slices/userSlice';
import SongSearch from './components/Song/SongSearch/SongSearch';
import SongChart from './components/Song/SongChart/SongChart';
import SongMV from './components/Song/SongMV/SongMV';
import SongFollow from './components/Song/SongFollow/SongFollow';
import Song from './components/Song/Song';
import SelectTheme from './components/SelectTheme/SelectTheme';
import Control from './components/Control/Control';
import VideoDetail from './components/pages/MusicVideo/VideoDetail';


function App() {
  const handleActiveNav = useSelector(getRequestAccess)
  return (
    <div className="App">
      {/* basename='/vmusic' */}
      <Router basename='/vmusic'> 
        <Header/>
        {handleActiveNav && <><SelectTheme/> <SongNav/> <Control/></>}
        <Routes>
          <Route path="/" element={<Content/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/book-singer" element={<BookSinger/>}/>
          <Route path="/search/:kind" element={<KindSong/>}/>
          <Route path="/search" element={<Song props="search"/>}/>
          <Route path="/chart" element={<Song props="chart"/>}/>
          <Route path="/mv" element={<Song props="mv"/>}/>
          <Route path="/mv/:link" element={<VideoDetail/>}/>
          <Route path="/follow" element={<Song props="follow"/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
