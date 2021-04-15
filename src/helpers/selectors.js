export function getAppointmentsForDay (state, selectedDay) {
  //... returns an array of appointments for that day
  const specificDay = []
  for (let day of state.days) {
    if (day.name === selectedDay) {
      for (let appointment in state.appointments) {
        if (day.appointments.includes(Number(appointment))) {
          specificDay.push(state.appointments[appointment]);
        }
      }
    }
  }
  return specificDay;
};

export function getInterview (state, interview) {
  console.log(interview)
  //Function should return a new object containing the new data passed in
  //If it is empty, return null
  if (interview === null) {
    return null
  };
  const newInterview = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  return newInterview
};



