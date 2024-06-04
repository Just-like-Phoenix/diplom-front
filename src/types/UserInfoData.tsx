export interface UserInfoData {
  id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface AdminUserInfoData {
  id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  middleName: string;
  roles: string[];
  claims: string[];
}
