import { useContext, useState } from "react";
import { Usercontext } from "@/context/usersContext";
import Notification from "../Notification/Notification";

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  };
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}



export default function UsersTable({
  users,
}: {
  users: User[]
}) {

  const { setUsers } = useContext(Usercontext)

  const [showNotification, setShowNotification] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | {}>()


  
    function openModal( id: number) {
      setUsers(users.filter((user) => user.id !== id))
      setCurrentUser(users.find((user) => user.id == id))
      setShowNotification(true)
      handleNotification()
    }

    const handleNotification = () => {
      setTimeout(() => {
        setShowNotification(false)
      },2000)
    }

  return (
    <>
    {users &&
      <>
        {showNotification && <Notification name={currentUser?.name}/>}
        <table>
          <thead>
            <tr>
              <th className="bg-[#cfcfcf] text-center p-4">name</th>
              <th className="bg-[#cfcfcf] text-center p-4" >email</th>
              <th className="bg-[#cfcfcf] text-center p-4">company</th>
              <th className="bg-[#cfcfcf] text-center p-4"></th>
            </tr>
          </thead>
          <tbody>
    
            {users.map((el) => (
              <tr key={el.id}>
                <td className="text-center p-4">{el.name}</td>
                <td className="text-center p-4">{el.email}</td>
                <td className="text-center p-4">{el.company.name}</td>
                <td className="text-center p-4">
                  <button onClick={() => openModal(el.id)} >x</button>
                </td>
              </tr>
            ))}
    
          </tbody>
        </table>
    </>
    }
  
    </>
  )
}
