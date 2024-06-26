import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Swal from "sweetalert2";

import { ListType, getAcquisitions, getLosts } from "@/entities";
import {
  FindearStamp,
  StateContext,
  Text,
  cls,
  useMemberStore,
} from "@/shared";

const MyBoard = () => {
  const { state } = useLocation();
  const { member } = useMemberStore();
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState<ListType[]>([]);
  const { setHeaderTitle } = useContext(StateContext);

  useEffect(() => {
    if (state) {
      dataFetching(state.boardType);
      setHeaderTitle("나의 " + state.boardType);
    }
    return () => {
      setHeaderTitle("");
    };
  }, [state]);

  const dataFetching = (board: string) => {
    if (board === "습득물") {
      getAcquisitions(
        { memberId: member.memberId, pageNo: 1, sortBy: "date" },
        ({ data }) => {
          setBoardList(data.result?.boardList);
        },
        (error) => {
          console.error(error);
        }
      );
      return;
    }

    if (board === "분실물") {
      getLosts(
        { memberId: member.memberId, pageNo: 1, sortBy: "date" },
        ({ data }) => {
          setBoardList(data.result?.boardList);
        },
        (error) => {
          console.error(error);
        }
      );

      return;
    }
  };

  const calculateDate = (date: string) => {
    const today = dayjs();
    const registerDate = dayjs(date);
    const AbrogateDate = registerDate.add(180, "day");
    const remainingDays = AbrogateDate.diff(today, "day");

    return remainingDays;
  };

  return (
    <div className="flex flex-col flex-1 bg-gradient-to-b from-A706DarkGrey2 to-A706DarkGrey1">
      {!boardList && (
        <Text className="text-white font-bold text-[2rem] self-center">
          작성한 글이 없습니다
        </Text>
      )}
      <div className="flex flex-col p-2 gap-2">
        {boardList &&
          boardList.map((list) => (
            // ListCard
            <div
              key={list.boardId}
              className={cls(
                "flex h-[100px] bg-A706LightGrey dark:bg-A706DarkGrey1 gap-2 rounded-md shadow-lg border border-A706LightGrey2",
                list.status === "DONE" ? "opacity-60" : ""
              )}
              onClick={() => {
                navigate(
                  `${
                    state.boardType === "분실물"
                      ? "/lostItemDetail/"
                      : "/foundItemDetail/"
                  }${list.boardId}`
                );
              }}
            >
              <div className="flex size-[100px] bg-A706Blue2">
                <img
                  src={list.thumbnailUrl}
                  alt={list.productName}
                  className="object-fill w-full h-full rounded-md"
                />
              </div>
              <div className="flex flex-col p-1 w-full">
                <div className="flex justify-between p-1">
                  {list.status === "DONE" ? (
                    <FindearStamp className="right-16" />
                  ) : (
                    ""
                  )}

                  <Text className="bg-A706Blue3 rounded-lg px-1 self-start">
                    {list.isLost ? "분실물" : "습득물"}
                  </Text>
                  {state.boardType === "습득물" ? (
                    <>
                      <Text className="flex font-bold">
                        <>
                          {list.status === "ONGOING"
                            ? "의무 보관 기간 " +
                              calculateDate(
                                list.acquiredAt ?? String(new Date())
                              ) +
                              "일"
                            : ""}
                          <img
                            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Information.png"
                            alt="Information"
                            width="25"
                            height="25"
                            className="z-[1]"
                            onClick={(e) => {
                              e.stopPropagation();
                              Swal.fire({
                                title: "의무 보관 기간",
                                text: "상법 제152조에 따르면 공중접객업자는 업장내 유실물 보관 책임이 있으면 손망실시 손해를 배상할 책임이 있습니다, 해당기한은 유실물 법에 따라 최대 180일의 책임이 있습니다.",
                                icon: "info",
                                confirmButtonText: "확인",
                              });
                            }}
                          />
                        </>
                      </Text>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="flex justify-between">
                  <Text className="text-[1rem] font-bold">
                    {list.productName}
                  </Text>
                  <Text>{list.category ?? "분류중"} </Text>
                </div>
                <div className="flex justify-between">
                  <Text>
                    {state.boardType === "습득물"
                      ? list.agency?.name ?? "미설정"
                      : list.suspiciousPlace ?? "미분류"}
                  </Text>
                  <Text>
                    {state.boardType === "습득물"
                      ? list.acquiredAt ?? "미분류"
                      : list.lostAt ?? "미분류"}
                  </Text>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyBoard;
