import { Helmet } from "react-helmet-async";
import { ListCard, StateContext } from "@/shared";
import { useContext, useEffect } from "react";
const Alarm = () => {
  const { setHeaderTitle } = useContext(StateContext);

  useEffect(() => {
    setHeaderTitle("알림");
    return () => {
      setHeaderTitle("");
    };
  }, []);
  return (
    <div className="flex flex-col flex-1">
      <Helmet>
        <title>파인디어 알람 페이지</title>
        <meta name="description" content="파인디어 알람 확인 페이지" />
        <meta
          name="keywords"
          content="Findear, Alarm, 알람, 알림, Alarm, Notice"
        />
      </Helmet>
      <ListCard>알림 리스트 목록</ListCard>
    </div>
  );
};

export default Alarm;
