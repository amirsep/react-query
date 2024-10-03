import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostsRQ from "./components/PostsRQ";
import Home from "./components/Home";
import PostsTraditional from "./components/PostsTraditional";
import PostDetailsRQ from "./components/PostDetailsRQ";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#36393f] text-[#dcddde]">
        {/* Navigation Bar */}
        <nav className="bg-[#2f3136] flex justify-center py-4 px-6 border-b border-[#202225]">
          <ul className="flex justify-start items-center space-x-8">
            <li>
              <Link
                to="/"
                className="text-[#b9bbbe] text-lg font-medium hover:text-white transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/posts"
                className="text-[#b9bbbe] text-lg font-medium hover:text-white transition-colors duration-200"
              >
                Traditional Posts
              </Link>
            </li>
            <li>
              <Link
                to="/rq-posts"
                className="text-[#b9bbbe] text-lg font-medium hover:text-white transition-colors duration-200"
              >
                React Query Posts
              </Link>
            </li>
          </ul>
        </nav>

        {/* Page Content */}
        <div className="flex-grow p-8">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/posts" element={<PostsTraditional />} />
            <Route exact path="/posts/:postId" element={<PostDetailsRQ />} />
            <Route exact path="/rq-posts/:postId" element={<PostDetailsRQ />} />
            <Route exact path="/rq-posts" element={<PostsRQ />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-[#2f3136] py-4 px-6 text-center text-sm text-[#b9bbbe] border-t border-[#202225]">
          © 2024 Your Website Name. All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
