"use client";
import Link from "next/link";
import { useEffect, useState } from 'react';
import BootstrapClient from './BootstrapClient';
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  //const handleLogout = () => {
    // Remove token from localStorage
    //localStorage.removeItem('token');
    //setIsLoggedIn(false);
    // Redirect to the home page
    //router.push('/signin');
  //};

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      router.push('/signin');
    }

    // Add event listener for storage changes
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [router]);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          9Arm.Shop
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="flex" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" s href={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href={"/about"}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href={"/service"}
              >
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href={"./contact"}
              >
                Contact
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            {isLoggedIn ? (
              <button type="button" className="btn btn-outline-danger me-2" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <Link href="/signup">
                  <button type="button" className="btn btn-outline-success me-2">
                    Sign Up
                  </button>
                </Link>
                <Link href="/signin">
                  <button type="button" className="btn btn-outline-cyan">
                    Sign In
                  </button>
                </Link>
              </>
            )}
          </form>
          
        </div>
      </div>
    </nav>
  );
}
