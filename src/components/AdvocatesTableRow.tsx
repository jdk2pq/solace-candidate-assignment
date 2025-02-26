import { Advocate } from '@/types/advocate'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatPhoneNumber } from 'react-phone-number-input/min'

export function AdvocatesTableRow({ advocate }: { advocate: Advocate }) {
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
      <TableCell className="text-right"><a className="underline" href={`tel:${advocate.phoneNumber}`}>{formatPhoneNumber(`+1${advocate.phoneNumber}`)}</a></TableCell>
    </TableRow>
  );
}