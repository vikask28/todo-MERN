import React from 'react'
import { Menu, X, BookCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authActions } from '../../Store'
import { useNavigate } from 'react-router-dom'

const menuItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Todo',
    href: '/todo',
  },
]


function Navbar() {

  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  //console.log(isLoggedIn);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const history = useNavigate();

  const dispatch = useDispatch();
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
    history("/")
  }


  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <Link to={"/"}>
          <div className="inline-flex items-center space-x-2">
            <span>
              <BookCheck className='text-orange-500' />
            </span>
            <span className="font-bold text-2xl text-orange-500">TODO</span>
          </div>
        </Link>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8 ">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="inline-flex items-center font-semibold text-gray-500 hover:text-gray-900 text-lg"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

        </div>

        {!isLoggedIn && (
          <>
            <div className="hidden space-x-2 lg:block">
              <Link to={"/signup"}>
                <button
                  type="button"
                  className="rounded-md px-3 py-2 text-sm font-semibold text-black bg-orange-500 hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Sign Up
                </button>
              </Link>
              <Link to={"/signin"}>
                <button
                  type="button"
                  className="rounded-md px-3 py-2 text-sm font-semibold text-black bg-orange-500 hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Sign In
                </button>
              </Link>
            </div>
          </>
        )}
        {isLoggedIn && <button
          type="button"
          onClick={logout}
          className="hidden lg:block rounded-md px-3 py-2 text-sm font-semibold text-black bg-orange-500 hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Log Out
        </button>
        }


        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <BookCheck className='text-orange-500' />
                    </span>
                    <span className="font-bold text-lg text-orange-500">TODO</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-xl font-medium text-gray-500 hover:text-gray-900">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>

                {!isLoggedIn && (
                  <>
                    <div className="mt-2 flex flex-col space-y-2">
                      <Link to={"/signup"}>
                        <button
                          type="button"
                          className="w-full rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-orange-500 hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:text-white"
                        >
                          Sign Up
                        </button>
                      </Link>
                      <Link to={"/signin"}>
                        <button
                          type="button"
                          className="w-full rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-orange-500 hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:text-white"
                        >
                          Sign In
                        </button>
                      </Link>
                    </div>
                  </>)}

                {isLoggedIn &&

                  <button
                  onClick={logout}
                    type="button"
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:text-white"
                  >
                    Log Out
                  </button>}

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar