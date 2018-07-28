import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import rootReducer from './reducers';

const history = createBrowserHistory();

const store = createStore(
    connectRouter(history)(rootReducer),
    compose(
        applyMiddleware(
            routerMiddleware(history)
        ),
    )
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" render={() => (<App/>)} />
                <Route render={() => (<div>404</div>)} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);