// LIBRARY
import React, { useState, useEffect } from "react";
import axios from "axios"
// COMPONENTS
import DayList from "components/DayList";
import Appointment from "components/Appointment"
import {getAppointmentsForDay} from "../helpers/selectors"
// STYL
import "components/Application.scss";



// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "LeBron James",
//       interviewer: {
//         id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   },
//   {
//     id: 6,
//     time: "5pm",
//     interview: {
//       student: "Michael Scott",
//       interviewer: {
//         id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   }
// ];


// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
  const setDay = day => setState(prev => ({ ...prev, day }));
  // const setDays = days => setState(prev => ({...prev, days}));
  console.log(">>>>>>>>>>", state.day)
  const aptList = getAppointmentsForDay(state, state.day).map((appointment) => {
    return (
      <Appointment
        key={appointment.id} {...appointment}
      />)
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        {<>
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            {<>
              <DayList
                days={state.days}
                day={state.day}
                setDay={setDay}
              />
            </>}
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
        </>}
      </section>
      <section className="schedule">
        {aptList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


