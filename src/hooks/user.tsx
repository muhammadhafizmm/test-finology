import { User } from "../types/User";
import { useFetchFactory } from "./fetch";

const GET_ALL_USER_URL = "https://jsonplaceholder.typicode.com/users";

export function useGetAllUser() {
  return useFetchFactory<User[]>(GET_ALL_USER_URL);
}
