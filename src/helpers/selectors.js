export function getAppointmentsForDay(state, selectedDay) {
  //... returns an array of appointments for that day
  const specificDay = []
  for (let day of state.days) {
    console.log("==========", state.day)
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