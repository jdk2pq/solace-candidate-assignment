"use client";

import { ChangeEvent, useEffect, useState } from 'react'
import { Advocate } from '@/types/advocate'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const newSearchTerm = e.target.value;
    const lowerCasedSearchTerm = newSearchTerm.toLowerCase()
    setSearchTerm(newSearchTerm)

    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(lowerCasedSearchTerm) ||
        advocate.lastName.toLowerCase().includes(lowerCasedSearchTerm) ||
        advocate.city.toLowerCase().includes(lowerCasedSearchTerm) ||
        advocate.degree.toLowerCase().includes(lowerCasedSearchTerm) ||
        advocate.specialties.some(s => s.toLowerCase().includes(lowerCasedSearchTerm)) ||
        advocate.yearsOfExperience.toString().includes(lowerCasedSearchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  }

  function onClick() {
    setFilteredAdvocates(advocates);
  }

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term">{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
        {filteredAdvocates.map((advocate) => {
          return (
            <tr key={advocate.firstName + advocate.lastName + advocate.phoneNumber}>
              <td>{advocate.firstName}</td>
              <td>{advocate.lastName}</td>
              <td>{advocate.city}</td>
              <td>{advocate.degree}</td>
              <td>
                {advocate.specialties.map((s) => (
                  <div key={s}>{s}</div>
                ))}
              </td>
              <td>{advocate.yearsOfExperience}</td>
              <td>{advocate.phoneNumber}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </main>
  );
}
