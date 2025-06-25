import { jwtDecode } from "jwt-decode";

export default function useJwt() {
    const accessToken = sessionStorage.getItem("access_token")

    if (!accessToken)
        return null

    return jwtDecode(accessToken)
}