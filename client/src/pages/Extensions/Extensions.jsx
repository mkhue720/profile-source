import React from 'react';
import { Helmet } from 'react-helmet';
import weather from '../../assets/img/weather.png';
import calendar from '../../assets/img/calendar.png';
import translator from '../../assets/img/translator.png';
import imgtolink from '../../assets/img/imgtolink.png';

const Extensions = () => {
  return (
    <>
      <Helmet>
        <title>Extensions | NMK</title>
      </Helmet>
      <div className="extensions__container flex flex-col md:flex-row">
        {/* Weather App */}
        <div className="extensions flex items-center gap-2">
          <a href="/extensions/weather">
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>Weather App</h1>
            <img src={weather} alt="weather" />
          </a>
        </div>

        {/* Calendar App */}
        <div className="extensions flex items-center gap-2">
          <a href="/extensions/calendar">
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>Calendar App</h1>
            <img src={calendar} alt="calendar" />
          </a>
        </div>
      </div>

      <div className="extensions__container flex flex-col md:flex-row">
        {/* Translator App */}
        <div className="extensions flex items-center gap-2">
          <a href="/extensions/translator">
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>Translator App</h1>
            <img src={translator} alt="translator" />
          </a>
        </div>

        {/* Image To Link */}
        <div className="extensions flex items-center gap-2">
          <a href="/extensions/imgtolink">
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>Image To Link</h1>
            <img src={imgtolink} alt="imgtolink" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Extensions;
