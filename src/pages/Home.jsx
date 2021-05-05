import Header from '../components/Header'
import Timeline from '../components/Timeline'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <>
      <Header />

      <div className='container grid grid-cols-3 mx-auto  md:max-w-screen-md pt-8'>
        <div className='col-span-3 lg:col-span-2'>
          <Timeline />
        </div>
        <div className='hidden lg:block'>
          <Sidebar />
        </div>
      </div>
    </>
  )
}

export default Home
