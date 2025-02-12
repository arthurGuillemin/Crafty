import React from 'react'
import {Link} from 'react-router-dom'


const Home = () => {
    return (
        <div className="home-page">
            <div>
                <Link to="/login" className="button">Se connecter</Link>
                <Link to="/register" className="button">S'inscrire</Link>
            </div>

        </div>
    )
}

export default Home;