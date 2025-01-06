"use client";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import Link from "next/link";

const EventPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [tournament, setTournament] = useState({});
  // state uri pentru grupe
  const [addMatchModal, setAddMatchModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // meciul selectat => se aplica pt orice tip de meci (grupa, semifinala, finala)
  const [selectedMatch, setSelectedMatch] = useState(null);

  const [editMatchModal, setEditMatchModal] = useState(false);
  //   state ul pentru succes
  const [successModal, setSuccessModal] = useState(false);
  //   state uri pentru semifinale
  const [addSemifinalMatchModal, setAddSemifinalMatchModal] = useState(false);
  const [editSemifinalMatchModal, setEditSemifinalMatchModal] = useState(false);

  // state uri pt finala
  const [addFinalMatchModal, setAddFinalMatchModal] = useState(false);
  const [editFinalMatchModal, setEditFinalMatchModal] = useState(false);

  //   state ul pentru meci
  const [match, setMatch] = useState({
    team1: "",
    team2: "",
    result: null,
    score: [0, 0],
    date: "",
    cards_1: {
      yellow: 0,
      red: 0,
    },
    cards_2: {
      yellow: 0,
      red: 0,
    },
  });
  useEffect(() => {
    fetch(`/api/tournaments/${id}`)
      .then((response) => response.json())
      .then((data) => setTournament(Object.assign({}, data)))
      .catch((error) => console.error("Error fetching championship:", error))
      .finally(() => setLoading(false));
  }, []);
  console.log(tournament);

  if (!loading && tournament) {
    return (
      <div className="bg-white p-4 relative min-h-screen w-full text-gray-950 py-44 font">
        {/* ********************************************************* */}
        {/* HEADER UL PAGINII */}
        {/* ********************************************************* */}

        <div className=" bg-white w-7/12 mx-auto flex flex-col items-center">
          <div className="flex items-center w-full justify-between">
            <h1 className="text-xl font-bold  w-full text-left">
              {tournament.name}
            </h1>
            <button
              onClick={() => {
                const updatedTournament = {
                  ...tournament,
                  matches: {
                    ...tournament.matches,
                    groups: [...tournament.matches.groups, []],
                  },
                };

                fetch(`/api/tournaments/${id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updatedTournament),
                })
                  .then((response) => {
                    if (response.ok) {
                      setTournament(updatedTournament);
                    } else {
                      console.error("Error updating tournament:", response);
                    }
                  })
                  .catch((error) =>
                    console.error("Error adding group:", error)
                  );
              }}
              className="bg-green-300 mt-4 text-xs hover:scale-105 transition-all inline-flex items-center gap-1 justify-center text-black p-2 rounded-md"
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
              <p className="font-semibold">Grupa</p>
            </button>
          </div>
          <h4 className="w-full text-left">id : {tournament._id}</h4>
        </div>
        {/* ********************************************************* */}
        {/* MODAL ADAUGARE MECI IN GRUPA */}
        {/* ********************************************************* */}
        {addMatchModal && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/12 border-2 flex flex-col bg-orange-50 justify-center border-black p-12 rounded-md">
            <div className="w-full mb-4 flex items-center justify-end">
              <button onClick={() => setAddMatchModal(!addMatchModal)}>
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
            <h3 className="w-full text-center font-semibold">Adaugare Meci</h3>
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const updatedTournament = {
                  ...tournament,
                  matches: {
                    ...tournament.matches,
                    groups: tournament.matches.groups.map((group) =>
                      group === selectedGroup ? [...group, match] : group
                    ),
                    semifinals: tournament.matches.semifinals || [],
                    finals: tournament.matches.finals || [],
                  },
                };

                fetch(`/api/tournaments/${id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updatedTournament),
                })
                  .then((response) => {
                    if (response.ok) {
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
                  Meci adaugat cu succes!
                </h1>
              )}{" "}
              {!successModal && (
                <>
                  <label className="mt-4 ">Echipa 1</label>
                  <input
                    type="text"
                    value={match.team1}
                    onChange={(e) =>
                      setMatch({ ...match, team1: e.target.value })
                    }
                    placeholder="Nume Echipa 1"
                    className="border-b-2 p-2 bg-transparent  border-gray-950/20 focus:outline-none"
                    required
                  ></input>
                  <label className="mt-4">Echipa 2</label>
                  <input
                    type="text"
                    placeholder="Nume Echipa 2"
                    className="border-b-2 p-2 bg-transparent border-gray-950/20 focus:outline-none"
                    required
                    value={match.team2}
                    onChange={(e) =>
                      setMatch({ ...match, team2: e.target.value })
                    }
                  ></input>
                  <label className="mt-4">Data</label>
                  <input
                    type="text"
                    placeholder="ex 23.12.2024"
                    className="border-b-2 p-2 bg-transparent border-gray-950/20 focus:outline-none"
                    required
                    value={match.date}
                    onChange={(e) =>
                      setMatch({ ...match, date: e.target.value })
                    }
                  ></input>
                  <button
                    type="submit"
                    className="mt-4 bg-green-300 hover:scale-105 transition-all  p-2 rounded-md font-semibold"
                  >
                    Confirmare Meci
                  </button>
                </>
              )}
            </form>
          </div>
        )}
        {/* ********************************************************* */}
        {/* MODAL EDITARE MECI IN GRUPA */}
        {/* ********************************************************* */}
        {editMatchModal && (
          <div className=" p-8 bg-orange-50 shadow-xl border-2 border-black rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto w-4/12 mb-8">
            <div className="w-full mb-8 flex items-center justify-end">
              <button onClick={() => setEditMatchModal(!editMatchModal)}>
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

            <h2 className="w-full text-center font-semibold ">
              Modificare Rezultat Meci <br />{" "}
              <span className="underline">
                {selectedMatch.team1} - {selectedMatch.team2} <br />
                {selectedMatch.date}
              </span>
            </h2>
            {!successModal && (
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();

                  const updatedGroups = tournament.matches.groups.map((group) =>
                    group.map((match) =>
                      match.team1 === selectedMatch.team1 &&
                      match.team2 === selectedMatch.team2 &&
                      match.date === selectedMatch.date
                        ? selectedMatch
                        : match
                    )
                  );

                  const updatedTournament = {
                    ...tournament,
                    matches: {
                      ...tournament.matches,
                      groups: updatedGroups,
                      semifinals: tournament.matches.semifinals,
                      finals: tournament.matches.finals,
                    },
                  };

                  fetch(`/api/tournaments/${id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedTournament),
                  })
                    .then((response) => {
                      if (response.ok) {
                        setSuccessModal(true);
                        setTimeout(() => {
                          setSuccessModal(false);
                          setEditMatchModal(false);
                          window.location.reload();
                        }, 2000);
                      } else {
                        console.error("Error updating tournament:", response);
                      }
                    })
                    .catch((error) =>
                      console.error("Error updating match:", error)
                    );
                }}
              >
                {/* ********************************************************* */}
                {/* REZULTAT */}
                {/* ********************************************************* */}

                <label className="mt-4">Rezultat</label>
                <input
                  type="number"
                  placeholder="ex 1,2,0"
                  onChange={(e) =>
                    setSelectedMatch({
                      ...selectedMatch,
                      result: Number(e.target.value),
                    })
                  }
                  value={selectedMatch.result}
                  className="border-b-2 p-2  border-gray-950/80 bg-transparent focus:outline-none"
                ></input>

                {/* ********************************************************* */}
                {/* SCOR */}
                {/* ********************************************************* */}
                <label className="mt-4">Scor Final</label>
                <div className="flex items-center gap-4 justify-between">
                  <input
                    type="number"
                    placeholder="Galbene"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        score: [Number(e.target.value), selectedMatch.score[1]],
                      })
                    }
                    value={selectedMatch.score[0]}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                  <input
                    type="number"
                    placeholder="Galbene"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        score: [selectedMatch.score[0], Number(e.target.value)],
                      })
                    }
                    value={selectedMatch.score[1]}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                </div>
                {/* ********************************************************* */}
                {/* CARTONASE ECHIPA 1 */}
                {/* ********************************************************* */}
                <label className="mt-4">Cartonase Echipa 1</label>
                <div className="flex items-center gap-4 justify-between">
                  <input
                    type="number"
                    placeholder="Galbene"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        cards_1: {
                          ...selectedMatch.cards_1,
                          yellow: Number(e.target.value),
                        },
                      })
                    }
                    value={selectedMatch.cards_1.yellow}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                  <input
                    type="number"
                    placeholder="Rosii"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        cards_1: {
                          ...selectedMatch.cards_1,
                          red: Number(e.target.value),
                        },
                      })
                    }
                    value={selectedMatch.cards_1.red}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                </div>
                {/* ********************************************************* */}
                {/* CARTONASE ECHIPA 2  */}
                {/* ********************************************************* */}
                <label className="mt-4">Cartonase Echipa 2</label>
                <div className="flex items-center gap-4 justify-between">
                  <input
                    type="number"
                    placeholder="Galbene"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        cards_2: {
                          ...selectedMatch.cards_2,
                          yellow: Number(e.target.value),
                        },
                      })
                    }
                    value={selectedMatch.cards_2.yellow}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                  <input
                    type="number"
                    placeholder="Rosii"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        cards_2: {
                          ...selectedMatch.cards_2,
                          red: Number(e.target.value),
                        },
                      })
                    }
                    value={selectedMatch.cards_2.red}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-green-300  hover:scale-105 transition-all p-2 rounded-md font-semibold"
                >
                  Confirmare Rezultat
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
                Eveniment adaugat cu succes!
              </h1>
            )}
          </div>
        )}
        {/* ********************************************************* */}
        {/* MAP-UL GRUPELOR */}
        {/* ********************************************************* */}
        <div className="w-7/12 mx-auto mt-12">
          <h2 className="w-full text-left text-lg font-medium">
            Grupe (
            {tournament &&
            tournament.matches.groups &&
            tournament.matches.groups.length > 0
              ? tournament.matches.groups.length
              : "0"}
            )
          </h2>
          {tournament &&
            tournament.matches &&
            tournament.matches.groups.length > 0 &&
            tournament.matches.groups.map((group, index) => {
              return (
                <div key={index}>
                  <h3 className="font-semibold text-black mt-8 ">
                    {" "}
                    Grupa {index + 1}
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedGroup(group);
                      setAddMatchModal((prev) => !prev);
                    }}
                    className="bg-green-300 mt-4 text-xs hover:scale-105 transition-all inline-flex items-center gap-1 justify-center text-black p-2 rounded-md"
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
                  {group
                    .sort((a, b) => a.date - b.date)
                    .map((match, index) => (
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
                            <h3 className="text-sm mt-2">
                              Rezultat {match.result ? match.result : "N/A"}
                            </h3>
                            <h3 className="text-sm mt-2">
                              Scor{" "}
                              {match.result != null
                                ? `${match.score[0]} - ${match.score[1]}`
                                : "N/A"}{" "}
                            </h3>
                            {match.result !== null && (
                              <div>
                                <h4 className="text-sm mt-2">
                                  Cartoanse {match.team1} :{" "}
                                  {match.cards_1.yellow} galbene,{" "}
                                  {match.cards_1.red} rosii
                                </h4>
                                <h4 className="text-sm mt-2">
                                  Cartoanse {match.team2} :{" "}
                                  {match.cards_2.yellow} galbene ,{" "}
                                  {match.cards_2.red} rosii
                                </h4>
                              </div>
                            )}

                            <h4 className="text-xs mt-2">{match.date}</h4>
                          </div>
                          {match.result === null && (
                            <div className="w-full flex justify-end">
                              <button
                                onClick={() => {
                                  setEditMatchModal(!editMatchModal);
                                  setSelectedMatch({ ...match, result: -1 });
                                }}
                                className="p-2 text-sm hover:scale-105 transition-all items-center inline-flex mt-4 justify-center gap-1 font-medium  rounded-md bg-orange-300/50"
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
                                Adauga Rezultat
                              </button>
                            </div>
                          )}
                        </div>
                      </React.Fragment>
                    ))}
                </div>
              );
            })}
        </div>

        {/* ********************************************************* */}
        {/* MODAL ADAUGARE MECI IN SEMIFINALA */}
        {/* ********************************************************* */}
        {addSemifinalMatchModal && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/12 border-2 flex flex-col bg-orange-50 justify-center border-black p-12 rounded-md">
            <div className="w-full mb-4 flex items-center justify-end">
              <button
                onClick={() =>
                  setAddSemifinalMatchModal(!addSemifinalMatchModal)
                }
              >
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
            <h3 className="w-full text-center font-semibold">
              Adaugare Meci in SEMIFINALA
            </h3>
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const updatedSemifinals = [
                  ...tournament.matches.semifinals,
                  match,
                ];
                const updatedTournament = {
                  ...tournament,
                  matches: {
                    ...tournament.matches,
                    semifinals: updatedSemifinals,
                  },
                };

                fetch(`/api/tournaments/${id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updatedTournament),
                })
                  .then((response) => {
                    if (response.ok) {
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
                  Meci adaugat cu succes!
                </h1>
              )}{" "}
              {!successModal && (
                <>
                  <label className="mt-4 ">Echipa 1</label>
                  <input
                    type="text"
                    value={match.team1}
                    onChange={(e) =>
                      setMatch({ ...match, team1: e.target.value })
                    }
                    placeholder="Nume Echipa 1"
                    className="border-b-2 p-2 bg-transparent  border-gray-950/20 focus:outline-none"
                    required
                  ></input>
                  <label className="mt-4">Echipa 2</label>
                  <input
                    type="text"
                    placeholder="Nume Echipa 2"
                    className="border-b-2 p-2 bg-transparent border-gray-950/20 focus:outline-none"
                    required
                    value={match.team2}
                    onChange={(e) =>
                      setMatch({ ...match, team2: e.target.value })
                    }
                  ></input>
                  <label className="mt-4">Data</label>
                  <input
                    type="text"
                    placeholder="ex 23.12.2024"
                    className="border-b-2 p-2 bg-transparent border-gray-950/20 focus:outline-none"
                    required
                    value={match.date}
                    onChange={(e) =>
                      setMatch({ ...match, date: e.target.value })
                    }
                  ></input>
                  <button
                    type="submit"
                    className="mt-4 bg-green-300 hover:scale-105 transition-all  p-2 rounded-md font-semibold"
                  >
                    Confirmare Meci
                  </button>
                </>
              )}
            </form>
          </div>
        )}
        {/* ********************************************************* */}
        {/* MODAL EDITARE MECI IN SEMIFINALA */}
        {/* ********************************************************* */}
        {editSemifinalMatchModal && (
          <div className=" p-8 bg-orange-50 shadow-xl border-2 border-black rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto w-4/12 mb-8">
            <div className="w-full mb-8 flex items-center justify-end">
              <button
                onClick={() =>
                  setEditSemifinalMatchModal(!editSemifinalMatchModal)
                }
              >
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

            <h2 className="w-full text-center font-semibold ">
              Modificare Rezultat Meci <br />{" "}
              <span className="underline">
                {selectedMatch.team1} - {selectedMatch.team2} <br />
                {selectedMatch.date}
              </span>
            </h2>
            {!successModal && (
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();

                  const updatedSemifinals = tournament.matches.semifinals.map(
                    (match) =>
                      match.team1 === selectedMatch.team1 &&
                      match.team2 === selectedMatch.team2 &&
                      match.date === selectedMatch.date
                        ? selectedMatch
                        : match
                  );

                  const updatedTournament = {
                    ...tournament,
                    matches: {
                      ...tournament.matches,
                      semifinals: updatedSemifinals,
                    },
                  };

                  fetch(`/api/tournaments/${id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedTournament),
                  })
                    .then((response) => {
                      if (response.ok) {
                        setSuccessModal(true);
                        setTimeout(() => {
                          setSuccessModal(false);
                          setEditSemifinalMatchModal(false);
                          window.location.reload();
                        }, 2000);
                      } else {
                        console.error("Error updating tournament:", response);
                      }
                    })
                    .catch((error) =>
                      console.error("Error updating match:", error)
                    );
                }}
              >
                {/* ********************************************************* */}
                {/* REZULTAT */}
                {/* ********************************************************* */}

                <label className="mt-4">Rezultat</label>
                <input
                  type="number"
                  placeholder="ex 1,2,0"
                  onChange={(e) =>
                    setSelectedMatch({
                      ...selectedMatch,
                      result: Number(e.target.value),
                    })
                  }
                  value={selectedMatch.result}
                  className="border-b-2 p-2  border-gray-950/80 bg-transparent focus:outline-none"
                ></input>

                {/* ********************************************************* */}
                {/* SCOR */}
                {/* ********************************************************* */}
                <label className="mt-4">Scor Final</label>
                <div className="flex items-center gap-4 justify-between">
                  <input
                    type="number"
                    placeholder="Scor Echipa 1"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        score: [Number(e.target.value), selectedMatch.score[1]],
                      })
                    }
                    value={selectedMatch.score[0]}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                  <input
                    type="number"
                    placeholder="Scor Echipa 2"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        score: [selectedMatch.score[0], Number(e.target.value)],
                      })
                    }
                    value={selectedMatch.score[1]}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                </div>
                {/* ********************************************************* */}
                {/* CARTONASE ECHIPA 1 */}
                {/* ********************************************************* */}
                <label className="mt-4">Cartonase Echipa 1</label>
                <div className="flex items-center gap-4 justify-between">
                  <input
                    type="number"
                    placeholder="Galbene"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        cards_1: {
                          ...selectedMatch.cards_1,
                          yellow: Number(e.target.value),
                        },
                      })
                    }
                    value={selectedMatch.cards_1.yellow}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                  <input
                    type="number"
                    placeholder="Rosii"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        cards_1: {
                          ...selectedMatch.cards_1,
                          red: Number(e.target.value),
                        },
                      })
                    }
                    value={selectedMatch.cards_1.red}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                </div>
                {/* ********************************************************* */}
                {/* CARTONASE ECHIPA 2  */}
                {/* ********************************************************* */}
                <label className="mt-4">Cartonase Echipa 2</label>
                <div className="flex items-center gap-4 justify-between">
                  <input
                    type="number"
                    placeholder="Galbene"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        cards_2: {
                          ...selectedMatch.cards_2,
                          yellow: Number(e.target.value),
                        },
                      })
                    }
                    value={selectedMatch.cards_2.yellow}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                  <input
                    type="number"
                    placeholder="Rosii"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        cards_2: {
                          ...selectedMatch.cards_2,
                          red: Number(e.target.value),
                        },
                      })
                    }
                    value={selectedMatch.cards_2.red}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-green-300  hover:scale-105 transition-all p-2 rounded-md font-semibold"
                >
                  Confirmare Rezultat
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
                Eveniment adaugat cu succes!
              </h1>
            )}
          </div>
        )}
        {/* ********************************************************* */}
        {/* MAP-UL SEMIFINALEi */}
        {/* ********************************************************* */}
        <div className="w-7/12 mx-auto mt-12">
          <h2 className="w-full text-left text-lg font-medium">
            Semifinale (
            {tournament &&
            tournament.matches.semifinals &&
            tournament.matches.semifinals.length > 0
              ? tournament.matches.semifinals.length
              : "0"}
            )
          </h2>
          <button
            onClick={() => {
              setAddSemifinalMatchModal(!addSemifinalMatchModal);
            }}
            className="bg-green-300 mt-4 text-xs hover:scale-105 transition-all inline-flex items-center gap-1 justify-center text-black p-2 rounded-md"
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
            <p className="font-semibold">Meci Semifinala</p>
          </button>
          {tournament &&
            tournament.matches &&
            tournament.matches.semifinals.length > 0 &&
            tournament.matches.semifinals.map((match, index) => (
              <div key={index}>
                <div
                  key={index}
                  className="border-2 w-7/12 mb-4 mx-auto  p-4 rounded-md border-orange-300/50"
                >
                  <div>
                    <h3 className="text-sm font-semibold">
                      {match.team1} {match.team2}
                    </h3>
                    <h3 className="text-sm"></h3>
                    <h3 className="text-sm mt-2">
                      Rezultat {match.result ? match.result : "N/A"}
                    </h3>
                    <h3 className="text-sm mt-2">
                      Scor{" "}
                      {match.result != null
                        ? `${match.score[0]} - ${match.score[1]}`
                        : "N/A"}{" "}
                    </h3>
                    {match.result !== null && (
                      <div>
                        <h4 className="text-sm mt-2">
                          Cartoanse {match.team1} : {match.cards_1.yellow}{" "}
                          galbene, {match.cards_1.red} rosii
                        </h4>
                        <h4 className="text-sm mt-2">
                          Cartoanse {match.team2} : {match.cards_2.yellow}{" "}
                          galbene , {match.cards_2.red} rosii
                        </h4>
                      </div>
                    )}

                    <h4 className="text-xs mt-2">{match.date}</h4>
                  </div>
                  {match.result === null && (
                    <div className="w-full flex justify-end">
                      <button
                        onClick={() => {
                          setEditSemifinalMatchModal(!editSemifinalMatchModal);
                          setSelectedMatch({ ...match, result: -1 });
                        }}
                        className="p-2 text-sm hover:scale-105 bg-orange-200 rounded-md transition-all items-center inline-flex "
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
                        Adauga Rezultat
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* ********************************************************* */}
        {/* MODAL ADAUGARE MECI IN FINALA */}
        {/* ********************************************************* */}
        {addFinalMatchModal && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/12 border-2 flex flex-col bg-orange-50 justify-center border-black p-12 rounded-md">
            <div className="w-full mb-4 flex items-center justify-end">
              <button
                onClick={() => setAddFinalMatchModal(!addFinalMatchModal)}
              >
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
            <h3 className="w-full text-center font-semibold">
              Adaugare Meci in FINALA
            </h3>
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const updatedFinals = [...tournament.matches.finals, match];
                const updatedTournament = {
                  ...tournament,
                  matches: {
                    ...tournament.matches,
                    finals: updatedFinals,
                  },
                };

                fetch(`/api/tournaments/${id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updatedTournament),
                })
                  .then((response) => {
                    if (response.ok) {
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
                  Meci adaugat cu succes!
                </h1>
              )}{" "}
              {!successModal && (
                <>
                  <label className="mt-4 ">Echipa 1</label>
                  <input
                    type="text"
                    value={match.team1}
                    onChange={(e) =>
                      setMatch({ ...match, team1: e.target.value })
                    }
                    placeholder="Nume Echipa 1"
                    className="border-b-2 p-2 bg-transparent  border-gray-950/20 focus:outline-none"
                    required
                  ></input>
                  <label className="mt-4">Echipa 2</label>
                  <input
                    type="text"
                    placeholder="Nume Echipa 2"
                    className="border-b-2 p-2 bg-transparent border-gray-950/20 focus:outline-none"
                    required
                    value={match.team2}
                    onChange={(e) =>
                      setMatch({ ...match, team2: e.target.value })
                    }
                  ></input>
                  <label className="mt-4">Data</label>
                  <input
                    type="text"
                    placeholder="ex 23.12.2024"
                    className="border-b-2 p-2 bg-transparent border-gray-950/20 focus:outline-none"
                    required
                    value={match.date}
                    onChange={(e) =>
                      setMatch({ ...match, date: e.target.value })
                    }
                  ></input>
                  <button
                    type="submit"
                    className="mt-4 bg-green-300 hover:scale-105 transition-all  p-2 rounded-md font-semibold"
                  >
                    Confirmare Meci
                  </button>
                </>
              )}
            </form>
          </div>
        )}
        {/* ********************************************************* */}
        {/* MODAL EDITARE MECI IN FINALA */}
        {/* ********************************************************* */}
        {editFinalMatchModal && (
          <div className=" p-8 bg-orange-50 shadow-xl border-2 border-black rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto w-4/12 mb-8">
            <div className="w-full mb-8 flex items-center justify-end">
              <button
                onClick={() => setEditFinalMatchModal(!editFinalMatchModal)}
              >
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

            <h2 className="w-full text-center font-semibold ">
              Modificare Rezultat Meci <br />{" "}
              <span className="underline">
                {selectedMatch.team1} - {selectedMatch.team2} <br />
                {selectedMatch.date}
              </span>
            </h2>
            {!successModal && (
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();

                  const updatedFinals = tournament.matches.finals.map((match) =>
                    match.team1 === selectedMatch.team1 &&
                    match.team2 === selectedMatch.team2 &&
                    match.date === selectedMatch.date
                      ? selectedMatch
                      : match
                  );

                  const updatedTournament = {
                    ...tournament,
                    matches: {
                      ...tournament.matches,
                      finals: updatedFinals,
                    },
                  };

                  fetch(`/api/tournaments/${id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedTournament),
                  })
                    .then((response) => {
                      if (response.ok) {
                        setSuccessModal(true);
                        setTimeout(() => {
                          setSuccessModal(false);
                          setEditSemifinalMatchModal(false);
                          window.location.reload();
                        }, 2000);
                      } else {
                        console.error("Error updating tournament:", response);
                      }
                    })
                    .catch((error) =>
                      console.error("Error updating match:", error)
                    );
                }}
              >
                {/* ********************************************************* */}
                {/* REZULTAT */}
                {/* ********************************************************* */}

                <label className="mt-4">Rezultat</label>
                <input
                  type="number"
                  placeholder="ex 1,2,0"
                  onChange={(e) =>
                    setSelectedMatch({
                      ...selectedMatch,
                      result: Number(e.target.value),
                    })
                  }
                  value={selectedMatch.result}
                  className="border-b-2 p-2  border-gray-950/80 bg-transparent focus:outline-none"
                ></input>

                {/* ********************************************************* */}
                {/* SCOR */}
                {/* ********************************************************* */}
                <label className="mt-4">Scor Final</label>
                <div className="flex items-center gap-4 justify-between">
                  <input
                    type="number"
                    placeholder="Scor Echipa 1"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        score: [Number(e.target.value), selectedMatch.score[1]],
                      })
                    }
                    value={selectedMatch.score[0]}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                  <input
                    type="number"
                    placeholder="Scor Echipa 2"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        score: [selectedMatch.score[0], Number(e.target.value)],
                      })
                    }
                    value={selectedMatch.score[1]}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                </div>
                {/* ********************************************************* */}
                {/* CARTONASE ECHIPA 1 */}
                {/* ********************************************************* */}
                <label className="mt-4">Cartonase Echipa 1</label>
                <div className="flex items-center gap-4 justify-between">
                  <input
                    type="number"
                    placeholder="Galbene"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        cards_1: {
                          ...selectedMatch.cards_1,
                          yellow: Number(e.target.value),
                        },
                      })
                    }
                    value={selectedMatch.cards_1.yellow}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                  <input
                    type="number"
                    placeholder="Rosii"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        cards_1: {
                          ...selectedMatch.cards_1,
                          red: Number(e.target.value),
                        },
                      })
                    }
                    value={selectedMatch.cards_1.red}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                </div>
                {/* ********************************************************* */}
                {/* CARTONASE ECHIPA 2  */}
                {/* ********************************************************* */}
                <label className="mt-4">Cartonase Echipa 2</label>
                <div className="flex items-center gap-4 justify-between">
                  <input
                    type="number"
                    placeholder="Galbene"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        cards_2: {
                          ...selectedMatch.cards_2,
                          yellow: Number(e.target.value),
                        },
                      })
                    }
                    value={selectedMatch.cards_2.yellow}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                  <input
                    type="number"
                    placeholder="Rosii"
                    onChange={(e) =>
                      setSelectedMatch({
                        ...selectedMatch,
                        cards_2: {
                          ...selectedMatch.cards_2,
                          red: Number(e.target.value),
                        },
                      })
                    }
                    value={selectedMatch.cards_2.red}
                    className="border-b-2 p-2  border-gray-950/80 bg-transparent w-5/12 focus:outline-none"
                  ></input>
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-green-300  hover:scale-105 transition-all p-2 rounded-md font-semibold"
                >
                  Confirmare Rezultat
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
                Eveniment adaugat cu succes!
              </h1>
            )}
          </div>
        )}
        {/* ********************************************************* */}
        {/* MAP-UL FINALEI */}
        {/* ********************************************************* */}
        <div className="w-7/12 mx-auto mt-12">
          <h2 className="w-full text-left text-lg font-medium">
            FINALA (
            {tournament &&
            tournament.matches.finals &&
            tournament.matches.finals.length > 0
              ? tournament.matches.finals.length
              : "0"}
            )
          </h2>
          <button
            onClick={() => {
              setAddFinalMatchModal(!addFinalMatchModal);
            }}
            className="bg-green-300 mt-4 text-xs hover:scale-105 transition-all inline-flex items-center gap-1 justify-center text-black p-2 rounded-md"
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
            <p className="font-semibold">Meci FINALA</p>
          </button>
          {tournament &&
            tournament.matches &&
            tournament.matches.finals.length > 0 &&
            tournament.matches.finals.map((match, index) => (
              <div key={index}>
                <div
                  key={index}
                  className="border-2 w-7/12 mb-4 mx-auto  p-4 rounded-md border-orange-300/50"
                >
                  <div>
                    <h3 className="text-sm font-semibold">
                      {match.team1} {match.team2}
                    </h3>
                    <h3 className="text-sm"></h3>
                    <h3 className="text-sm mt-2">
                      Rezultat {match.result ? match.result : "N/A"}
                    </h3>
                    <h3 className="text-sm mt-2">
                      Scor{" "}
                      {match.result != null
                        ? `${match.score[0]} - ${match.score[1]}`
                        : "N/A"}{" "}
                    </h3>
                    {match.result !== null && (
                      <div>
                        <h4 className="text-sm mt-2">
                          Cartoanse {match.team1} : {match.cards_1.yellow}{" "}
                          galbene, {match.cards_1.red} rosii
                        </h4>
                        <h4 className="text-sm mt-2">
                          Cartoanse {match.team2} : {match.cards_2.yellow}{" "}
                          galbene , {match.cards_2.red} rosii
                        </h4>
                      </div>
                    )}

                    <h4 className="text-xs mt-2">{match.date}</h4>
                  </div>
                  {match.result === null && (
                    <div className="w-full flex justify-end">
                      <button
                        onClick={() => {
                          setEditFinalMatchModal(!editFinalMatchModal);
                          setSelectedMatch({ ...match, result: -1 });
                        }}
                        className="p-2 text-sm hover:scale-105 bg-orange-200 rounded-md transition-all items-center inline-flex "
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
                        Adauga Rezultat
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
  {
    /* ********************************************************* */
  }
  {
    /* LOADING  */
  }
  {
    /* ********************************************************* */
  }
  if (loading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <p className="text-gray-950 animate-ping">Loading ... </p>
      </div>
    );
  }
};
export default EventPage;
