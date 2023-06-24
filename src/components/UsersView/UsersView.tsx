
import { use, useState, useContext } from "react";
import { Usercontext } from "@/context/usersContext";
import UsersTable from '../UsersTable/UsersTable'

async function getUsers () {
    const data = await fetch('https://jsonplaceholder.typicode.com/users');
    return data.json();
}

export default function UsersView() {
    const {value, setUsers} = useContext(Usercontext)
  
    const handleClick = async() => {
        const usersData = await getUsers()
        setUsers(usersData)
        console.log(value)
    }

  return (
    <div className="flex flex-col items-center">
     <button className="bg-[#a0a0a0] rounded p-2 my-4 w-32" onClick={handleClick} >fetch users</button>
    <UsersTable users={value}/>
    </div>
   
  )
}
