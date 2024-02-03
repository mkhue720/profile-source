import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './extension.css';
import { BiSolidVolumeFull, BiCopy, BiTransfer  } from "react-icons/bi";

const Translator = () => {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [translateFrom, setTranslateFrom] = useState("en-GB");
  const [translateTo, setTranslateTo] = useState("vi-VN");
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
}
const handleIconClick = (type) => {
  if (!fromText || !toText) return;

  let utterance;
  if (type === "from") {
    if (document.queryCommandSupported('copy')) {
      navigator.clipboard.writeText(fromText);
    }
    utterance = new SpeechSynthesisUtterance(fromText);
    utterance.lang = translateFrom;
  } else if (type === "to") {
    if (document.queryCommandSupported('copy')) {
      navigator.clipboard.writeText(toText);
    }
    utterance = new SpeechSynthesisUtterance(toText);
    utterance.lang = translateTo;
  }

  if (utterance) {
    speechSynthesis.speak(utterance);
  }
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
        console.log("API URL:", apiUrl);
        setToText("Translation Error");
      });
  };



  return (
    <>
      <Helmet>
        <title>Translator App | NMK</title>
      </Helmet>
      <div className="translator">
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
                <i id='from' onClick={() => handleIconClick('from')}><BiSolidVolumeFull /></i>
                <i id='from' onClick={() => handleIconClick('from')}><BiCopy /></i>
              </div>

                <select
                  value={translateFrom}
                  onChange={(e) => setTranslateFrom(e.target.value)}
                >
                  {Object.entries(countries).map(([country_code, label]) => (
                    <option key={country_code} value={country_code}>
                      {label}
                    </option>
                  ))}
                </select>
              </li>
              <li className="exchange" onClick={handleExchange}>
                <BiTransfer />
              </li>
              <li className="row to">
                <select
                  value={translateTo}
                  onChange={(e) => setTranslateTo(e.target.value)}
                >
                  {Object.entries(countries).map(([country_code, label]) => (
                    <option key={country_code} value={country_code}>
                      {label}
                    </option>
                  ))}
                </select>
                <div className="icons">
                  <i id='to' onClick={() => handleIconClick('to')}><BiSolidVolumeFull /></i>
                  <i id='to' onClick={() => handleIconClick('to')}><BiCopy /></i>
                </div>
              </li>
            </ul>
          </div>
          <button onClick={handleTranslate}>Translate Text</button>
        </div>
      </div>
    </>
  );
};

export default Translator;