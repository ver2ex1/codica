export function promiseReducer(state, { type, name, status, payload, error }) {
  if (!state) {
    return {}; //{status , payload , error}
  }
  if (type === "PROMISE") {
    return {
      ...state,
      [name]: { status, payload, error },
    };
  }
  return state;
}

export const actionPending = (name) => ({
  type: "PROMISE",
  status: "PENDING",
  name,
});

export const actionResolved = (name, payload) => ({
  type: "PROMISE",
  status: "RESOLVED",
  name,
  payload,
});

export const actionRejected = (name, error) => ({
  type: "PROMISE",
  status: "REJECTED",
  name,
  error,
});

export const actionPromise = (name, promise) => async (dispatch) => {
  dispatch(actionPending(name));
  try {
    let payload = await promise;
    dispatch(actionResolved(name, payload));
    return payload;
  } catch (error) {
    dispatch(actionRejected(name, error));
  }
};
