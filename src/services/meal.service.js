import axios from "axios";
import * as CONSTS from "../utils/consts";

const mealService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}`,
});

export function ADD_MEAL(body, token) {
  return mealService.post("/restaurant/meal", body, {
    headers: {
      authorization: token,
    },
  });
}

export function RESERVE_MEAL(token, mealId) {
  return mealService.put(
    `/meal/${mealId}`,
    { token: token },
    {
      headers: {
        authorization: token,
      },
    }
  );
}

export function DELETE_MEAL(token, mealId, restaurantId) {
  return mealService.delete(`/restaurant/${restaurantId}/meal/${mealId}`, {
    headers: {
      authorization: token,
    },
  });
}
