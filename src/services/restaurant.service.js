import axios from "axios";
import * as CONSTS from "../utils/consts";

const restaurantService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/profile`,
});

export function ADD_RESTAURANT(body, token) {
  return restaurantService.post("/add-restaurant", body, {
    headers: {
      authorization: token,
    },
  });
}
