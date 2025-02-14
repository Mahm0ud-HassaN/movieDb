import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import './index.css';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLang, toggleTheme } from './Components/Store/Store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Favorites from './Components/Favorities/Favorites';
// import Test from './Components/Test/Test';








const router = createBrowserRouter([{
  path: '/',
  element: <Layout />, children: [{
    path: 'home', element: <Home />
  },
  { path: 'about', element: <About /> },
  {
    path: '*', element: <Home />
  },{
    path: 'login', element: <Login />
  },{
    path: 'movie/:id', element: <MovieDetails />
  },
  {
    index: true, element: <Register />
  },
  {
    path: 'register', element: <Register />
  },
  {
    path: 'fav', element: <Favorites />
  }
]

}])

function App() {

  const theme = useSelector((state) => state.theme.theme);
  const { content } = useSelector((state) => state.lang);
  const dispatch = useDispatch();
  
  const themeClass= theme ==='light'?'light':'dark';
  return (<> 
  <div
    class="container-fluid w-100 bg-dark" >
  
    <RouterProvider router={router} />
   
  </div>
  
   
    
  </>
  
  );
}

export default App;
