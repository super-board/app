import {PaginatedComments} from "@/store/src/api/src/types";

export const commentQueries = {
  getComments: {
    queryFn(arg: {boardGameId: number; reviewId: number; page: number}) {
      return {
        data: {
          hasNext: true,
          comments: [
            {
              id: 1,
              createdAt: "2023-03-01T00:41:33.161Z",
              content: "이 문장은 예시 문장입니다. 대신 짧습니다.",
              author: {
                id: 1,
                nickname: "그게나야",
                level: "SPADE",
                profileCharacter: "PROFILE_1",
              },
            },
            {
              id: 2,
              createdAt: "2023-02-14T12:41:33.161Z",
              content:
                "이 문장은 예시 문장입니다. 최대 몇 문장까지 노출 시킬 것인지/ 말 줄임표가 어떻게 붙는지 등은 논의가 필요합니다. 예를들어, 3줄 이상의 문장은 짧게 보기를 지원합니다. 이 문장은 예시 문장입니다. 최대 몇 문장까지 노출 시킬 것인지/ 말 줄임표가 어떻게 붙는지 등은 논의가 필요합니다. 예를들어, 3줄 이상의 문장은 짧게 보기를 지원합니다.",
              author: {
                id: 1,
                nickname: "한글닉네임",
                level: "DIAMOND",
                profileCharacter: "PROFILE_3",
              },
            },
            {
              id: 3,
              createdAt: "2022-06-27T02:37:33.161Z",
              content:
                "이 문장은 예시 문장입니다. 최대 몇 문장까지 노출 시킬 것인지/ 말 줄임표가 어떻게 붙는지 등은 논의가 필요합니다. 예를들어, 3줄 이상의 문장은 짧게 보기를 지원합니다. 이 문장은 예시 문장입니다. 최대 몇 문장까지 노출 시킬 것인지/ 말 줄임표가 어떻게 붙는지 등은 논의가 필요합니다. 예를들어, 3줄 이상의 문장은 짧게 보기를 지원합니다.",
              author: {
                id: 3,
                nickname: "다른사람",
                level: "HEART",
                profileCharacter: "PROFILE_7",
              },
            },
          ],
        } as PaginatedComments,
      };
    },
  },
};
