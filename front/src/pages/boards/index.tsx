import {
  Card,
  CategoryList,
  CustomButton,
  StateContext,
  Text,
  cls,
  useIntersectionObserver,
} from "@/shared";
import { IoIosOptions } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState, useEffect, useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useMemberStore } from "@/shared";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { Agency, getAcquisitions, getLosts, Member } from "@/entities";
//
type ListType = {
  acquiredAt: string;
  agency: Agency;
  boardId: number;
  category?: string;
  isLost: boolean;
  productName: string;
  thumbnailUrl: string;
  writer: Member;
};

// type BoardListType = {
//   boardList: ListType[];
//   totalPageNum: number;
// };

type BoardCategoryProps = {
  boardType: "분실물" | "습득물";
};

type searchType = {
  pageNo: number;
  categoryId?: string;
  sDate?: string;
  eDate?: string;
  keyword?: string;
};

// type searchType = {
//   sidoId: number;
//   sigunguId: number;
//   dongId: number;
//   categoryId: number;
//   sDate: string;
//   eDate: string;
//   subCategoryId: number;
//   keyword: string;
//   pageNo: number;
// };

// type acquistionsType = {
//   boardId: number;
//   productName: string;
//   acquiredAt: string;
//   regionName: string;
//   thumbnailUrl: string;
// };

// type searchResultType = {
//   result: {
//     acquisitions: Array<acquistionsType[]>;
//     totalPageNum: number;
//   };
// };

