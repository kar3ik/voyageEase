import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { CategoryProvider } from './context/Categorycontext';
import { DateProvider } from './context/dateContext';
import { FilterProvider } from './context/filterContext';
import { AuthProvider } from './context/authContext';
import { WishListProvider } from './context/wishListContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <CategoryProvider>
        <DateProvider>
          <FilterProvider>
            <AuthProvider>
              <WishListProvider>
                <App />
              </WishListProvider>
            </AuthProvider>
          </FilterProvider>
        </DateProvider>
      </CategoryProvider>
    </Router>
  </React.StrictMode>
);

