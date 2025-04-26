import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Features from "./Features";
import CTA from "./CTA";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex flex-col lg:flex-row">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900  sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Modern CRM for</span>{" "}
                  <span className="block text-blue-600 xl:inline">
                    growing businesses
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500  sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Streamline your client relationships, track projects, and
                  manage interactions all in one place. Our CRM solution helps
                  you focus on what matters most - growing your business.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  {!isAuthenticated && (
                    <>
                      <div className="rounded-md shadow">
                        <Link
                          to="/register"
                          className="w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-2 md:text-lg md:px-10"
                        >
                          Get started
                        </Link>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Link
                          to="/login"
                          className="w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-2 md:text-lg md:px-10"
                        >
                          Sign in
                        </Link>
                      </div>
                    </>
                  )}
                  {isAuthenticated && (
                    <div className="rounded-md shadow">
                      <Link
                        to="/dashboard"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-2 md:text-lg md:px-10"
                      >
                        Go to Dashboard
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:w-1/2">
                <img
                  className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                  alt="Team working on project"
                />
              </div>
            </main>
          </div>
        </div>

        {/* Banner Image - Fixed size and position */}
      </div>

      {/* Feature Section */}
      <div className="pb-12">
        <Features />
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 ">
        <CTA />
      </div>
    </div>
  );
};

export default Home;
