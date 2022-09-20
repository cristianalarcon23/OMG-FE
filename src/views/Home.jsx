import React, {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';



export default function Home() {

  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="bg-white">
      <div className="relative bg-gray-900">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-64 lg:px-0">
        <img
                className="mx-auto h-48 w-auto"
                src="https://res.cloudinary.com/do1ugcmht/image/upload/v1663593797/logo-white_vplijm.png"
                alt="Your Company"
              />
          <p className="mt-1 text-xl text-white">
            Welcome to OH MY GOODS!
            </p>
            <p className="mt-4 text-xl text-white">
            Get ready to have all your goods in one place, no more papers lost! 
            </p>
            <p className="mt-1 text-xl text-white">
            Give your transactions a plus of safety.
            </p>
            <p className="mt-1 text-xl text-white">
            Item lost? Mark it so others can know if they find out! 
            </p>
          {isLoggedIn ? <p>''</p> : <a
            href="/signup"
            className="mt-8 inline-block rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Get started!
          </a>}
        </div>
      </div>
      <footer aria-labelledby="footer-heading" className="bg-gray-900">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
          <div className="border-t border-gray-800 py-10 text-center">
            <p className="text-sm text-gray-400">Copyright &copy; 2022 OH MY GOODS, Inc.</p>
          </div>
      </footer>
    </div>
  )
}
