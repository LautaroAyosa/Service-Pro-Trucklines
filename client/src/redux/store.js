import { configureStore } from "@reduxjs/toolkit";

import deliveriesReducer from "./reducers/deliveriesReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";
import statusesReducer from "./reducers/statusesReducer";

const store = configureStore({
  reducer: {
    statuses: statusesReducer,
    filter: filterReducer,
    deliveries: deliveriesReducer,
    notification: notificationReducer,
  }
});

export default store;