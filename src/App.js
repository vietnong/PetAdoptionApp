import { StrictMode, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

export const App = () => {
  const theme = useState("darkblue");
  return (
    <ThemeContext.Provider value={theme}>
      <div
        className="p-0 m-0"
        style={{
          background:
            "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
        }}
      >
        <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-purple-400 via-pink-500 to-red-500">
          <Link className="text-6xl text-white hover:text-gray-200" to="/">
            Adopt Me!
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<SearchParams />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
};

render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
