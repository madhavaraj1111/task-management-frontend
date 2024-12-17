import React, { Children } from "react";
import { Link, Outlet } from "react-router";
import logo from "../../images/task-management-logo.png";

function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white lg:block">
        <div className="flex items-center gap-2 bg-gray-700 p-4">
          <img src={logo} alt="Task Management logo" className="w-10" />
          <h2 className="text-2xl font-semibold text-white max-sm:text-sm">
            Task Manager
          </h2>
        </div>
        <div className="my-5">
          <nav>
            <ul className="space-y-4 max-sm:space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect width="19" height="19" x="2.5" y="2.5" rx="9.5" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m7.465 14.72l2.222-2.956a.907.907 0 0 1 1.207-.226l2.167 1.369a.907.907 0 0 0 1.243-.263l2.23-3.365"
                      />
                    </g>
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 6h11M3.8 5.8l.8.8l2-2m-2.8 7.2l.8.8l2-2m-2.8 7.2l.8.8l2-2M9 12h11M9 18h11"
                    />
                  </svg>
                  Tasks
                </Link>
              </li>
              <li>
                <Link
                  to="/teams"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                  >
                    <g
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    >
                      <path d="M3.36 9.977a5.5 5.5 0 0 0-.923 3.05V14a.5.5 0 1 1-1 0v-.972A6.5 6.5 0 0 1 2.53 9.422l.108-.162a.5.5 0 1 1 .832.555z" />
                      <path d="M6.18 8.365c-1.09 0-2.107.544-2.711 1.45l-.832-.554a4.26 4.26 0 0 1 3.542-1.896h.22a.5.5 0 0 1 0 1zm3.078 1.6c.47.706.721 1.534.721 2.382h1a5.3 5.3 0 0 0-.889-2.936l-.1-.15a.5.5 0 1 0-.832.554z" />
                      <path d="M6.448 8.365c1.089 0 2.106.544 2.71 1.45l.832-.554a4.26 4.26 0 0 0-3.542-1.896h-.22a.5.5 0 1 0 0 1z" />
                      <path d="M6.25 7.25a2.25 2.25 0 1 0 0-4.5a2.25 2.25 0 0 0 0 4.5m0 1a3.25 3.25 0 1 0 0-6.5a3.25 3.25 0 0 0 0 6.5m4.259 4.936a5.5 5.5 0 0 0-.924 3.051v1.034a.5.5 0 1 1-1 0v-1.034a6.5 6.5 0 0 1 1.091-3.605l.133-.2a.5.5 0 1 1 .832.556z" />
                      <path d="M13.42 11.5a3.34 3.34 0 0 0-2.78 1.488l-.831-.555A4.34 4.34 0 0 1 13.42 10.5h.224a.5.5 0 1 1 0 1zm3.187 1.686a5.5 5.5 0 0 1 .924 3.051v1.034a.5.5 0 1 0 1 0v-1.034a6.5 6.5 0 0 0-1.092-3.605l-.133-.2a.5.5 0 1 0-.832.556z" />
                      <path d="M13.695 11.5a3.34 3.34 0 0 1 2.78 1.488l.832-.555a4.34 4.34 0 0 0-3.612-1.933h-.225a.5.5 0 1 0 0 1z" />
                      <path d="M13.5 10.5a2.25 2.25 0 1 0 0-4.5a2.25 2.25 0 0 0 0 4.5m0 1a3.25 3.25 0 1 0 0-6.5a3.25 3.25 0 0 0 0 6.5" />
                    </g>
                  </svg>
                  Teams
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor">
                      <path d="m10.5 1.5l-.181.543a7 7 0 0 1-.716 1.514a4.63 4.63 0 0 1-3.717 2.146a7 7 0 0 1-1.668-.137l-.561-.115l-1.5 2.598l.38.429c.374.422.693.884.953 1.376a4.63 4.63 0 0 1 0 4.292a7 7 0 0 1-.953 1.376l-.38.429l1.5 2.598l.56-.115a7 7 0 0 1 1.67-.137a4.63 4.63 0 0 1 3.716 2.146c.296.47.537.979.716 1.514l.181.543h3l.181-.543q.27-.806.716-1.514a4.63 4.63 0 0 1 3.717-2.146a7 7 0 0 1 1.668.137l.561.115l1.5-2.598l-.38-.429a7 7 0 0 1-.953-1.376a4.63 4.63 0 0 1 0-4.292c.26-.492.579-.954.953-1.376l.38-.429l-1.5-2.598l-.56.115a7 7 0 0 1-1.67.137a4.63 4.63 0 0 1-3.716-2.146a7 7 0 0 1-.716-1.514L13.5 1.5z" />
                      <path d="M15.502 12a3.502 3.502 0 1 1-7.004 0a3.502 3.502 0 0 1 7.004 0Z" />
                    </g>
                  </svg>
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="bg-gray-100 p-6 shadow-lg">
          <div></div>
        </header>

        {/* Main Area */}
        <main className="overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
