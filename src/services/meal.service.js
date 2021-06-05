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