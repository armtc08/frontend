"use client";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function Page() {
  const [items, setItems] = useState([]);

  async function DeleteUser(user_id) {
    try {
      const res = await fetch("https://backend-rho-mauve.vercel.app/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user_id,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch("https://backend-rho-mauve.vercel.app/api/users");
        if (!res.ok) {
          console.error("Failed to fetch data");
          return;
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getUsers();
    const interval = setInterval(getUsers, 1000);
    return () => clearInterval(interval);
  }, []);

  const handledelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/users/${items[0]?.id}`,
        {
          method: "DETELE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {}
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <div class="card">
          <div class="card-header">SignUp Form</div>
          <div class="card-body">
            <div className="row">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="col-md-2 text-center">#</th>
                    <th className="col-md-4">Firstname</th>
                    <th className="col-md-4">Lastname</th>
                    <th className="col-md-1">Eidt</th>
                    <th className="col-md-1">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>
                        <Link
                          href={`users/edit/${item.id}`}
                          className="btn btn-warning"
                        >
                          Edit
                        </Link>
                      </td>
                      <td>
                        <Link
                          href="#"
                          className="btn btn-danger"
                          onClick={() => DeleteUser(item.id)}
                        >
                          Del
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
}
