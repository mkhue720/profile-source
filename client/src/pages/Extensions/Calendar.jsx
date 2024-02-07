import React, {useState, useEffect, useRef} from 'react'
import { Helmet } from 'react-helmet'
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import './extensions.css'

const Calendar = () => {
    const currentDateRef = useRef(null);
    const daysTagRef = useRef(null);
    const [date, setDate] = useState(new Date());
    const [currYear, setCurrYear] = useState(date.getFullYear());
    const [currMonth, setCurrMonth] = useState(date.getMonth());
  
    const months = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];
  
      const renderCalendar = () => {
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), 
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), 
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), 
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); 
        let liTag = "";
    
        for (let i = firstDayofMonth; i > 0; i--) { 
            liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        }
    
        for (let i = 1; i <= lastDateofMonth; i++) { 
            let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                         && currYear === new Date().getFullYear() ? "active" : "";
            liTag += `<li class="${isToday}">${i}</li>`;
        }
    
        for (let i = lastDayofMonth; i < 6; i++) { 
            liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
        }
        currentDateRef.current.innerText = `${months[currMonth]} ${currYear}`;
        daysTagRef.current.innerHTML = liTag;
    }
  
    useEffect(() => {
      renderCalendar();
    }, [currYear, currMonth]);
  
    const handleIconClick = (iconId) => {
      setCurrMonth(iconId === "prev" ? currMonth - 1 : currMonth + 1);
  
      if (currMonth < 0 || currMonth > 11) {
        const newDate = new Date(currYear, currMonth, new Date().getDate());
        setCurrYear(newDate.getFullYear());
        setCurrMonth(newDate.getMonth());
      } else {
        setDate(new Date());
      }
    };
  return (
    <>
      <Helmet>
        <title>Calendar App | NMK</title>
      </Helmet>
      <div className="calendar__container">
        <div className="canlendar__wrapper">
        <header>
          <p ref={currentDateRef} className="current-date" />
          <div className="icons">
            <span id="prev" className="material-symbols-rounded" onClick={() => handleIconClick("prev")}>
            <BiChevronLeft />
            </span>
            <span id="next" className="material-symbols-rounded" onClick={() => handleIconClick("next")}>
            <BiChevronRight />
            </span>
          </div>
        </header>
        <div className="calendar">
          <ul className="weeks">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <ul ref={daysTagRef} className="days" />
        </div>
      </div>
      </div>
    </>
  )
}

export default Calendar