import { useNavigate } from 'react-router-dom';
import './NavBar.css'

export function NavBar() {

    const navigate = useNavigate()
    return (
        <>
            <nav>
                <div className="side-bar-logo"><img src="notebook.svg" alt="" />
                    <div>
                        <span>My Notes App</span><span>Your keeper of memory</span>
                    </div>

                </div>
                <div className="vertical-divider"></div>
                <ul>
                    <li onClick={() => { navigate('/') }}><img src="notes.svg" alt="" /><span>
                        All Notes
                    </span></li>

                    <li onClick={() => { navigate('/') }}><img src="settings.svg" alt="" /><span>
                        Settings
                    </span></li>

                </ul>
            </nav></>
    );
}