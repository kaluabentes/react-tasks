import api from "./api";

export default class UsersApi {
  constructor(token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  getAll() {
    return api.get("/api/v1/users");
  }
}