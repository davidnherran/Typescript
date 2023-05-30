import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const user = cookies.get("user");