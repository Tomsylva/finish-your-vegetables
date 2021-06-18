import axios from "axios";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";

const restaurantService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}`,
});

export function ADD_RESTAURANT(body, token) {
  return restaurantService.post("/profile/add-restaurant", body, {
    headers: {
      authorization: token,
    },
  });
}

export function UPDATE_IMAGE(body, token, restaurantId) {
  return restaurantService.put(
    `${PATHS.RESTAURANT}/${restaurantId}/image`,
    body,
    {
      headers: {
        authorization: token,
      },
    }
  );
}

export function UPDATE_RESTAURANT(body, token, currentRestaurant) {
  return restaurantService.put(
    `${PATHS.RESTAURANT}/${currentRestaurant._id}`,
    body,
    {
      headers: {
        authorization: token,
      },
    }
  );
}

export function DELETE_RESTAURANT(token, restaurantId) {
  return restaurantService.delete(`/restaurant/${restaurantId}/delete`, {
    headers: {
      authorization: token,
    },
  });
}
