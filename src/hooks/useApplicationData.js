import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
// Passing some major credit to Devin MacGillivray on the below function. https://github.com/devhmac
  const findDailySpotCount = (nameOfDay, days, appointments) => {
    const dayToUpdate = days.find((day) => day.name === nameOfDay);
    let addToCount = 0;
    for (let app in appointments) {
      if (
        appointments[app].interview === null &&
        dayToUpdate.appointments.includes(appointments[app].id)
      ) {
        addToCount++;
      }
    }
    return { ...dayToUpdate, spots: addToCount };
  };

  const newDaysArr = (dayObj, daysArr) => {
    return daysArr.map((day) => (day.name === dayObj.name ? dayObj : day));
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = newDaysArr(findDailySpotCount(state.day, state.days, appointments), state.days)
    const url = `/api/appointments/${id}`;
    return axios.put(url, appointment).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = newDaysArr(findDailySpotCount(state.day, state.days, appointments), state.days)
    const url = `/api/appointments/${id}`;
    return axios.delete(url, { interview: null }).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  // const setDays = days => setState(prev => ({...prev, days}));
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  return { state, setDay, bookInterview, cancelInterview };
}
