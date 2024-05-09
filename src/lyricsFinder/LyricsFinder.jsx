import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import parse from 'html-react-parser';

const LyricsFinder = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [artistName, setArtistName] = useState("linkin park");
    const [songTitle, setSongTitle] = useState("numb");
    const [lyrics, setLyrics] = useState(null);

    const searchLyrics = async () => {
        try {
            const data = {
                artist: artistName,
                title: songTitle,
            };
            setIsLoading(true);
            setLyrics(null);
            const response = await axios(`https://api.lyrics.ovh/v1/${data.artist}/${data.title}`);
            console.log(response, "response");
            setLyrics(response.data.lyrics);
            toast.success("Lyrics found");
        } catch (error) {
            console.log(error, "error");
            toast.error(error.response.data.error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        searchLyrics();
    };

    useEffect(() => {
        searchLyrics();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.heading}>Lyrics Finder</div>
                <form onSubmit={handleFormSubmit} className={styles.form}>
                    <TextField
                        value={artistName}
                        onChange={event => setArtistName(event.target.value)}
                        label="Artist name"
                        placeholder="Artist name"
                        required
                    />
                    <TextField
                        value={songTitle}
                        onChange={event => setSongTitle(event.target.value)}
                        label="Song title"
                        placeholder="Song title"
                        required
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                        className={styles.submitButton}
                    >{isLoading ? <CircularProgress sx={{ padding: "10px" }} /> : "Find lyrics"}</Button>
                </form>

                <div className={styles.lyricsContainer}>
                    {lyrics != null && <>
                        <pre>{parse(lyrics)}</pre>
                    </>}
                </div>
            </div>
        </div>
    )
}

export default LyricsFinder

