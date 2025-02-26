import { Advocate } from '@/types/advocate'

export async function getAdvocates(query?: string): Promise<Advocate[]> {
  const response = await fetch(`/api/advocates${ query ? `?query=${query}` : '' }`);
  return (await response.json()).data;
}