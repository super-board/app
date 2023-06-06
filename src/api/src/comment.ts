import {CommentDetails, Paginated} from "@/types";

import {comments} from "./dummies/commentList";

export async function fetchComments(): Promise<Paginated<CommentDetails>> {
  return new Promise(resolve => resolve(comments));
}
