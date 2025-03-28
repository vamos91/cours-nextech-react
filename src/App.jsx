import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BurgerShop from './pages/BurgerShop';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import NavigationBar from './components/NavigationBar'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Articles from './pages/Articles';
import Eshop from './pages/Eshop';
import Dashboard from './pages/Dashboard';
import ProtectedPage from './components/ProtectedPage';
import ProtectedNavBar from './components/ProtectedNavBar';
import UserBasicLayout from './layout/UserBasicLayout';
import UserPage from './pages/UserPage'
import AdminLayout from './layout/AdminLayout';
import NotFound from './pages/NotFound'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CounterProvider from './context/CounterProvider';
import CardProvider from './context/CardProvider';
import CardDetails from './pages/CardDetails';
import UserProvider from './context/UserProvider';

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CardProvider>
            <CounterProvider>
              <Routes>
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path='/basic-auth' element={<UserBasicLayout />}>
                    <Route index element={<Home />} />
                    <Route path="burger-shop" element={<BurgerShop />} />
                    <Route path="blog" element={<Blog />} />
                    <Route path="e-shop" element={<Eshop />} />
                    <Route path="card" element={<CardDetails />} />
                    <Route index element={<Contact />} />
                    <Route path="blog/:id" element={<Articles />} />
                  </Route>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} /> 
                </Route>
                  <Route path="*" element={ <NotFound />} />
                </Routes>
            </CounterProvider>
          </CardProvider>
        </UserProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;