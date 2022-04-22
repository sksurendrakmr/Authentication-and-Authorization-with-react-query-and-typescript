import { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { axiosInstance, getJWTHeader } from "../../api";
import { getUserEndPoint, QueryKey } from "../../api/constant";
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from "../../user-storage";
import { UserResponseType } from "../types";

const getUser = async (
  user: UserResponseType | null
): Promise<UserResponseType | null> => {
  if (!user) return null;
  const { data }: AxiosResponse<{ user: UserResponseType }> =
    await axiosInstance.get(getUserEndPoint, {
      headers: getJWTHeader(user.token),
    });
  return data.user;
};

export const useUser = () => {
  const client = useQueryClient();

  const { data: user } = useQuery(
    QueryKey.user,
    (): Promise<UserResponseType | null> => getUser(user as UserResponseType),
    {
      initialData: getStoredUser,
      onSuccess: (receivedUser: UserResponseType | null) => {
        if (!receivedUser) {
          clearStoredUser();
        } else {
          setStoredUser(receivedUser);
        }
      },
    }
  );

  const updateUser = (user: UserResponseType) => {
    client.setQueryData(QueryKey.user, user);
  };

  const clearUser = () => {
    client.setQueryData(QueryKey.user, null);
    client.removeQueries(QueryKey.user);
  };

  return { user, updateUser, clearUser };
};
