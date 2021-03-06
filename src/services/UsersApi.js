import api from "./api";

export default class UsersApi {
  constructor(token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  getAll() {
    return api.get("/api/v1/users");
  }

  getOne(id) {
    return api.get(`/api/v1/users/${id}`);
  }

  delete(id) {
    return api.delete(`/api/v1/users/${id}`);
  }

  create(body) {
    return api.post("/api/v1/users", body);
  }

  update(id, body) {
    return api.patch(`/api/v1/users/${id}`, body);
  }
}
