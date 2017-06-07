import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// LAYOUT
import App from './components/layout/App.js';
import NotFound from './components/layout/NotFound';
import AppLayout from './components/layout/AppLayout';

// CALCULATOR
import Calculator from './components/calculator/Calculator';

// TAGS
import Tags from './components/tags/Tags';

// HOME
import Home from './components/home/Home';

import {Provider} from 'react-redux';
import reducers from './reducers/reducers';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const middleware = applyMiddleware(promise(), thunk);
const store = createStore(reducers, middleware);

require('./styles/style.scss');

ReactDOM.render(
	<Provider store={store}>
		<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home}/>
			</Route>
			<Route path="/calculator" component={App}>
				<Route component={AppLayout}>
					<IndexRoute component={Calculator}/>
				</Route>
			</Route>
			<Route path="/tags" component={App}>
				<Route component={AppLayout}>
					<IndexRoute component={Tags}/>
				</Route>
			</Route>
			<Route path="*" component={App}>
				<IndexRoute component={NotFound}/>
			</Route>
		</Router>
	</Provider>, document.getElementById('app')
);
