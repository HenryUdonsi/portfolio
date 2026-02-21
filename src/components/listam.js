import './otuya.css';
import './listam-card.css';

export default function Listam() {
    return (
        <div className='flex-grid listam-card'>
            <div className='column name'>
                <div className='listam-emoji-badge'>🛒</div>
                <h2>Listam</h2>
                <span className='tag'>Product Design &amp; Prototype</span>
            </div>
            <div className='column descriptor'>
                <p>
                    A "Demand-First" market errand app built for Abuja. Users type their
                    shopping needs in natural language — the app detects keywords in real-time,
                    animating items into a Market Stall for instant visual confirmation. Features
                    include an "Extra Hands" speed-tier system, bank transfer checkout, live
                    order tracking, and one-tap reorder from history.
                </p>
                <a href='/listam' className='listam-view-link'>View prototype →</a>
            </div>
        </div>
    );
}
