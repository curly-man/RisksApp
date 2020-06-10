import USERS_DB_URL from './config';
import Requests from '../Requests';

class UserService {
  constructor() {
    this.url = USERS_DB_URL;
    this.http = new Requests();
  }

  getUser() {
    return this.http.get(this.url);
  }

  createUser(userName, userPassword) {
    return this.http.post(this.url, { name: userName, password: userPassword });
  }
}

export default UserService;
