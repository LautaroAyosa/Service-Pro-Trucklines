import { configureStore } from "@reduxjs/toolkit";

import deliveriesReducer from "./reducers/deliveriesReducer";
import notificationReducer from "./reducers/notificationReducer";
import statusesReducer from "./reducers/statusesReducer";

const store = configureStore({
  reducer: {
    statuses: statusesReducer,
    deliveries: deliveriesReducer,
    notification: notificationReducer,
  }
});

export default store;