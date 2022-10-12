import { useState, useRef, useEffect } from "react";
import "./App.css";

import axios from "axios";

import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const debounceTimer = useRef(null);

  const [keywords, setKeywords] = useState(
    new URLSearchParams(location.search)?.get("keywords") ?? ""
  );
  const [adsToShow, setAdsToShow] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:3005/api/ad?keywords=${keywords}`
        );
        setAdsToShow(data.data.ads);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(`Error occured, Message: ${err.message}`);
      }
    }, 500);

    return () => clearTimeout(debounceTimer.current);
  }, [keywords]);

  const handleChange = (e) => {
    const { name, value } = e?.target;
    const query = new URLSearchParams({ [name]: value });
    navigate(
      { pathname: location.pathname, search: query.toString() },
      { replace: true }
    );
    setKeywords(value);
  };

  return (
    <div className="App">
      <input
        type="search"
        name="keywords"
        placeholder="Enter keywords ..."
        value={keywords}
        onChange={handleChange}
        className="SearchField"
        autoComplete="off"
      />

      <div className="Content">
        {loading && <div className="Spinner"></div>}

        <div className="AdsGrid">
          {adsToShow?.map((ad) => {
            return (
              <div className="Ad" key={ad._id}>
                <img src={ad.imageUrl} alt={ad.primaryText} />
                <h2 className="Title">{ad.headline}</h2>
                <summary>
                  <details>
                    <p>{ad.primaryText}</p>
                    <p>{ad.description}</p>
                  </details>
                </summary>
                <a
                  className="Cta"
                  target="_blank"
                  href={ad.companyId.url}
                  rel="noreferrer"
                >
                  {ad.cta}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
