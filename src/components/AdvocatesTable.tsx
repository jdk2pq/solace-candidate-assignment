import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Advocate } from '@/types/advocate'
import { SpinnerGap } from '@phosphor-icons/react'
import { formatPhoneNumber } from 'react-phone-number-input'

export function AdvocatesTable({ advocates = [], loading = false }: { advocates: Advocate[], loading?: boolean }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Degree</TableHead>
          <TableHead className="w-140">Specialties</TableHead>
          <TableHead>Years of Experience</TableHead>
          <TableHead className="text-right">Phone Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && <TableRow><TableCell><SpinnerGap size={32} className='animate-spin' /></TableCell></TableRow>}
        {!loading && advocates.length === 0 ?
          <TableRow><TableCell>No results found</TableCell></TableRow> : advocates.map((advocate) => {
            return (
              <TableRow key={advocate.firstName + advocate.lastName + advocate.phoneNumber}>
                <TableCell>{advocate.firstName}</TableCell>
                <TableCell>{advocate.lastName}</TableCell>
                <TableCell>{advocate.city}</TableCell>
                <TableCell>{advocate.degree}</TableCell>
                <TableCell>
                  {advocate.specialties.join(', ')}
                </TableCell>
                <TableCell>{advocate.yearsOfExperience}</TableCell>
                <TableCell className="text-right">{formatPhoneNumber(`+1${advocate.phoneNumber}`)}</TableCell>
              </TableRow>
            );
        })}
      </TableBody>
    </Table>
  )
}