"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [Token, setToken] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("click success");

    const res = await fetch("https://backend-rho-mauve.vercel.app/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    const result = await res.json();
    setToken(result.token);
  };

  if (Token) {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem('token', Token);
        router.push('/users');
      }
    } catch (error) {
      console.log('Error while setting token localstorage', error);
    }
  }

  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label htmlFor="basic-url" className="form-label">
          Username
        </label>
        <div className="input-group">
          <span className="input-group-text" id="basic-addon3">
            <i className="bi bi-person-vcard"></i>
          </span>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="col-md-6">
        <label htmlFor="basic-url" className="form-label">
          Password
        </label>
        <div className="input-group">
          <span className="input-group-text" id="basic-addon3">
            <i className="bi bi-person-vcard-fill"></i>
          </span>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassWord(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-success">
          <i className="bi bi-box-arrow-right"></i> Sign In
        </button>
      </div>
    </form>
  );
}