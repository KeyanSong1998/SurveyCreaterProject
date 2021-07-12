import axios from 'axios';
import {FETCH_USER,FETCH_SURVEYS} from './types';

export const fetchUser = () => async (dispatch) => {
    //look setupProxy: there are proxy rule.
    //in product the all the client will runed and saved then work with express backend.
    //in development: this request will go through proxy. 

    //Reduxthunk: with reduxThunk we can dispatch action when we want:
    //in this case: we want to dispatch action after the request is completed.
    
    //dispatch the type will update our user's auth (in reducer)

    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};


export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
  };


  export const submitSurvey = (values,history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
  };

  export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    dispatch({type:FETCH_SURVEYS, payload:res.data});
  }