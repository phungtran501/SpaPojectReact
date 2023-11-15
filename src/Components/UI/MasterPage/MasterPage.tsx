import Header from '../Header';
import {Outlet } from 'react-router-dom';
import Footer from '../Footer';
import '../../../assets/css/bootstrap.min.css'
import '../../../assets/css/fontawesome.min.css';
import '../../../assets/css/style.css';


const MasterPage = () => (
    <div>
        <header className="vs-header header-layout3">
            <Header/>
        </header>

        <Outlet/>
        
        <footer className="footer-wrapper footer-layout1">
            <Footer/>
        </footer> 
    </div>
);

export default MasterPage