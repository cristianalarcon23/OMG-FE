import React from 'react'

export default function TransactionRow(props) {
    const {item, buyer, warranty, serialNumber} = props;
  return (
    <tr className="divide-x divide-gray-200">
    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
     {item}
   </td>
   <td className="whitespace-nowrap p-4 text-sm text-gray-500">{buyer}</td>
   <td className="whitespace-nowrap p-4 text-sm text-gray-500">{serialNumber}</td>
   <td className="whitespace-nowrap p-4 text-sm text-gray-500">{warranty}</td>
 </tr>
  )
}
