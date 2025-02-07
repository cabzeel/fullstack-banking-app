import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
   const loggedIn = {
      $id: 'string',
      firstName: 'Timchia',
      lastName: 'Cabzeel',
      userId : '#3mgl3or',
      email: 'zilodev831@gmail.com',
      dwollaCustomerUrl: 'string;',
      dwollaCustomerId: 'string;',
      address1: 'string;',
      city: 'string;',
      state: 'string;',
      postalCode: 'string;',
      dateOfBirth: 'string;',
      ssn: 'string'
   }
  return (
    <section className='home'>
      <div className='home-content'>
         <header className="home-header">
            <HeaderBox 
               type= "greeting"
               title= "Welcome"
               user = {loggedIn?.firstName || "Guest"}
               subtext= "Track all your accounts in one place effectively"
            />
            <TotalBalanceBox
               accounts={[]}
               totalBanks={1}
               totalCurrentBalance= {1250.40}
            />
         </header>
         RECENT TRANSACTIONS
      </div>

      <RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance: 1450}, {currentBalance: 3540}]} />
    </section>
  )
}

export default Home