// LIBRARY
import React from 'react';
import classNames from "classnames"
// STYLING
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames('day-list__item', { "day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0 })

  const formatSpots = function (numOfSpots) {
    if (!numOfSpots) {
      return 'no spots remaining'
    } else if (numOfSpots === 1) {
      return '1 spot remaining'
    } else {
      return `${numOfSpots} spots remaining`
    }
  }

  return (
    <li onClick={() => props.setDay(props.name)}>
      <div className={dayClass}>
        <h2 className="text--regular">{props.name}</h2>
        <h3 className="text--light">{formatSpots(props.spots)}</h3>
      </div>
    </li>
  );

}