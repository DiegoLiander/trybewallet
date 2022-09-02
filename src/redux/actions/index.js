export const USER_LOGIN = 'USER_LOGIN';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const ON_REQUEST_FAILURE = 'ON_REQUEST_FAILURE';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const RECEIVE_EXCHANGE_RATES = 'RECEIVE_EXCHANGE_RATES';
export const UPDATE_TOTAL = 'UPDATE_TOTAL';
export const UPDATE_CURRENT_EXPENSE = 'UPDATE_CURRENT_EXPENSE';

export const userLogin = ({ email }) => ({
  type: USER_LOGIN,
  email,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const receiveCurrencies = (json) => ({
  type: RECEIVE_CURRENCIES,
  payload: json,
});

export const onRequestFailure = (errorMsg) => ({
  type: ON_REQUEST_FAILURE,
  payload: errorMsg,
});

export const fetchCurriencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  if (response.ok) dispatch(receiveCurrencies(json));
  else dispatch(onRequestFailure('Soliticação recusada'));
};

export const receiveExchangeRates = (json, id) => ({
  type: RECEIVE_EXCHANGE_RATES,
  id,
  payload: json,
});

export const updateTotal = () => ({
  type: UPDATE_TOTAL,
});

export const fetchExchangeRates = (id) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const json = await response.json();
  dispatch(receiveExchangeRates(json, id));
  dispatch(updateTotal());
};

export const addExpense = (expense, index) => ({
  type: ADD_EXPENSE,
  payload: { ...expense, id: index },
});

export const deleteExpense = (index) => ({
  type: DELETE_EXPENSE,
  index,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  currentExpense: expense,
});

export const updateCurrentExpense = (name, value) => ({
  type: UPDATE_CURRENT_EXPENSE,
  payload: {
    [name]: value,
  },
});
