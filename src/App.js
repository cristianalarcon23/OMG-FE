import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import NavbarUser from './components/NavbarUser';
import ErrorPage from './views/ErrorPage';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import AddItem from './views/items/AddItem';
import Home from './views/Home';
import Items from './views/items/Items';
import Search from './views/Search';
import ItemDetail from './views/items/ItemDetail';
import Transactions from './views/transactions/Transactions';
import Receive from './views/transactions/Receive';
import EditItem from './views/items/EditItem';
import NavbarGuest from './components/NavbarGuest';
import { AuthContext } from './context/AuthContext';


function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
    <div className="App">
      <Toaster/>
      {isLoggedIn ? <IsPrivate><NavbarUser /></IsPrivate> : <NavbarGuest />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/items" element={<IsPrivate><Items /></IsPrivate>} />
        <Route path="/items/:id" element={<IsPrivate><ItemDetail /></IsPrivate>} />
        <Route path="/items/add" element={<IsPrivate><AddItem /></IsPrivate>} />
        <Route path="/items/edit/:id" element={<IsPrivate><EditItem /></IsPrivate>} />
        <Route path="/transactions" element={<IsPrivate><Transactions /></IsPrivate>} />
        <Route path="/transactions/receive" element={<IsPrivate><Receive /></IsPrivate>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={<IsPrivate><PrivateView/></IsPrivate>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
