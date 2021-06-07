import axios from "axios";
import * as CONSTS from "../utils/consts";

const profileService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/profile`,
});

export function UPDATE_PROFILE(body, token) {
  return profileService.put("/update", body, {
    headers: {
      authorization: token,
    },
  });
}

export function DELETE_PROFILE(token) {
  return profileService.delete("/delete", {
    headers: {
      authorization: token,
    },
  });
}
