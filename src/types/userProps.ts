export interface UserProps {
  users: [
    {
      _id: string;
      name: string;
      email: string;
      password: string;
      isAdmin: boolean;
    }
  ];
}
