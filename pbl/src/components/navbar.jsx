import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Use Link for navigation
import LoginButton from "./button/loginButton";
import { useSelector } from "react-redux";

function Navbar() {
  const [logged, setLogged] = useState(false);
  const log = useSelector((state) => state.auth.status);

  useEffect(() => {
    setLogged(log);
  }, [log]);  // Added log as dependency so useEffect runs when 'log' changes

  return (
    <div className="flex justify-between shadow-lg w-full">
      <div>
        <Link to={'/'} className="text-2xl font-bold p-2 m-2">ClubConnect</Link>
      </div>

      <div>
        <ul className="flex gap-6 mr-4 cursor-pointer text-lg">
          <li className="p-2 hover:text-purple-600">
            <Link to={'/about'}>About</Link>
          </li>
          <li className="p-2 hover:text-purple-600">
            <Link to={'/about'}>About</Link>
          </li>
          <li className="p-2 hover:text-purple-600">
            <Link to={'/about'}>About</Link>
          </li>

          {/* Conditional rendering of Profile link or LoginButton */}
          {!logged ? (
            <li className="p-2 hover:text-purple-600">
              <LoginButton />
            </li>
          ) : (
            <li className="p-2 hover:text-purple-600">
              <Link to={'/adminprofile'}>Profile</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;


