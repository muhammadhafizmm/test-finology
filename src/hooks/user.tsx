import { useMemo } from "react";
import { User } from "../types/User";
import { useFetchFactory } from "./fetch";

const GET_ALL_USER_URL = "https://jsonplaceholder.typicode.com/users";

type GetAllUserOptions = {
  onSelect?: (data: User[]) => User[];
};

export function useGetAllUser({ onSelect }: GetAllUserOptions) {
  const { data, ...rest } = useFetchFactory<User[]>(GET_ALL_USER_URL);

  const options = useMemo(() => {
    if (!data) return { cities: [], companies: [] };

    const uniqueCities = new Set<string>();
    const uniqueCompanies = new Set<string>();

    data.forEach((item) => {
      uniqueCities.add(item.address.city);
      uniqueCompanies.add(item.company.name);
    });

    return {
      cities: Array.from(uniqueCities).map((value) => ({
        label: value,
        value,
      })),
      companies: Array.from(uniqueCompanies).map((value) => ({
        label: value,
        value,
      })),
    };
  }, [data]);

  return {
    data: onSelect ? onSelect(data || []) : data,
    options,
    ...rest,
  };
}
