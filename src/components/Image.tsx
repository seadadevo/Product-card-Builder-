interface IProps {
    imagrUrl: string;
    textAlt: string;
    className: string;
}

const Image = ( {imagrUrl, textAlt, className}: IProps) => {
    return(
        <img className= {className} alt= {textAlt}  src={imagrUrl}/>           
    )
}   

export default Image