import React from "react";
import MeetupList from "../components/meetups/MeetupList";
import { useState, useEffect } from "react";

const AllMeetups = () => {
  const [isLoading, setIsLoading] = useState();
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(process.env.REACT_APP_FIREBASE_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading....</p>
      </section>
    );
  }
  return (
    <section>
      <h1> All Meetups</h1>
      {/* <ul>
        {DUMMY_DATA.map((meetup) => {
          return <li key={meetup.id}>{meetup.title}</li>;
        })}
      </ul> */}
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
};

export default AllMeetups;
