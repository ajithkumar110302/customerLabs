import React, {useState} from 'react'
import PopUp from '../components/PopUp';
import '../App.css';

const Home = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  console.log("show", showPopUp)
  
  const handlePopUp = () => {
    setShowPopUp(prev => prev=!prev)
  }
  return (
    <div className='home-container'>
      <button className="save-segment" onClick={() => handlePopUp()}>Save Segment</button>
      {showPopUp && <PopUp isOpen={showPopUp} onClose={handlePopUp}/>}
    </div>
  )
}

export default Home