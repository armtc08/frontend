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
    console.log("Form submitted");

    try {
      const res = await fetch("https://backend-rho-mauve.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const result = await res.json();
      setToken(result.token);
      console.log("Login successful, token received:", result.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Use effect to handle redirection after receiving the token
  React.useEffect(() => {
    if (Token) {
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", Token);
          router.push("/users");
        }
      } catch (error) {
        console.error("Error while setting token in local storage", error);
      }
    }
  }, [Token, router]);

  return (
    <>
      <h1>Sign In Page</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <div className="input-group">
            <span className="input-group-text" id="basic-addon3">
              <i className="bi bi-person-vcard"></i>
            </span>
            <input
              type="text"
              className="form-control"
              id="username"
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
            <span className="input-group-text" id="basic-addon3">
              <i className="bi bi-person-vcard-fill"></i>
            </span>
            <input
              type="password"
              className="form-control"
              id="password"
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
    </>
  );
}
