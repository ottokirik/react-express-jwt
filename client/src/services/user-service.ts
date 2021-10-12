import { AxiosResponse } from 'axios';
import { $api } from '../http';
import { IUser } from '../models/user';

class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }
}

export { UserService };
