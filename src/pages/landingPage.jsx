import React from 'react'
import '../styles/landingPage.css'
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import Second from '../components/Second'
import Third from '../components/Third'
import Fourth from '../components/Fourth'


export default function landingPage() {


    return(
        <div>
            <Navbar/>
            <Main/>
            <Second/>
            <Third/>
            <Fourth/>
        </div>
    )
}
