"use client"
import { useContext } from 'react'
import UsersView from '../components/UsersView/UsersView'
import {Usercontext, UsersProvider} from '../context/usersContext'

 export default function Home() {
  const userTheme = useContext(Usercontext)
  return (
    <UsersProvider>
      <UsersView/>
    </UsersProvider>
  )
}
