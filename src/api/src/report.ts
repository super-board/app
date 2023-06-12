import {axiosAuthenticated} from "./config";

export async function report({id, type}: {id: number; type: "REVIEW" | "COMMENT"}) {
  return axiosAuthenticated.post("reports", {postId: id, type});
}
