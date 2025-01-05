import StorageKeys from "../constants/storage-key";

export const isAuthenticated = () => {
  const userInfo = JSON.parse(
    sessionStorage.getItem(StorageKeys.TOKEN) || "{}"
  );
  return userInfo && userInfo.accountType;
};

export const isAdmin = (() => {
  const user = JSON.parse(sessionStorage.getItem(StorageKeys.USERINFO) || "{}");
  return user?.accountType === 1;
})();

export const auth = (() => {
  const user = JSON.parse(sessionStorage.getItem(StorageKeys.USERINFO) || "{}");
  return user;
})();
