import './hero.css';
import image from '../images/hero-image.jpg';
import Heading from './heading';

export default function Hero() {
    return(
        <div className='hero'>
            <div className='column hero-content'>
                <Heading />
                <p>
                    I am henry, a multi-disciplinary designer with a passion for design.
                    Whether it is exploring emerging design trends, new and technologies or experimenting 
                    with new approaches to design, I constantly seek out new ways to expand my skillset 
                    and knowledge. With experience in various design fields such as graphics design, 
                    branding, web design and product design, my drive for continuous growth and learning 
                    has helped me in acquiring a myriad of skills to help me in my journey to become a 
                    better designer.
                </p>
            </div>
            <img src={image} alt='Udonsi Henry' className='column image' />
        </div>
    );
}