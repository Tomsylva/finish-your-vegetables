import axios from "axios";
import * as CONSTS from "../utils/consts";

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
