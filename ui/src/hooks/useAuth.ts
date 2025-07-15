export default function useAuth() {
  const token = localStorage.getItem("token");

  return { isLoggedIn: token ? true : false };
}
