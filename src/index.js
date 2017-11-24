import React from 'react';
import ReactDOM from 'react-dom';

import { browserHistory } from 'react-router';
import Routes from './routes';

import { Provider } from 'react-redux';
import configureStore from './configureStore';



//import registerServiceWorker from './registerServiceWorker';

const store = configureStore()

ReactDOM.render(
	<Provider store={store}>
		<Routes history={ browserHistory } />
	</Provider>,
	document.getElementById('root')
);
//registerServiceWorker();
