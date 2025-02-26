"use client";

import debounce from 'lodash.debounce'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AdvocatesTable } from '@/components/AdvocatesTable'
import { getAdvocates } from '@/api/advocates'
import type { Advocate } from '@/types/advocate'
import { ModeToggle } from '@/components/ui/mode-toggle'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdvocates() {
      const advocates = await getAdvocates();
      setAdvocates(advocates);
      setLoading(false);
    }
    fetchAdvocates();
  }, [])

  async function getFilteredAdvocates(query: string) {
    const advocates = await getAdvocates(query);
    setFilteredAdvocates(advocates);
    setLoading(false);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounced_getFilteredAdvocates = useCallback(debounce(getFilteredAdvocates, 300), []);

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const newSearchTerm = e.target.value.toLowerCase();
    setSearchTerm(newSearchTerm)
    if (newSearchTerm.trim() && newSearchTerm.trim() !== searchTerm.trim()) {
      setLoading(true);
      await debounced_getFilteredAdvocates(newSearchTerm);
    }
  }

  function onClick() {
    setSearchTerm('');
  }

  return (
    <main className="m-8">
      <div className="flex gap-x-2 pb-4 justify-end">
        <Input autoFocus type="text" placeholder="Search" className="w-[400px]" value={searchTerm} onChange={onChange} />
        <Button className="cursor-pointer" onClick={onClick}>Reset Search</Button>
        <ModeToggle />
      </div>
      <h3 className="text-center text-3xl pb-8">Solace Advocates</h3>
      <AdvocatesTable advocates={searchTerm.trim() && !loading ? filteredAdvocates : loading ? [] : advocates} loading={loading} />
    </main>
  );
}
