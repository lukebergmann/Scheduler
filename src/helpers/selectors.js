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

export function getInterviewersForDay (state, selectedDay) {
  //... returns an array of interviewers for that day
  const specificInterviewer = []
  for (let day of state.days) {
    if (day.name === selectedDay) {
      for (let interviewer in state.interviewers) {
        if (day.interviewers.includes(Number(interviewer))) {
          specificInterviewer.push(state.interviewers[interviewer]);
        }
      }
    }
  }
  return specificInterviewer;
};

export function getInterview (state, interview) {

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



