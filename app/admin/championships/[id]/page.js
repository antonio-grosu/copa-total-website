"use client";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import Link from "next/link";

const EventPage = () => {
  const { id } = useParams();
  const [championship, setChampionship] = useState({});
  const [addMatchModal, setAddMatchModal] = useState(false);
  const [editMatchModal, setEditMatchModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [match, setMatch] = useState({
    team1: "",
    team2: "",
    result: null,
    score: [0, 0],
    date: "",
  });

  useEffect(() => {
    fetch(`/api/championships/${id}`)
      .then((response) => response.json())
      .then((data) => setChampionship(data))
      .catch((error) => console.error("Error fetching championship:", error));
  }, []);

  if (championship)
    return (
      <div className="bg-white p-4 min-h-screen text-gray-950 py-44 font">
        <div className=" bg-white w-7/12 mx-auto flex flex-col items-center">
          <div className="flex items-center w-full justify-between">
            <h1 className="text-xl font-bold  w-full text-left">
              {championship.name}
            </h1>
            <button
              onClick={() => setAddMatchModal((prev) => !prev)}
              className="bg-green-300 text-xs inline-flex items-center gap-1 justify-center text-black p-2 rounded-md"
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
              </svg>{" "}
              <p className="font-semibold">Meci</p>
            </button>
          </div>
          <h4 className="w-full text-left">id : {championship._id}</h4>
          {addMatchModal && (
            <div className="w-7/12 mx-auto border-2 flex flex-col  justify-center border-orange-300 p-12 mt-4 rounded-md">
              <h3 className="w-full text-center font-semibold">
                Adaugare Meci
              </h3>
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const updatedChampionship = {
                    ...championship,
                    matches: [...championship.matches, match],
                  };

                  fetch(`/api/championships/${id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedChampionship),
                  })
                    .then((response) => {
                      if (response.ok) {
                        console.log(response);
                        setMatch({
                          team1: "",
                          team2: "",
                          result: null,
                          score: [0, 0],
                          date: "",
                        });
                        setSuccessModal(true);
                        setTimeout(() => {
                          setSuccessModal(false);
                          setAddMatchModal(false);
                          window.location.reload();
                        }, 2000);
                      } else {
                        console.error("Error updating championship:", response);
                      }
                    })
                    .catch((error) =>
                      console.error("Error adding match:", error)
                    );
                }}
              >
                {successModal && (
                  <h1 className="w-full text-center mt-4 bg-green-300/50 p-2 rounded-2xl">
                    Meci adaugat cu succes!
                  </h1>
                )}{" "}
                {!successModal && (
                  <>
                    <label className="mt-4">Echipa 1</label>
                    <input
                      type="text"
                      value={match.team1}
                      onChange={(e) =>
                        setMatch({ ...match, team1: e.target.value })
                      }
                      placeholder="Nume Echipa 1"
                      className="border-b-2 p-2  border-gray-950/20 focus:outline-none"
                    ></input>
                    <label className="mt-4">Echipa 2</label>
                    <input
                      type="text"
                      placeholder="Nume Echipa 2"
                      className="border-b-2 p-2  border-gray-950/20 focus:outline-none"
                      value={match.team2}
                      onChange={(e) =>
                        setMatch({ ...match, team2: e.target.value })
                      }
                    ></input>
                    <label className="mt-4">Data</label>
                    <input
                      type="text"
                      placeholder="ex 23.12.2024"
                      className="border-b-2 p-2  border-gray-950/20 focus:outline-none"
                      value={match.date}
                      onChange={(e) =>
                        setMatch({ ...match, date: e.target.value })
                      }
                    ></input>
                    <button
                      type="submit"
                      className="mt-4 bg-green-300   p-2 rounded-2xl font-semibold"
                    >
                      Confirmare Meci
                    </button>
                  </>
                )}
              </form>
            </div>
          )}
          <div className="mt-12 w-full">
            <h2 className="w-full text-left text-lg font-medium">
              Meciuri (
              {championship &&
              championship.matches &&
              championship.matches.length
                ? championship.matches.length
                : "..."}
              )
            </h2>
            {championship &&
              championship.matches &&
              championship.matches.map((match, index) => (
                <React.Fragment key={index}>
                  <div
                    key={index}
                    className="border-2 w-7/12 mb-4 mx-auto  p-4 rounded-md border-orange-300/50"
                  >
                    <div>
                      <h3 className="text-sm font-semibold">
                        {match.team1} {match.team2}
                      </h3>
                      <h3 className="text-sm"></h3>
                      <h3 className="text-sm mt-2">Rezultat {match.result}</h3>
                      <h3 className="text-sm mt-2">
                        Scor {match.score[0]} - {match.score[1]}
                      </h3>

                      <h4 className="text-xs mt-2">{match.date}</h4>
                    </div>
                    <div className="w-full flex justify-end">
                      <button
                        onClick={() => setEditMatchModal(!editMatchModal)}
                        className="p-2 text-sm  items-center inline-flex mt-4 justify-center gap-1 font-medium  rounded-md bg-orange-300/50"
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
                      </button>
                    </div>
                  </div>
                  {editMatchModal && (
                    <div
                      key={match}
                      className=" p-4 shadow-md w-7/12 mx-auto mb-8"
                    >
                      <h2 className="w-full text-center font-semibold ">
                        Modificare Rezultat Meci
                      </h2>
                    </div>
                  )}
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    );
};

export default EventPage;
