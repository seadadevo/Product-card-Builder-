import { forwardRef, Ref, InputHTMLAttributes, memo } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(({ ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
  return (
    <input
    ref ={ref}
      className="border-[1px] border-gray-300
            shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-md px-3 py-3 text-md"
      {...rest}
    />
  );
});

export default memo(Input);
