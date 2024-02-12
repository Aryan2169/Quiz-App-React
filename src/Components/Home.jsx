import { Link } from 'react-router-dom'
import "./home.css"

const Home = () => {
  return (
    <div className='welcome'>
      <h1>Welcome to Quiz-App</h1>
      <h2>To start the Quiz</h2>
      <button className='btn'><Link className='link' to="/quiz">Click here</Link></button>
    </div>
  )
}

export default Home
