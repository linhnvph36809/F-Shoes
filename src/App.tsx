import { BrowserRouter } from 'react-router-dom';
import './assets/styles/style.scss';
import Routes from './routes';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes />
               
            </BrowserRouter>
        </>
    );
}

export default App;
