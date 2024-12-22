"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
const AdminPage = () => {
  const [championships, setChampionships] = useState([]);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetch("/api/championships")
      .then((response) => response.json())
      .then((data) => setChampionships(data))
      .catch((error) => console.error("Error fetching championships:", error));

    fetch("/api/tournaments")
      .then((response) => response.json())
      .then((data) => setTournaments(data))
      .catch((error) => console.error("Error fetching tournaments:", error));
  }, []);

  return (
    <div className="bg-white p-4 min-h-screen text-gray-950 py-44 font">
      <div className="mb-24 w-7/12 mx-auto flex flex-col items-center">
        <div className="w-full  gap-4">
          <h2 className="text-lg   mb-8 w-full text-left">Campionate</h2>
          <Link
            href="/"
            className=" p-2 w-auto inline-flex  items-center justify-center gap-1 font-semibold text-sm text-center rounded-md bg-green-300"
          >
            <svg
              className="w-6 h-6 text-gray-950"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                clipRule="evenodd"
              />
            </svg>
            Campionat{" "}
          </Link>
        </div>{" "}
        <div className="flex mt-12 flex-col gap-8 w-5/12">
          {championships.map((championship, index) => (
            <div
              key={index}
              className="border-2  p-4 rounded-md border-orange-300/50"
            >
              <h3 className="text-sm font-semibold">{championship.name}</h3>
              <div className="w-full mt-2 flex justify-end">
                <Link
                  href={`/admin/championships/${championship._id}`}
                  className="p-2 text-sm flex items-center justify-center gap-1 font-medium  rounded-md bg-orange-300/50"
                >
                  <svg
                    className="w-6 h-6 text-gray-950 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Modifica
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" w-7/12 mx-auto flex flex-col items-center">
        <div className="w-full  gap-4">
          <h2 className="text-lg   mb-8 w-full text-left">Turnee</h2>
          <Link
            href="/"
            className=" p-2 w-auto inline-flex items-center justify-center gap-1 font-semibold text-sm text-center rounded-md bg-green-300"
          >
            <svg
              className="w-6 h-6 text-gray-950"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                clipRule="evenodd"
              />
            </svg>
            Turneu{" "}
          </Link>
        </div>{" "}
        {tournaments.map((tournament, index) => (
          <div
            key={index}
            className="border-2 p-4 rounded-md w-5/12 border-orange-300/50"
          >
            {" "}
            <h3 className="text-sm font-semibold">{tournament.name}</h3>
            <div className="w-full mt-2 flex justify-end">
              <Link
                href="/"
                className="p-2 text-sm flex items-center justify-center gap-1 font-medium  rounded-md bg-orange-300/50"
              >
                <svg
                  className="w-6 h-6 text-gray-950 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                    clipRule="evenodd"
                  />
                </svg>
                Modifica
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
