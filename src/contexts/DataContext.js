import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchDataFromApi, initialFetchApi } from "../utlis/ApiCall";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

const root = "http://100.100.1.254:3001/auth";
// "https://admin.backend.nippontechnology.com/auth/";

const refreshTokenApi =
  // "http://100.100.1.254:3001/auth/refresh-token";
  "https://admin.backend.nippontechnology.com/auth/refresh-token";

const loginApi =
  // "http://100.100.1.254:3001/auth/login";
  "https://admin.backend.nippontechnology.com/auth/login";

const logoutApi =
  "http://100.100.1.254:3001/auth/logout";
  // "https://admin.backend.nippontechnology.com/auth/logout";

const userDataApi =
  // "http://100.100.1.254:3001/db/getAllUserData";
  "https://admin.backend.nippontechnology.com/db/getAllUserData";

const recycleDataApi =
  // "http://100.100.1.254:3001/db/getRecycleData";
  "https://admin.backend.nippontechnology.com/db/getRecycleData";

const createUserApi =
  // "http://100.100.1.254:3001/db/createUser";
  "https://admin.backend.nippontechnology.com/db/createUser";

const deleteUserApi =
  // "http://100.100.1.254:3001/db/deleteUser";
  "https://admin.backend.nippontechnology.com/db/deleteUser";

const deleteRecycleApi =
  // "http://100.100.1.254:3001/db/deleteRecycleData";
  "https://admin.backend.nippontechnology.com/db/deleteRecycleData";

const updateUserApi =
  // "http://100.100.1.254:3001/db/updateUser";
  "https://admin.backend.nippontechnology.com/db/updateUser";

const DataContextProvider = (props) => {
  // const [isAuth, setAuth] = useState(false);
  const [isDataFetched, setDataFetched] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userAllData, setUserAllData] = useState([]);
  const [recyclebinData, setRecyclebinData] = useState([]);

  const unSubscribe = async () => {
    const token = localStorage.getItem("accessToken");
    const { error, fetchedUser } = await initialFetchApi(
      root,
      `bearer ${token}`
    );
    console.log("unsub");
    console.log(
      localStorage.getItem("accessToken"),
      localStorage.getItem("refreshToken")
    );
    console.log(fetchedUser);
    if (error) {
      console.log(error.message);
      console.log("Requesting for new access");
      fetchDataFromApi(
        { refreshToken: localStorage.getItem("refreshToken") },
        refreshTokenApi,
        (res) => {
          const { accessToken, refreshToken, error } = JSON.parse(res);
          console.log(res);
          if (error) {
            console.log(error);
          } else {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            // unSubscribe();
          }
        }
      );
      setDataFetched(true);
    } else {
      setCurrentUser(fetchedUser);
      setDataFetched(true);
    }
  };

  useEffect(() => {
    // console.log(localStorage.getItem("refreshToken"));
    unSubscribe();
  }, []); //eslint-disable-line

  useEffect(() => {
    currentUser && fetchUserAllData();
    currentUser && fetchrRecyleData();
  }, [currentUser]); //eslint-disable-line

  const SignIn = (user, callback) => {
    fetchDataFromApi(user, loginApi, (res) => {
      const { accessToken, refreshToken, error } = JSON.parse(res);
      if (error) {
        callback(error);
      } else {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        unSubscribe();
      }
    });
  };

  const SingOut = () => {
    fetchDataFromApi({}, logoutApi, (res) => {
      const { error } = JSON.parse(res);
      if (error) {
      } else {
        localStorage.setItem("accessToken", null);
        localStorage.setItem("refreshToken", null);
        setCurrentUser(null);
      }
    });
  };

  const fetchUserAllData = (callback) => {
    fetchDataFromApi({}, userDataApi, (res) => {
      const { userData, error } = JSON.parse(res);
      if (error) {
        callback(error);
      } else {
        setUserAllData(userData);
        callback();
      }
    });
  };

  const fetchrRecyleData = (callback) => {
    fetchDataFromApi({}, recycleDataApi, (res) => {
      const { userData, error } = JSON.parse(res);
      if (error) {
        callback(error);
      } else {
        setRecyclebinData(userData);
        callback();
      }
    });
  };

  const createUser = (userAuth, userInfo, callback) => {
    fetchDataFromApi({ userAuth, userInfo }, createUserApi, (res) => {
      callback(JSON.parse(res));
    });
  };

  const deleteUser = (User, callback) => {
    fetchDataFromApi({ UserData: User }, deleteUserApi, (res) => {
      callback(JSON.parse(res));
    });
  };

  const deleteRecycle = (UserID, callback) => {
    fetchDataFromApi({ UserID: UserID }, deleteRecycleApi, (res) => {
      callback(JSON.parse(res));
    });
  };

  const updateUser = (newUserData, callback) => {
    fetchDataFromApi({ userData: newUserData }, updateUserApi, (res) => {
      callback(JSON.parse(res));
    });
  };

  const value = {
    isDataFetched,
    SignIn,
    currentUser,
    fetchUserAllData,
    fetchrRecyleData,
    userAllData,
    createUser,
    deleteUser,
    SingOut,
    updateUser,
    recyclebinData,
    deleteRecycle,
  };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
