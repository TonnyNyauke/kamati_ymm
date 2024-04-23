import React, { useEffect, useState } from 'react'
import { useTable } from 'react-table';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

function EmployeeDatabase() {
    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        //Fetch employee data from database
        const dbRef = firebase.database().ref('departments');
        const employeeList = [];

        dbRef.on('value', (snapshot) => {
            const data = snapshot.val();

            for (let department in data){
                const employees = data[department];
                for(let id in employees){
                    employeeList.push({id, ...employees[id]});
                }
            }
            setEmployeeData(employeeList);
        })

        return () => {
            dbRef.off();
        };
    }, []);
    const columns = React.useMemo(() =>
    [
        {
            Header: 'First Name',
            accessor: 'first_name',
        },
        {
            Header: 'Last Name',
            accessor: 'last_name',
        },
        {
            Header: 'Phone Number',
            accessor: 'phoneNumber',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Department',
            accessor: 'department',
        },
        {
            Header: 'Job Role',
            accessor: 'jobRole',
        },
        {
            Header: 'Supervisor',
            accessor: 'supervisor',
        },
        {
            Header: 'Pay Rate',
            accessor: 'payRate',
        },
        // Add more columns as needed
    ], []);

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,} = useTable({
        columns,
        data: employeeData,
    });
    console.log('headerGroups:', headerGroups);
    console.log('rows:', rows);
    console.log('prepareRow:', prepareRow);

  return (
    <div>
        <nav>
            <Link to='/LandingPage'>Back</Link>
        </nav>
        <h2>Employee Database</h2>
        <table {...getTableProps()} style={{border: 'solid 1px blue', width:'100%'}}>
            <thead>
                {headerGroups.map((headerGroup) => 
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => 
                    <th
                    {...column.getHeaderProps()}
                    style={{borderBottom: 'solid 3px red',
                            background: 'aliceblue',
                            color: 'black',
                            fontWeight: 'bold',
                            }}>
                    {column.render('Header')}
                    </th>
                    )}
                </tr>)}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} style={{ background: index % 2 === 0 ? '#fafafa' : '#f0f0f0' }}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()}
                                    style={{
                                            padding: '10px',
                                            border: 'solid 1px gray',
                                            background: 'white',
                                        }}>
                                        {cell.render('Cell')}
                                        
                                    </td>
                                )
                            })}
                            <Link to='More'>
                            <i className="fa fa-eye" aria-hidden="false">More</i>
                            </Link>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default EmployeeDatabase