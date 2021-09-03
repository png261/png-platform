import React from 'react';
import ReactDOM from 'react-dom';
import App from 'src/App/App';
import 'src/assets/scss/index.scss';
import { Provider } from 'react-redux';
import store from 'src/store';
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
