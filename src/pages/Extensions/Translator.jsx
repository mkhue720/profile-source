// Translator.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './extensions.css';

const Translator = () => {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [translateFrom, setTranslateFrom] = useState("en-GB");
  const [translateTo, setTranslateTo] = useState("hi-IN");
  const countries = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
  };

  const handleExchange = () => {
    const tempText = fromText;
    const tempLang = translateFrom;

    setFromText(toText);
    setToText(tempText);
    setTranslateFrom(translateTo);
    setTranslateTo(tempLang);
  };

  const handleTranslate = () => {
    if (!fromText) return;
    setToText("Translating...");

    const apiUrl = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.responseData) {
          setToText(data.responseData.translatedText);
          data.matches.forEach((match) => {
            if (match.id === 0) {
              setToText(match.translation);
            }
          });
        } else {
          setToText("Translation Error");
        }
      })
      .catch((error) => {
        console.error("Translation Error:", error);
        setToText("Translation Error");
      });
  };

  useEffect(() => {
    const options = Object.entries(countries).map(([country_code, label]) => (
      <option key={country_code} value={country_code}>
        {label}
      </option>
    ));

    document.querySelectorAll("select").forEach((tag) => {
      tag.innerHTML = options;
    });
  }, [countries]);

  return (
    <>
      <Helmet>
        <title>Translator App | NMK</title>
      </Helmet>
      <div className="translator__container">
        <div className="translator__wrapper">
          <div className="text-input">
            <textarea
              spellCheck="false"
              className="from-text"
              placeholder="Enter text"
              value={fromText}
              onChange={(e) => setFromText(e.target.value)}
            />
            <textarea
              spellCheck="false"
              readOnly
              disabled
              className="to-text"
              placeholder="Translation"
              value={toText}
            />
          </div>
          <ul className="controls">
            <li className="row from">
              <div className="icons">
                <i id="from" className="fas fa-volume-up" />
                <i id="from" className="fas fa-copy" />
              </div>
              <select
                value={translateFrom}
                onChange={(e) => setTranslateFrom(e.target.value)}
              />
            </li>
            <li className="exchange" onClick={handleExchange}>
              <i className="fas fa-exchange-alt" />
            </li>
            <li className="row to">
              <select
                value={translateTo}
                onChange={(e) => setTranslateTo(e.target.value)}
              />
              <div className="icons">
                <i id="to" className="fas fa-volume-up" />
                <i id="to" className="fas fa-copy" />
              </div>
            </li>
          </ul>
        </div>
        <button onClick={handleTranslate}>Translate Text</button>
      </div>
    </>
  );
};

export default Translator;
