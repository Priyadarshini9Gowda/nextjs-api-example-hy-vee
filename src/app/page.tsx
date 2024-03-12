"use client"; 
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!name) return;

    try {
      const [agifyResponse, genderizeResponse, nationalizeResponse] = await Promise.all([
        fetch(`https://api.agify.io?name=${name}`).then((res) => res.json()),
        fetch(`https://api.genderize.io?name=${name}`).then((res) => res.json()),
        fetch(`https://api.nationalize.io?name=${name}`).then((res) => res.json()),
      ]);

      setAge(agifyResponse.age);
      setGender(genderizeResponse.gender);
      if (nationalizeResponse.country.length > 0) {
        const topCountry = nationalizeResponse.country[0];
        setCountry(topCountry.country_id);
      } else {
        setCountry("Unknown");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.inputBox}
            placeholder="Enter a name"
          />
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
      {age && gender && country && (
        <div className={styles.results}>
          <h2>Results</h2>
          <p>Name : {name}</p>
          <p>Age : {age}</p>
          <p>Gender : {gender}</p>
          <p>Country : {country}</p>
        </div>
      )}
    </main>
  );
}
