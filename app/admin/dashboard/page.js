"use client";
import React from 'react';
import {useState,} from 'react';
import UserTable from './userTable';
import MeterTable from './meterTable';
import BillTable from './billTable';
 
const Userlist = () => {
 
    const [selectedUser, setselectedUser] = useState(null)
    const [selectedMeter, setselectedMeter] = useState(null)
 
  const [table, setTable] = useState(0);
 
  return (
   
    <div className='w-full h-full p-2 flex flex-col space-y-2 overflow-y-auto'>
    {table == 0 && <UserTable setTable = {setTable} setselectedUser={setselectedUser}/>}
    {table == 1 && <MeterTable userId={selectedUser} setselectedUser={setselectedUser} setselectedMeter={setselectedMeter} setTable={setTable}/>}
    {table == 2 && <BillTable meterId={selectedMeter} setselectedMeter={setselectedMeter} setTable={setTable}/>}
    </div>
  );
};
 
export default (Userlist) ;