"use client";

import { ChangeEvent, useEffect, useState } from 'react'
import { Advocate } from '@/types/advocate'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AdvocatesTable } from '@/components/AdvocatesTable'

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
    setSearchTerm('');
  }

  return (
    <main style={{ margin: "24px" }}>
      <h1 className="text-4xl pb-8">Solace Advocates</h1>
      <div className="flex gap-x-2 pb-4">
        <Input type="text" placeholder="Search" className="w-[400px]" value={searchTerm} onChange={onChange} />
        <Button className="cursor-pointer" onClick={onClick}>Reset Search</Button>
      </div>
      <AdvocatesTable advocates={filteredAdvocates} />
    </main>
  );
}
