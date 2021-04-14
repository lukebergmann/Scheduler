// LIBRARY
import React from "react";
// COMPONENTS
import InterviewerListItem from "components/InterviewerListItem"
// STYLES
import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  const selectedInterviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={event => props.onChange(interviewer.id)}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">    {selectedInterviewers}</ul>
    </section>
  )
}