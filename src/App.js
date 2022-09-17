import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import AddItem2 from './views/items/AddItem2';
import Home from './views/Home';
import Items from './views/items/Items';
import Search from './views/Search';
import ItemDetail from './views/items/ItemDetail';
import Transactions from './views/transactions/Transactions';
import Receive from './views/transactions/Receive';
import EditItem from './views/items/EditItem';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/items" element={<IsPrivate><Items /></IsPrivate>} />
        <Route path="/items/:id" element={<IsPrivate><ItemDetail /></IsPrivate>} />
        <Route path="/items/add" element={<IsPrivate><AddItem2 /></IsPrivate>} />
        <Route path="/items/edit/:id" element={<IsPrivate><EditItem /></IsPrivate>} />
        <Route path="/transactions" element={<IsPrivate><Transactions /></IsPrivate>} />
        <Route path="/transactions/receive" element={<IsPrivate><Receive /></IsPrivate>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={<IsPrivate><PrivateView/></IsPrivate>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
