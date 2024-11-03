import { BrowserRouter } from 'react-router-dom';
import './assets/styles/style.scss';
import Routes from './routes';
import ContextGlobal from './contexts';

function App() {
    return (
        <>
            <BrowserRouter>
                <ContextGlobal>
                    <Routes />
                </ContextGlobal>
            </BrowserRouter>
        </>
    );
}

export default App;
