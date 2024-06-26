type TextProps = {
  children: string | JSX.Element | string[] | number;
  className?: string;
  onClick?: () => void;
};

const Text = ({ children, className, onClick }: TextProps) => {
  return (
    <p className={className ? className : ""} onClick={onClick}>
      {children}
    </p>
  );
};

export default Text;
