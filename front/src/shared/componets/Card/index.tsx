import { Text } from "@/shared";

type CardProps = {
  image: string;
  title: string;
  locate: string;
  date: string;
  onClick?: () => void;
};

const Card = ({ image, title, locate, date, onClick }: CardProps) => {
  return (
    <div
      className="flex flex-col rounded-lg border-2 border-A706LightGrey2 dark:border-A706Grey2 w-full shadow-md "
      onClick={onClick}
    >
      <div className="w-full h-auto rounded-t-2xl border-b-2 border-border-A706LightGrey2 dark:border-A706Grey2 ">
        <img
          src={image}
          alt="이미지없음"
          className="w-full h-full object-contain object-center p-4"
        />
      </div>
      <div className="flex flex-col w-full h-[30%] p-1">
        <Text className="text-[1rem] font-bold"> {title} </Text>
        <Text className="text-[12px]">분실위치 : {locate}</Text>
        <Text className="text-[12px]">분실일자 : {date}</Text>
      </div>
    </div>
  );
};

export default Card;