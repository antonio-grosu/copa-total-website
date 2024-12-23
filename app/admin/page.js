"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
const AdminPage = () => {
  const [championships, setChampionships] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [addEventModal, setAddEventModal] = useState(false);
  const [event, setEvent] = useState({
    name: "",
    type: "1 - Campionat , 2 - Turneu",
  });
  useEffect(() => {
    fetch("/api/championships")
      .then((response) => response.json())
      .then((data) => setChampionships(data))
      .catch((error) => console.error("Error fetching championships:", error));

    fetch("/api/tournaments")
      .then((response) => response.json())
      .then((data) => setTournaments(data))
      .catch((error) => console.error("Error fetching tournaments:", error))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && championships && tournaments)
    return (
      <div className="bg-white p-4 min-h-screen text-gray-950 py-44 font">
        {addEventModal && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/12 border-2 flex flex-col bg-orange-50 justify-center border-black p-12 rounded-md">
            <div className="w-full mb-4 flex items-center justify-end">
              <button onClick={() => setAddEventModal(!addEventModal)}>
                <svg
                  className="w-8 h-8 text-red-500 hover:scale-110 transition-all"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <h2 className="text-lg font-semibold w-full text-center">
              Adauga un eveniment
            </h2>
            {!successModal && (
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (event.type === 1) {
                    let eventVariantaFinala = {
                      name: event.name,
                      type: event.type,
                      matches: [],
                    };

                    fetch("/api/championships", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(eventVariantaFinala),
                    }).then((response) => {
                      if (response.ok) {
                        setSuccessModal(true);
                        setTimeout(() => {
                          setSuccessModal(false);
                          setAddEventModal(false);
                          window.location.reload();
                        }, 2000);
                      }
                    });
                  }
                  if (event.type === 2) {
                    let eventVariantaFinala = {
                      name: event.name,
                      type: event.type,
                      matches: {
                        groups: [],
                        semifinals: [],
                        finals: [],
                      },
                    };
                  }
                }}
              >
                <input
                  type="text"
                  required
                  placeholder="Nume"
                  value={event.name}
                  onChange={(e) => setEvent({ ...event, name: e.target.value })}
                  className="border-b-2 p-2 bg-transparent  border-gray-950/20 focus:outline-none"
                />

                <input
                  type="number"
                  required
                  placeholder="Tip (1 = Campionat, 2 = Turneu)"
                  value={event.type}
                  onChange={(e) =>
                    setEvent({ ...event, type: Number(e.target.value) })
                  }
                  className="border-b-2 p-2 bg-transparent  border-gray-950/20 focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2 bg-green-300  rounded-md hover:scale-105 transition-all text-black font-semibold"
                >
                  Adauga
                </button>
              </form>
            )}
            {successModal && (
              <h1 className="w-full text-center mt-4 bg-green-300/50 p-2 gap-2 flex items-center justify-center rounded-md">
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
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                    clipRule="evenodd"
                  />
                </svg>
              </h1>
            )}
          </div>
        )}
        {/* ********************************************************* */}
        {/* PARTE PENTRU CAMPIONATE  */}
        {/* ********************************************************* */}
        <div className="mb-24 w-7/12 mx-auto flex flex-col items-center">
          <div className="w-full  gap-4">
            <h2 className="text-lg   mb-8 w-full text-left">Campionate</h2>
            <button
              onClick={() => setAddEventModal(true)}
              className=" p-2 w-auto inline-flex hover:scale-105 transition-all  items-center justify-center gap-1 font-semibold text-sm text-center rounded-md bg-green-300"
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
            </button>
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
                    className="p-2 text-sm flex items-center justify-center  hover:scale-105 transition-all gap-1 font-medium  rounded-md bg-orange-300/50"
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
        {/* ********************************************************* */}
        {/* PARTEA PENTRU TURNEE  */}
        {/* ********************************************************* */}
        <div className=" w-7/12 mx-auto flex flex-col items-center">
          <div className="w-full  gap-4">
            <h2 className="text-lg   mb-8 w-full text-left">Turnee</h2>
            <Link
              href="/"
              className=" p-2 w-auto inline-flex items-center hover:scale-105 transition-all justify-center gap-1 font-semibold text-sm text-center rounded-md bg-green-300"
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
                  className="p-2 text-sm flex items-center hover:scale-105 transition-all justify-center gap-1 font-medium  rounded-md bg-orange-300/50"
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

  {
    /* ********************************************************* */
  }
  {
    /* LOADING  */
  }
  {
    /* ********************************************************* */
  }
  if (loading)
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <p className="text-gray-950 animate-ping">Loading ... </p>
      </div>
    );
};

export default AdminPage;