const Boards = ({ boardType }: BoardCategoryProps) => {
  const { member, Authenticate } = useMemberStore();
  const [option, setOption] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [categoryId, setCategory] = useState("");
  // const [sDate, setSDate] = useState("");
  // const [eDate, setEDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [mobile, setMobile] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [boardList, setBoardList] = useState<ListType[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [serviceType, setServiceType] = useState("findear");

  const { setHeaderTitle } = useContext(StateContext);

  const navigate = useNavigate();
  const [observe, unobserve] = useIntersectionObserver(() => {
    setIsLoading(true);
    console.log("intersecting");

    setTimeout(() => {
      if (pageNo < total) {
        setPageNo((prev) => prev + 1);

        setIsLoading(false);
      }
    }, 3000);
  });

  const [total, setTotal] = useState(0);

  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageNo === 1) {
      observe(target.current as HTMLDivElement);
    }

    if (pageNo >= total) {
      unobserve(target.current as HTMLDivElement);
    }
  }, [pageNo, total]);

  useEffect(() => {
    setHeaderTitle(boardType);

    return () => setHeaderTitle("");
  }, [boardType]);

  useEffect(() => {
    if (isLoading) {
      unobserve(target.current as HTMLDivElement);
      return;
    }
    observe(target.current as HTMLDivElement);
  }, [isLoading]);

  // 데이터를 패칭해오는 로직
  useEffect(() => {
    const requestData: searchType = { pageNo };
    if (categoryId) {
      requestData.categoryId = categoryId;
    }
    // if (sDate) {
    //   requestData.sDate = sDate;
    // }
    // if (eDate) {
    //   requestData.eDate = eDate;
    // }
    if (keyword) {
      requestData.keyword = keyword;
    }

    if (boardType === "습득물" && serviceType === "findear") {
      getAcquisitions(
        requestData,
        ({ data }) => {
          console.log(data);

          setBoardList(data.result?.boardList);
          setTotal(data.result?.totalPageNum || 0);
        },
        (error) => console.log(error)
      );
      return;
    }

    if (boardType === "분실물" && serviceType === "findear") {
      getLosts(
        requestData,
        ({ data }) => {
          console.log(data);
          setBoardList(data.result?.boardList);
          setTotal(data.result?.totalPageNum || 0);
        },
        (error) => console.log(error)
      );
      return;
    }

    // LOST112 습득물 조회

    // Findear 분실물 조회

    // LOST112 분실물 조회
    // setTotal(100);
  }, [boardType]);

  const cartegoryVariants = {
    desktopInit: {
      opacity: 0,
      y: 0,
    },
    desktopEnd: {
      opacity: 1,
      y: 0,
    },
    mobileInit: {
      y: 800,
    },
    mobileEnd: {
      y: 0,
    },
  };

  const variants = {
    desktopInit: {
      opacity: 0,
      y: 0,
    },
    desktopEnd: {
      opacity: 1,
      y: 0,
    },
    mobileInit: {
      x: 500,
    },
    mobileEnd: {
      x: 0,
    },
  };

  const checkDevice = useCallback(() => {
    if (window.innerWidth > 1280) {
      setMobile(false);
      return;
    }

    setMobile(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      checkDevice();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(categoryId);
  }, [categoryId]);

  useEffect(() => {
    checkDevice();
  }, []);

  const requestAgency = () => {
    setOpenModal(true);
  };

  return (
    <div className="flex flex-col flex-1">
      <Helmet>
        <title>리스트 조회 페이지</title>
        <meta
          name="description"
          content="파인디어 분실, 습득 리스트 확인 페이지"
        />
        <meta
          name="keywords"
          content="Findear, 파인디어, 분실, 습득, Losts, Acquire, 리스트, list"
        />
      </Helmet>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>안내</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              습득물 등록 기능은 시설 관리자만 사용 가능합니다. 관리자 시라면
              시설 관리자 등록을 해주세요
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="warning" onClick={() => navigate("/agencyRegist")}>
            등록하기
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="flex flex-col  flex-1 mx-[10px] my-[10px]">
        <div className="flex justify-between items-center">
          <Text className="font-bold text-[1.2rem]">
            {boardType === "분실물"
              ? "찾고있는 물건들이에요"
              : "보관중인 물건들이에요"}
          </Text>
          <form className="flex gap-[10px]">
            <div>
              <Label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="company"
                  value="findear"
                  checked={serviceType === "findear"}
                  onChange={() => setServiceType("findear")}
                  placeholder="파인디어"
                />
                파인디어
              </Label>
            </div>
            <div className="flex gap-[5px] items-center">
              <Label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="company"
                  value="Lost112"
                  checked={serviceType === "Lost112"}
                  onChange={() => setServiceType("Lost112")}
                  placeholder="Lost112"
                />
                <Text>Lost112</Text>
              </Label>
            </div>
          </form>
          {/* className="w-[140px]"
            options={[{ value: "파인디어" }, { value: "Lost112" }]}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          ></SelectBox> */}
        </div>
        <div className="flex justify-around items-center my-[10px]">
          <div className="flex flex-wrap gap-[10px]">
            <CustomButton
              className="border border-A706DarkGrey1 p-2 rounded-lg text-[1rem] font-bold bg-A706LightGrey"
              onClick={() => setOpenCategory(true)}
            >
              카테고리
            </CustomButton>
            <AnimatePresence>
              {openCategory && (
                <motion.div
                  variants={cartegoryVariants}
                  initial={mobile ? "mobileInit" : "desktopInit"}
                  animate={mobile ? "mobileEnd" : "desktopEnd"}
                  exit={mobile ? "mobileInit" : "desktopInit"}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                  className="absolute inset-x-0 inset-y-0 w-full h-full rounded-lg bg-A706LightGrey z-[10]"
                >
                  <div className="flex items-center justify-between mx-[10px]">
                    <Text className="text-[1.5rem] font-bold p-[10px]">
                      카테고리 검색
                    </Text>
                    <div onClick={() => setOpenCategory(false)}>
                      <IoCloseSharp size="32" />
                    </div>
                  </div>
                  <CategoryList
                    setCategory={setCategory}
                    setModal={setOpenCategory}
                    className="grid grid-cols-4 grid-rows-4 gap-5 "
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* <SelectBox
              className="w-[140px]"
              options={[{ value: "data1" }, { value: "data2" }]}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            ></SelectBox> */}
            {/* <SelectBox
              className="w-[140px]"
              options={[{ value: "data1" }, { value: "data2" }]}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            ></SelectBox> */}
          </div>

          <div className="flex items-center justify-between z-[5] gap-2">
            <TextInput
              className="w-[180px]"
              placeholder="검색어를 입력하세요"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
            <CustomButton
              className="border border-A706LightGrey2 rounded-lg p-2"
              onClick={() => alert("키워드 검색")}
            >
              검색
            </CustomButton>

            <div
              onClick={() => {
                setOption((prev) => !prev);
              }}
            >
              <IoIosOptions size="24" />
            </div>
            <AnimatePresence>
              {option && (
                <motion.div
                  variants={variants}
                  initial={mobile ? "mobileInit" : "desktopInit"}
                  animate={mobile ? "mobileEnd" : "desktopEnd"}
                  exit={mobile ? "mobileInit" : "desktopInit"}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                  className="absolute max-xl:w-[60%] xl:w-[40%] xl:h-[600px] right-0  max-xl:top-0 h-full z-[1] bg-A706LightGrey dark:bg-A706DarkGrey1 rounded-xl border-2 border-A706Grey2"
                >
                  <div className="flex items-center justify-between mx-[10px]">
                    <Text className="text-[1.5rem] font-bold p-[10px]">
                      상세 검색
                    </Text>
                    <div onClick={() => setOption(false)}>
                      <IoCloseSharp size="32" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="grid max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-4 max-xl:grid-cols-6 max-2xl:grid-cols-7 grid-cols-8 justify-items-center gap-[10px]">
            {boardList?.map((item) => {
              return (
                <Card
                  key={item.boardId}
                  date={item.acquiredAt}
                  image={item.thumbnailUrl}
                  locate={item.agency.name}
                  title={item.productName}
                  type={boardType}
                  onClick={() => alert("클릭")}
                />
              );
            })}
          </div>
          <div ref={target} className="w-full" />
        </div>
      </div>
      <div className="sticky bottom-[110px]">
        <div className="flex flex-col items-end">
          <CustomButton
            className={cls(
              "text-2xl font-bold rounded-3xl shadow-md ",
              "bg-A706CheryBlue text-A706LightGrey px-3 py-2"
            )}
            onClick={() => {
              //TODO: 권한이 관리자라면 등록페이지로, 관리자가 아니라면 관리자 등록 페이지로 이동
              Authenticate
                ? boardType === "분실물"
                  ? navigate("/lostItemRegist")
                  : member?.role === "NORMAL"
                  ? requestAgency()
                  : navigate("/acquireRegist")
                : navigate("/signin");
            }}
          >
            + 글 쓰기
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Boards;