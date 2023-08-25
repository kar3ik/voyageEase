import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import SingleHotel from './Pages/SingleHotel/SingleHotel';
import SearchResults from './Pages/SearchResults/SearchResults';
import Filter from './components/Filters/Filter';
import WishList from './Pages/WishList/WishList';
import Payment from './Pages/Payment/Payment';
import { OrderSummary } from './Pages/OrderSummary/OrderSummary';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/hotels/:name/:address/:hotelId' element={ <SingleHotel />} />
        <Route path='/hotels/:address' element={<SearchResults />} />
        <Route path='/wishlist' element={<WishList />} /> 
        <Route path='/confirm-booking/stay/:id' element={<Payment />} />
        <Route path='/order-summary' element={<OrderSummary />} />
       
      </Routes>
      
    </div>
  );
}

export default App;
