// import "./App.css";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import PostsRQ from "./components/PostsRQ";
// import Home from "./components/Home";
// import PostsTraditional from "./components/PostsTraditional";
// import PostDetailsRQ from "./components/PostDetailsRQ";
// import PaginationQueries from "./components/PaginationQueries";
// import InfiniteQueries from "./components/InfiniteQueries";
// import InfiniteQueryByScroll from "./components/InfiniteQueryByScroll";

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="min-h-screen flex flex-col bg-[#36393f] text-[#dcddde]">
//         {/* Navigation Bar */}
//         <nav className="bg-[#2f3136] flex justify-center py-4 px-6 border-b border-[#202225]">
//           <ul className="flex justify-start items-center space-x-8">
//             <li>
//               <Link
//                 to="/"
//                 className="text-[#b9bbbe] text-lg font-medium hover:text-white transition-colors duration-200"
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/posts"
//                 className="text-[#b9bbbe] text-lg font-medium hover:text-white transition-colors duration-200"
//               >
//                 Traditional Posts
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/rq-posts"
//                 className="text-[#b9bbbe] text-lg font-medium hover:text-white transition-colors duration-200"
//               >
//                 React Query Posts
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/paginated-fruits"
//                 className="text-[#b9bbbe] text-lg font-medium hover:text-white transition-colors duration-200"
//               >
//                 Pagination Queries
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/infinite-fruits"
//                 className="text-[#b9bbbe] text-lg font-medium hover:text-white transition-colors duration-200"
//               >
//                 Infinite Queries
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/infinite-fruits-scroll"
//                 className="text-[#b9bbbe] text-lg font-medium hover:text-white transition-colors duration-200"
//               >
//                 Infinite Query By Scroll
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Page Content */}
//         <div className="flex-grow p-8">
//           <Routes>
//             <Route exact path="/" element={<Home />} />
//             <Route exact path="/posts" element={<PostsTraditional />} />
//             <Route exact path="/posts/:postId" element={<PostDetailsRQ />} />
//             <Route exact path="/rq-posts" element={<PostsRQ />} />
//             <Route exact path="/rq-posts/:postId" element={<PostDetailsRQ />} />
//             <Route
//               exact
//               path="/paginated-fruits"
//               element={<PaginationQueries />}
//             />
//             <Route
//               exact
//               path="/infinite-fruits"
//               element={<InfiniteQueries />}
//             />
//             <Route
//               exact
//               path="/infinite-fruits-scroll"
//               element={<InfiniteQueryByScroll />}
//             />
//           </Routes>
//         </div>

//         {/* Footer */}
//         <footer className="bg-[#2f3136] py-4 px-6 text-center text-sm text-[#b9bbbe] border-t border-[#202225]">
//           © 2024 Your Website Name. All rights reserved.
//         </footer>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostsRQ from "./components/PostsRQ";
import Home from "./components/Home";
import PostsTraditional from "./components/PostsTraditional";
import PostDetailsRQ from "./components/PostDetailsRQ";
import PaginationQueries from "./components/PaginationQueries";
import InfiniteQueries from "./components/InfiniteQueries";
import InfiniteQueryByScroll from "./components/InfiniteQueryByScroll";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#1f1f2e] to-[#23232d] text-[#e4e6eb] font-sans">
        {/* Navigation Bar */}
        <nav className="bg-[#282a36] sticky top-0 z-10 shadow-lg py-4 px-8">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <ul className="flex space-x-6">
                <li>
                  <Link
                    to="/"
                    className="text-[#9ca3af] hover:text-[#f4f4f5] text-lg transition duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/posts"
                    className="text-[#9ca3af] hover:text-[#f4f4f5] text-lg transition duration-300"
                  >
                    Traditional Posts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rq-posts"
                    className="text-[#9ca3af] hover:text-[#f4f4f5] text-lg transition duration-300"
                  >
                    React Query Posts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/paginated-fruits"
                    className="text-[#9ca3af] hover:text-[#f4f4f5] text-lg transition duration-300"
                  >
                    Pagination Queries
                  </Link>
                </li>
                <li>
                  <Link
                    to="/infinite-fruits"
                    className="text-[#9ca3af] hover:text-[#f4f4f5] text-lg transition duration-300"
                  >
                    Infinite Queries
                  </Link>
                </li>
                <li>
                  <Link
                    to="/infinite-fruits-scroll"
                    className="text-[#9ca3af] hover:text-[#f4f4f5] text-lg transition duration-300"
                  >
                    Infinite Query By Scroll
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="flex-grow p-8 max-w-7xl mx-32">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/posts" element={<PostsTraditional />} />
            <Route exact path="/posts/:postId" element={<PostDetailsRQ />} />
            <Route exact path="/rq-posts" element={<PostsRQ />} />
            <Route exact path="/rq-posts/:postId" element={<PostDetailsRQ />} />
            <Route
              exact
              path="/paginated-fruits"
              element={<PaginationQueries />}
            />
            <Route
              exact
              path="/infinite-fruits"
              element={<InfiniteQueries />}
            />
            <Route
              exact
              path="/infinite-fruits-scroll"
              element={<InfiniteQueryByScroll />}
            />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-[#282a36] py-6 shadow-lg">
          <div className="max-w-7xl mx-auto text-center text-sm text-[#9ca3af]">
            <p className="mb-2">© 2024 All rights reserved.</p>
            <div className="flex justify-center space-x-4 text-[#9ca3af]">
              <a href="/" className="hover:text-white transition duration-300">
                Made by ❤️- Mohammad Amir | Full Stack Developer
              </a>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
