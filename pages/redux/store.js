/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable import/no-import-module-exports */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducers/index';
import rootSaga from './sagas/index';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

function bindMiddleware(middleware) {
    if (!IS_PRODUCTION) {
        const { composeWithDevTools } = require('redux-devtools-extension');
        const { logger } = require('redux-logger');
        middleware.push(logger);
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
}

function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        bindMiddleware([sagaMiddleware])
    );

    store.sagaTask = sagaMiddleware.run(rootSaga);

    if (!IS_PRODUCTION && module.hot) {
        module.hot.accept('./reducers', function () {
            store.replaceReducer(require('./reducers').default);
        });
    }

    return store;
}

export default configureStore;

export const wrapper = createWrapper(configureStore, { debug: false });