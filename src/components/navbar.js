import './navbar.css';
import logo from '../logo.svg';

export default function NavBar() {
    return (
        <header className='Nav'>
            <img src={logo} alt="logo" className='image'/>
            <ul className='Nav-content'>
                <li className='Nav-item'>
                    <a className='Nav-links' href='#'>Home</a>
                </li>
                <li className='Nav-item'>
                    <a className='Nav-links' href='#'>Work</a>
                </li>
                <li className='Nav-item'>
                    <a className='Nav-links' href='#'>About</a>
                </li>
            </ul>
        </header>
    );
}