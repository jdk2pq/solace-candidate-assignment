import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Advocate } from '@/types/advocate'

export function AdvocatesTable({ advocates }: { advocates: Advocate[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Degree</TableHead>
          <TableHead>Specialties</TableHead>
          <TableHead>Years of Experience</TableHead>
          <TableHead>Phone Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {advocates.map((advocate) => {
          return (
            <TableRow key={advocate.firstName + advocate.lastName + advocate.phoneNumber}>
              <TableCell>{advocate.firstName}</TableCell>
              <TableCell>{advocate.lastName}</TableCell>
              <TableCell>{advocate.city}</TableCell>
              <TableCell>{advocate.degree}</TableCell>
              <TableCell>
                {advocate.specialties.map((s) => (
                  <div key={s}>{s}</div>
                ))}
              </TableCell>
              <TableCell>{advocate.yearsOfExperience}</TableCell>
              <TableCell>{advocate.phoneNumber}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  )
}