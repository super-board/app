import {axiosPublic} from "@/api/src/config";
import {TagGroup} from "@/types";

export async function fetchTags() {
  const data = await axiosPublic.get<unknown, {typeTagMaps: TagGroup[]}>("tags");
  return data.typeTagMaps;
}
