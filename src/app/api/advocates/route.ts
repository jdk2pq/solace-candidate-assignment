import db from "../../../db";
import { advocates } from '@/db/schema';
import { advocateData } from '@/db/seed/advocates';
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')?.toLowerCase() ?? '';

  if (query) {
    const data = advocateData.filter(advocate => {
      return (
        advocate.firstName.toLowerCase().includes(query) ||
        advocate.lastName.toLowerCase().includes(query) ||
        advocate.city.toLowerCase().includes(query) ||
        advocate.degree.toLowerCase().includes(query) ||
        advocate.specialties.some(s => s.toLowerCase().includes(query)) ||
        advocate.yearsOfExperience.toString().includes(query)
      );
    });

    return Response.json({ data });
  } else {
    return Response.json({ data: advocateData });
  }
}
