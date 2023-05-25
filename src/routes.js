import Home from './pages/home/Home'
import UserList from './pages/Users/UserList'
import NewUser from './pages/NewUser/NewUser'
import Products from './pages/Products/Products'
import Analytics from './pages/Analytics/Analytics'
let routes = [
    {path: '/*', element: <Home />},
    {path: '/users', element: <UserList />},
    {path: '/newUser', element: <NewUser />},
    {path: '/products', element: <Products />},
    { path: "Analytics", element: <Analytics/>},
]

export default routes