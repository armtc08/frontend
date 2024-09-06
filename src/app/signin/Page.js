"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function SignInPage() {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      router.push('/users');  // Redirect to /users if token is present
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(""); // Clear previous errors

    try {
      const res = await fetch("https://backend-rho-mauve.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (!res.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await res.json();

      if (result.token) {
        localStorage.setItem('token', result.token);
        router.push('/users');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <div className="input-group">
          <span className="input-group-text" id="username-addon">
            <i className="bi bi-person-vcard"></i>
          </span>
          <input
            id="username"
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="col-md-6">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="input-group">
          <span className="input-group-text" id="password-addon">
            <i className="bi bi-person-vcard-fill"></i>
          </span>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassWord(e.target.value)}
            required
          />
        </div>
      </div>
      {error && <div className="col-12 text-danger">{error}</div>}
      <div className="col-12">
        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
          {isSubmitting ? 'Signing In...' : <><i className="bi bi-box-arrow-right"></i> Sign In</>}
        </button>
      </div>
    </form>
  );
}
