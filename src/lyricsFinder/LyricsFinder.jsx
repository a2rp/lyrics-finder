import React, { useEffect, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { FaMusic, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";

const demoArtist = "linkin park";
const demoTitle = "numb";

const LyricsFinder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [artistName, setArtistName] = useState(demoArtist);
  const [songTitle, setSongTitle] = useState(demoTitle);
  const [lyrics, setLyrics] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const searchLyrics = async () => {
    const artist = artistName.trim();
    const title = songTitle.trim();

    if (!artist || !title) {
      toast.error("Enter both an artist name and song title.");
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    setLyrics("");

    try {
      const response = await axios.get(
        "https://api.lyrics.ovh/v1/" + encodeURIComponent(artist) + "/" + encodeURIComponent(title)
      );
      const result = response.data && response.data.lyrics ? response.data.lyrics.trim() : "";

      if (!result) {
        throw new Error("No lyrics were returned for this song.");
      }

      setLyrics(result);
      toast.success("Lyrics found.");
    } catch (error) {
      const message = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : error.message || "Could not find lyrics right now.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadDemoLyrics = async () => {
      try {
        const response = await axios.get(
          "https://api.lyrics.ovh/v1/" + encodeURIComponent(demoArtist) + "/" + encodeURIComponent(demoTitle)
        );
        if (active && response.data && response.data.lyrics) {
          setLyrics(response.data.lyrics.trim());
          setHasSearched(true);
        }
      } catch {
        if (active) {
          setHasSearched(true);
        }
      }
    };

    loadDemoLyrics();
    return () => {
      active = false;
    };
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    searchLyrics();
  };

  return (
    <section id="search" className={styles.container} aria-labelledby="page-title">
      <div className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Search your soundtrack</p>
            <h1 id="page-title">Find the lyrics that stay with you.</h1>
            <p className={styles.intro}>
              Search by artist and song title, then read the result in a calm,
              distraction-free panel.
            </p>
            <div className={styles.heroNote}>
              <FaMusic aria-hidden="true" />
              <span>Try the sample search for Linkin Park - Numb.</span>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src={process.env.PUBLIC_URL + "/preview.png"} alt="Lyrics Finder interface preview" />
          </div>
        </div>

        <div className={styles.searchCard}>
          <div className={styles.cardHeading}>
            <div>
              <p className={styles.eyebrow}>Start a search</p>
              <h2>What are you listening to?</h2>
            </div>
            <FaSearch aria-hidden="true" />
          </div>
          <form onSubmit={handleFormSubmit} className={styles.form}>
            <TextField
              value={artistName}
              onChange={(event) => setArtistName(event.target.value)}
              label="Artist name"
              placeholder="For example, Linkin Park"
              required
              fullWidth
              className={styles.textField}
            />
            <TextField
              value={songTitle}
              onChange={(event) => setSongTitle(event.target.value)}
              label="Song title"
              placeholder="For example, Numb"
              required
              fullWidth
              className={styles.textField}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
              startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : <FaSearch />}
            >
              {isLoading ? "Searching" : "Find lyrics"}
            </Button>
          </form>
        </div>

        <div className={styles.lyricsHeader}>
          <div>
            <p className={styles.eyebrow}>Reading panel</p>
            <h2>Lyrics result</h2>
          </div>
          {lyrics && <span className={styles.resultStatus}>Ready to read</span>}
        </div>
        <div className={styles.lyricsContainer} aria-live="polite">
          {isLoading && (
            <div className={styles.emptyState}>
              <CircularProgress size={28} />
              <p>Looking for the lyrics...</p>
            </div>
          )}
          {!isLoading && lyrics && <pre>{lyrics}</pre>}
          {!isLoading && !lyrics && hasSearched && (
            <div className={styles.emptyState}>
              <FaMusic aria-hidden="true" />
              <p>No lyrics to display yet. Try another artist and title.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LyricsFinder;
