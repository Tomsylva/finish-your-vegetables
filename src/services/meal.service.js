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

export function UNRESERVE_MEAL(token, mealId) {
  return mealService.put(
    `/meal/${mealId}/unreserve`,
    { token: token },
    {
      headers: {
        authorization: token,
      },
    }
  );
}

export function UNRESERVE_MEAL_RESTAURANT(token, currentOwner, mealId) {
  return mealService.put(
    `/meal/${mealId}/unreserve/restaurant`,
    { token: token, currentOwner: currentOwner },
    {
      headers: {
        authorization: token,
      },
    }
  );
}

export function COMPLETE_ORDER(
  token,
  mealId,
  currentOwner,
  currentRestaurant,
  customerId
) {
  return mealService.put(
    `/meal/${mealId}/complete`,
    {
      token: token,
      currentOwner: currentOwner,
      currentRestaurant: currentRestaurant,
      customerId: customerId,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );
}

export function COLLECT_MEAL(userId) {
  return mealService.get(`/meal/${userId}/collect`);
}

export function SHOW_INFO(userId) {
  return mealService.get(`/meal/${userId}/completed`);
}

export function DELETE_MEAL(token, mealId, restaurantId) {
  return mealService.delete(`/restaurant/${restaurantId}/meal/${mealId}`, {
    headers: {
      authorization: token,
    },
  });
}
