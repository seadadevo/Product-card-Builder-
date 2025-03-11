import { ButtonHTMLAttributes, ReactNode } from "react";

type typeWidht = "w-full" | "w-fit";
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: typeWidht;
}

const Button = ({ children, className, width, ...rest }: IProps) => {
  return (
    <button
      className={`${className} ${width} p-[10px] font-semibold text-[#fff] cursor-pointer rounded-md`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;