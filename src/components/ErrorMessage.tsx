interface IProps {
  msg: string;        
}

const ErrorMessage = ({msg}: IProps) => {
    return msg && <span className="text-red-600 text-[13px] font-semibold">{msg}</span>
    
}

export default ErrorMessage