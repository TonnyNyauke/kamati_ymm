'use client'

import React, { ChangeEvent, useState } from 'react';
import { useTable} from 'react-table';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import styled from 'styled-components';
import ReactQuill from 'react-quill';

interface HealthPlanEntry {
  time: string;
  programme: string;
  menu: string;
  guide: string;
}
interface DailyTable{
  day: number,
  data: HealthPlanEntry[],
}

const SeparatorLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #413333; /* Adjust color as needed */
  margin: 12px 0; /* Adjust spacing as needed */
`;

function Page() {
  const columns = React.useMemo(() => [
      {
        Header: 'Time',
        accessor: 'time' as const,
      },
      {
        Header: 'Programme',
        accessor: 'programme' as const,
      },
      {
        Header: 'Menu',
        accessor: 'menu' as const,
      },
      {
        Header: 'Guide',
        accessor: 'guide' as const,
      },
    ],
    []
  );

  const data = React.useMemo(() => [
      
    ],
    []
  );
  const [inputData, setInputData] = useState<HealthPlanEntry[]>([
    { time: "", programme: "", menu: "", guide: "" }
  ]);
  const [dailyTables, setDailyTables] = useState<DailyTable[]>([
    { day: 1, data: [{ time: "", programme: "", menu: "", guide: "" }] }
  ])
  const [displayData, setDisplayData] = useState<HealthPlanEntry[]>([]);
  const [currentDay, setCurrentDay] = useState(1)
  const [month, setMonth] = useState(false)
  
  const {getTableProps, getTableBodyProps, headerGroups, prepareRow, rows} = useTable({
    columns,
    data : inputData}); //Create a new Row object for each HelathPlanEntry


    const handleInputChange = <K extends keyof HealthPlanEntry>(rowIndex: number, accessor: K, value: HealthPlanEntry[K]) => {
        const newData = [...inputData];
        newData[rowIndex][accessor] = value;
        setInputData(newData);

    };
  
    const handleAddRow = () => {
      setDisplayData([...displayData, ...inputData]);
      setInputData([{ time: "", programme: "", menu: "", guide: "" }])
    };
  

    const handleSetDay = () => {
      if (inputData.length > 0) {
        setDailyTables((prevTables) => [
          ...prevTables,
          { day: currentDay, data: inputData }
        ]);
        setInputData([{ time: "", programme: "", menu: "", guide: "" }]);
        setDisplayData([])
        setCurrentDay(currentDay + 1);
      }
    };
  
  //Set table function
  const handleSetProgramme = async () => {
    if (dailyTables.length === 10){
      try {
        const programmeData = dailyTables.map((dayTable, index) => ({
          day: `Day ${index + 1}`,
          data: dayTable.data
        }))
        console.log(programmeData)
        const programmeRef = collection(db, "HealthPlans");
        await addDoc(programmeRef, {
          programmeData: programmeData
        });
        setDailyTables([])
        setDisplayData(dailyTables.flatMap((dayTable) => dayTable.data))
      } catch (error) {
        console.log(error)
      }
      alert("Added to database")
    }
    else {
      alert("The programme is less than 10 days")
    }
    
  }

  function handleMonthSet(event: ChangeEvent<HTMLSelectElement>): void {
    setMonth(true);
  }

  const handleRemoveRow = (rowIndex: number) => {
    setDisplayData((prevData) => prevData.filter((_, index) => index !== rowIndex));
  };
  
  
  const handleClearTable = () => {
    setDisplayData([]);
    setInputData([{ time: "", programme: "", menu: "", guide: "" }]);
  };
  

  return (
    <div className='mx-auto p-4'>
      <header>
        
      </header>
      <div className='flex flex-col items-center justify-center mt-8'>
        <div className='flex flex-row gap-4 mb-8'>
          <select className="py-2 px-8 border border-gray-300 rounded-md text-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500">
            <option>Diabetes</option>
            <option>Pressure</option>
            <option>Obesity</option>
          </select>
          <select className="py-2 px-8 border border-gray-300 rounded-md text-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
          onChange={handleMonthSet}>
            <option value="month_1">Month 1</option>
            <option value="month_2">Month 2</option>
            <option value="month_3">Month 3</option>
          </select>
          {month && <MonthOne />}
        </div>
          <div className='mb-8'>
            <h2 className='text-xl font-semibold text-center mt-4'>Day {currentDay}</h2>
            <table {...getTableProps()} className='min-w-full bg-white shadow-md rounded-md overflow-hidden'>
              <thead className='bg-green-600 text-white'>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} >
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()} className= "px-4 py-2 text-left">
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, rowIndex) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()} className="border-t">
                      {row.cells.map((cell) => (
                        <td className="px-4 py-2">
                          <ReactQuill
                            value={inputData[rowIndex][cell.column.id as keyof HealthPlanEntry] || ""}
                            onChange={(value) => handleInputChange(rowIndex, cell.column.id as keyof HealthPlanEntry, value)}
                            className="w-full py-2 px-2 border rounded-md"
                          />
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <button onClick={() => handleAddRow()} 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded mt-4 ml-auto block">Add Row</button>
          </div>
        
      </div>
      <SeparatorLine />
      <div className='w-10/12 my-4 flex flex-col justify-center mx-auto'>
        <h2 className='text-xl font-semibold mb-4'>Input Data:</h2>
        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-green-600 text-white'>
            <tr>
              <th className="py-2 px-4 text-left">Time</th>
              <th className="py-2 px-4 text-left">Programme</th>
              <th className="py-2 px-4 text-left">Menu</th>
              <th className="py-2 px-4 text-left">Guide</th>
              <th className="py-2 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t">
                <td className="px-4 py-2 border-b-2 border-r-2">{row.time}</td>
                <td className="px-4 py-2 border-b-2 border-r-2">{row.programme}</td>
                <td className="px-4 py-2 border-b-2 border-r-2">{row.menu}</td>
                <td className="px-4 py-2 border-b-2 border-r-2">{row.guide}</td>
                <td className="px-4 py-2 border-b-2 border-r-2">
                  <button onClick={() => handleRemoveRow(rowIndex)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">Remove Cell</button></td>
              </tr>)
              )}
            </tbody>
        </table>
        <div className='flex justify-between'>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleClearTable}>Clear Table</button>
          <button onClick={handleSetDay} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">Set Day</button>
        </div>
      </div>
      <SeparatorLine />
      <div className='flex flex-col justify-center items-center'>
        <DayButtons dailyTables = {dailyTables} setDailyTables = {setDailyTables} setCurrentDay = {setCurrentDay}/>
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleSetProgramme}>Set Programme</button>
        </div>
    </div>
  );
}

export default Page;

function MonthOne(){
  return (
    <div>
      <select>
        <option>Days 1 - 10</option>
        <option>Days 11 - 20</option>
        <option>Days 21 - 30</option>
      </select>
    </div>
  )
}
const DayButtons = ({dailyTables, setDailyTables, setCurrentDay}: {dailyTables: DailyTable[], setDailyTables: React.Dispatch<React.SetStateAction<DailyTable[]>>,
setCurrentDay: React.Dispatch<React.SetStateAction<number>>}) => {
const handleClearProgramme = () => {
    setDailyTables([])
    setCurrentDay(1);
  };
  return (
    <div className="w-6/12 mx-auto my-4">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Daily Plans</h2>
        {dailyTables.map((table, index) => (
          <div key={index} className="bg-white p-2 mb-2 rounded-md shadow-sm">
            <p className="text-gray-700">Day {table.day}</p>
          </div>
        ))}
        <button onClick={handleClearProgramme} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4">Clear Programme</button>
      </div>
    </div>

  );
};



