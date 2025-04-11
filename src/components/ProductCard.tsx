import { memo } from "react";
import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./UI/Button";

interface IProps {
  product: IProduct;
  setproductEdit: (product: IProduct) => void;
  openEdit: () => void;
  idx: number;
  setproductEditIndex: (value: number) => void;
  openConfirmModel: (value: boolean) => void;
}

const ProductCard = ({ product, setproductEdit, openEdit ,idx, setproductEditIndex, openConfirmModel}: IProps) => {
  
  // ! State

  // ! Handler
  const onEdit = () => {
    setproductEdit(product)
    openEdit()
    setproductEditIndex(idx)
  }
  const onRemove = () => {
    setproductEdit(product)
    openConfirmModel(true)
  }
  // ! render
  const { title, description, imageURL, price, colors, category } = product;
  
  const renderProductsColor = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
    />
  ));
  
  return (
    <div className="max-w-sm md:max-w-lg mx-auto  border rounded-md p-2 flex flex-col ">
      <Image
        className="w-full rounded-md"
        textAlt={title}
        imagrUrl={imageURL}
      />
      <h3>{title}</h3>
      <p>{txtSlicer(description)}</p>
      <div className="flex items-center space-x-1 flex-wrap">
            {renderProductsColor}
        </div>
    

      <div className="flex items-center justify-between">
        <span>${price}</span>
        <Image
          className={"w-10 h-10 rounded-full object-cover"}
          textAlt={category.name}
          imagrUrl={category.imageURL}
        />
      </div>

      <div className="flex items-center justify-between gap-1 my-2.5">
        <Button
          className={"bg-indigo-700"}
          width="w-full"
          onClick= {onEdit}
        >
          Edit
        </Button>
        <Button
          className={"bg-[red] "}
          width="w-full"
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};


export default memo(ProductCard);
