import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { StoreProvider } from './providers/StoreProvider/StoreProvider.tsx';
import { LoadingProvider } from './providers/LoadingProvider/LoadingProvider.tsx';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <LoadingProvider>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </LoadingProvider>
    </StoreProvider>
);
