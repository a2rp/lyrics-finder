import React, { useEffect, useState } from "react";
import {
  FaCode,
  FaCodepen,
  FaFacebook,
  FaGithub,
  FaHeart,
  FaLinkedin,
  FaPatreon,
  FaYoutube,
  FaCoffee,
  FaMusic,
} from "react-icons/fa";
import { FiArrowUp, FiBookOpen, FiMail, FiMenu, FiX } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import LyricsFinder from "./lyricsFinder/LyricsFinder";
import styles from "./app.module.scss";

const footerLinks = [
  { label: "Portfolio", href: "https://www.ashishranjan.net/", icon: FaCode },
  { label: "GitHub", href: "https://github.com/a2rp", icon: FaGithub },
  { label: "CodePen", href: "https://codepen.io/ash1198", icon: FaCodepen },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aashishranjan", icon: FaLinkedin },
  { label: "Facebook", href: "https://www.facebook.com/theash.ashish/", icon: FaFacebook },
  { label: "YouTube", href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", icon: FaYoutube },
  { label: "Email", href: "mailto:ash.ranjan09@gmail.com", icon: FiMail },
  { label: "Support", href: "https://a2rp-donation-page.netlify.app/", icon: FaHeart },
  { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/a2rp", icon: FaCoffee },
  { label: "Patreon", href: "https://patreon.com/a2rp", icon: FaPatreon },
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" onClick={closeMobileMenu} aria-label="Lyrics Finder home">
          <img src={process.env.PUBLIC_URL + "/logo.png"} alt="Ashish Ranjan logo" />
          <span>
            <small>Song search utility</small>
            <strong>Lyrics Finder</strong>
          </span>
        </a>

        <button
          className={styles.menuButton}
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
          aria-controls="main-navigation"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>

        <nav id="main-navigation" className={styles.navigation + (mobileMenuOpen ? " " + styles.navigationOpen : "")} aria-label="Main navigation">
          <a href="#search" onClick={closeMobileMenu}><FaMusic aria-hidden="true" /> Search lyrics</a>
          <a href="#how-it-works" onClick={closeMobileMenu}><FiBookOpen aria-hidden="true" /> How it works</a>
          <a href="https://github.com/a2rp/lyrics-finder" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}><FaGithub aria-hidden="true" /> Source</a>
        </nav>
      </header>

      <main id="top">
        <LyricsFinder />
        <section id="how-it-works" className={styles.howItWorks} aria-labelledby="how-it-works-title">
          <div>
            <p className={styles.eyebrow}>Simple by design</p>
            <h2 id="how-it-works-title">Find the words behind the song.</h2>
          </div>
          <div className={styles.steps}>
            <article>
              <span>01</span>
              <h3>Enter a song</h3>
              <p>Type the artist and title you want to explore.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Search the API</h3>
              <p>The app requests the matching lyrics from the public lyrics service.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Read and revisit</h3>
              <p>Review the result in a focused reading panel and start another search.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div>
            <p className={styles.eyebrow}>Keep exploring</p>
            <p className={styles.footerText}>More frontend experiments and practical projects.</p>
          </div>
          <nav className={styles.socialLinks} aria-label="Social and support links">
            {footerLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                <Icon aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
        <div className={styles.footerBottom}>
          Copyright © {new Date().getFullYear()}{" "}
          <a href="https://www.ashishranjan.net" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a>
        </div>
      </footer>

      <button
        className={styles.topButton + " " + (showTopButton ? styles.topButtonVisible : "")}
        type="button"
        onClick={scrollToTop}
        aria-label="Go to top"
      >
        <FiArrowUp aria-hidden="true" />
      </button>
      <ToastContainer position="bottom-right" autoClose={2800} theme="colored" />
    </div>
  );
}

export default App;
