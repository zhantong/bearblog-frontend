import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {reducer} from './reducers';
import widgets from '../widgets'

const exampleInitialState = {};


export function initializeStore(initialState = exampleInitialState) {
    let reducers = {reducer};
    for (const [pluginName, value] of Object.entries(widgets)) {
        for (const [widgetName, widget] of Object.entries(value)) {
            if (widget.reducer) {
                reducers[widgetName] = widget.reducer
            }
        }
    }
    const combinedReducer = combineReducers(reducers);
    return createStore(
        combinedReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}