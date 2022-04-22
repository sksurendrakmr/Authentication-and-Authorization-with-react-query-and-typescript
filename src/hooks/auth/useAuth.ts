import axios, { AxiosResponse } from "axios";
import { axiosInstance } from "../../api";
import { signinEndPoint, signupEndPoint } from "../../api/constant";
import { SignInInput, SignUpInput, UserResponseType } from "../types";

type UseAuth = {
  signin: (data:SignInInput) => Promise<void>;
  signup: (data:SignUpInput) => Promise<void>;
  signout: () => void;
};

type UserResponse = { user: UserResponseType };
type ErrorResponse = { message: string };
type AuthResponseType = UserResponse | ErrorResponse;

const SERVER_ERROR = "There was an error connecting the server";

export const useAuth = (): UseAuth => {
  const authServerCall = async <T>(urlEndpoint:string,inputData: T) => {
    try {
      const { data, status }: AxiosResponse<AuthResponseType> =
        await axiosInstance({
          url: urlEndpoint,
          method: "POST",
          data: inputData,
          headers: { "Content-Type": "application/json" },
        });

      if (status === 400) {
        const title = "message" in data ? data.message : "Unauthorized";
        //TODO show Toast
        return;
      }
      if ("user" in data && "token" in data.user) {
        //TODO show toast
        //TODO - updateUser
      }
    } catch (error) {
      const title =
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response?.data.message
          : SERVER_ERROR;
      //TODO show toast
    }
  };

  const signin = async (signInData: SignInInput) => {
    authServerCall<SignInInput>(signinEndPoint,signInData)
  };

  const signup = async(signupData:SignUpInput) => {
      authServerCall<SignUpInput>(signupEndPoint,signupData);
  }

  const signout = () => {
      //TODO Clear the user cache from useUser
  }


  return {signin,signout,signup}
};
