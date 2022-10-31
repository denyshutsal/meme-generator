import React, { useState, useEffect } from 'react';
import './Meme.scss';

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'https://i.imgflip.com/3i7p.jpg'
  });
  const [allMemes, setAllMemes] = useState([]);
  const API = 'https://api.imgflip.com/get_memes';

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function randomMemeImg() {
    const memes = allMemes;
    const memesLength = Object.keys(allMemes).length;
    const randomIndex = Math.floor(Math.random() * memesLength);
    const url = memes[randomIndex].url;

    setMeme((prevMeme) => ({
      ...prevMeme,
      topText: '',
      bottomText: '',
      randomImage: url
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <main className="main">
      <h1 className="visually-hidden">Meme generator</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="visually-hidden" htmlFor="topText">
          text at the top:
        </label>
        <input
          className="form__input"
          type="text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
          id="topText"
          placeholder="text at the top"
        />
        <label className="visually-hidden" htmlFor="bottomText">
          text below:
        </label>
        <input
          className="form__input"
          type="text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
          id="bottomText"
          placeholder="text below"
        />
        <button onClick={randomMemeImg} className="form__button button">
          Get a new meme image
        </button>
      </form>
      {meme.randomImage && (
        <section className="meme">
          <img className="meme__img" src={meme.randomImage} alt="Meme Image" />
          <h2 className="meme__text-top">{meme.topText ? meme.topText : 'text at the top'}</h2>
          <h2 className="meme__text-bottom">{meme.bottomText ? meme.bottomText : 'text below'}</h2>
        </section>
      )}
    </main>
  );
}
