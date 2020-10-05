import Redux from 'redux'
// Insurance Company Analogy

// Actions (form in insurance company analogy)
const createPolicy = (name, amount) => {
  return {  // 
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount
    }
  }
};

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name
    }
  }
};

const createClaim = (name, amountToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      amountToCollect: amountToCollect
    }
  }
}

// Reducers (departments in analogy)
const claimsHistory = (oldClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    return [...oldClaims, action.payload];
  }
  return oldClaims;
};

const accounting = (companyMoney=1000, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return companyMoney - action.payload.amountToCollect;
  } else if (action.type === 'CREATE_POLICY') {
    return companyMoney + action.payload.amount;
  }
  return companyMoney;
};

const policies = (policiesList = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...policiesList, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return policiesList.filter(name => name !== action.payload.name);
  }
  return policiesList;
};

const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartments);

const action = createPolicy('Adam', 200);
store.dispatch(action)

store.dispatch(createPolicy('Jim', 300));
store.dispatch(createPolicy('John', 250));

store.dispatch(createClaim('Jim', 600));
store.dispatch(createClaim('John', 750));

store.dispatch(deletePolicy('Adam'));

console.log(store.getState());