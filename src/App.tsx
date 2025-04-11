import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import ProductCard from "./components/ProductCard";
import { categories, colors, formInputsList, productList } from "./data";
import Model from "./components/UI/Model";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import { ProductNameTypes } from "./types";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import Select from "./components/UI/Select";

const App = () => {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  const inputRef = useRef<null | HTMLInputElement>(null)
  // ! State
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productEdit, setproductEdit] = useState<IProduct>(defaultProductObj);
  const [productEditIndex, setproductEditIndex] = useState<number>(0);
  const [selected, setSelected] = useState(categories[3]);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenConfirmModel, setIsOpenConfirmModel] = useState(false);

  // ! Handler
  const open = () => {
    setIsOpen(true);
    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
      colors: "",
    });
    setTempColors([]);
  };
  const close = () => {
    setIsOpen(false);
  };

  const openEdit = useCallback(() => {
    setIsOpenEdit(true);
    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
      colors: "",
    });
    setTempColors(productEdit.colors);
  }, []);
  const closeEdit = () => {
    setIsOpenEdit(false);
  };

  const openConfirmModel = useCallback(() => {
    setIsOpenConfirmModel(true);
  }, []);
 
  const closeConfirmModel = () => {
    setIsOpenConfirmModel(false);
  };

  // todo on Change Handler > name on IFormInput

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }, []);
  const onChangeHandlerToEdit = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setproductEdit({
      ...productEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // todo on Cancel Handler
  const oncancel = () => {
    close();
    setProduct(defaultProductObj);
    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
      colors: "",
    });
  };

  // todo on submit Handler
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, description, imageURL, price } = product;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
      colors: tempColors,
    });

    const hasErrorMsg = Object.values(errors).some((value) => value !== "");

    if (hasErrorMsg) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [
      { ...product, id: uuid(), category: selected, colors: tempColors },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColors([]);
    close();
  };

  // todo on submit Edit Handler
  const submitEditHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, description, imageURL, price } = productEdit;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
      colors: tempColors,
    });

    const hasErrorMsg = Object.values(errors).some((value) => value !== "");

    if (hasErrorMsg) {
      setErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productEditIndex] = {
      ...productEdit,
      colors: tempColors,
    };
    setProducts(updatedProducts);

    setproductEdit(defaultProductObj);
    setTempColors([]);
    closeEdit();
  };

  // todo remove handler
  const removeProductHandler = () => {
    console.log(productEdit.id);
    const filtered = products.filter(
      (product) => product.id !== productEdit.id
    );
    setProducts(filtered);
    closeConfirmModel();
    toast("product has been deleted!", {
      icon: "✔",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  // ! Render
  // todo render products
  const renderProduct = products.map((product, idx) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        setproductEdit={setproductEdit}
        openEdit={openEdit}
        idx={idx}
        setproductEditIndex={setproductEditIndex}
        openConfirmModel={openConfirmModel}
      />
    );
  });
  // todo render form inputs
  const renderForminputList = formInputsList.map((input) => {
    return (
      <div key={input.id} className="flex flex-col ">
        <label
          className="font-medium text-gray-700 text-sm mb-[1px]"
          htmlFor={input.id}
        >
          {input.label}
        </label>
        <Input
          ref={inputRef}
          type={input.type}
          id={input.id}
          name={input.name}
          placeholder={`Enter ${input.name.toLocaleLowerCase()}`}
          value={product[input.name]}
          onChange={onChangeHandler}
        />
        <ErrorMessage msg={errors[input.name]} />
      </div>
    );
  });
  // todo render colors
  const renderProductsColor = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  const renderProductEditWithError = (
    id: string,
    label: string,
    name: ProductNameTypes
  ) => {
    return (
      <div className="flex flex-col ">
        <label
          className="font-medium text-gray-700 text-sm mb-[1px]"
          htmlFor={id}
        >
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          placeholder={`Enter ${name} `}
          value={productEdit[name]}
          onChange={onChangeHandlerToEdit}
        />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  return (
    <main className="container mx-auto">
      <Button className={"bg-indigo-700"} width="w-fit" onClick={open}>
        Add product
      </Button>
      <div className="m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {renderProduct}
      </div>
      {/* Start Add Product Model */}
      <Model isOpen={isOpen} onClose={() => close()} title="Add A New Product ">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderForminputList}
          <Select selected={selected} setSelected={setSelected} />
          <div className="flex items-center space-x-1 flex-wrap">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 text-[13px] rounded-md text-white mb-1"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <ErrorMessage msg={errors.colors} />
          <div className="flex items-center space-x-1 flex-wrap">
            {renderProductsColor}
          </div>
          <div className="flex items-center space-x-3">
            <Button
              className={"bg-indigo-700 hover:bg-indigo-500 duration-200"}
            >
              Submit
            </Button>
            <Button
              className={"bg-gray-500 hover:bg-gray-300 duration-200"}
              onClick={oncancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Model>
      {/* Start Edit Product Model */}
      <Model
        isOpen={isOpenEdit}
        onClose={() => closeEdit()}
        title="Edit this Product "
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWithError("title", "product title", "title")}
          {renderProductEditWithError(
            "description",
            "product description",
            "description"
          )}
          {renderProductEditWithError(
            "imageURL",
            "product imageURL",
            "imageURL"
          )}
          {renderProductEditWithError("price", "product price", "price")}
          <div className="flex items-center space-x-1 flex-wrap">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 text-[13px] rounded-md text-white mb-1"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <ErrorMessage msg={errors.colors} />
          <div className="flex items-center space-x-1 flex-wrap">
            {renderProductsColor}
          </div>
          <div className="flex items-center space-x-3">
            <Button
              className={"bg-indigo-700 hover:bg-indigo-500 duration-200"}
            >
              Submit
            </Button>
            <Button
              className={"bg-gray-500 hover:bg-gray-300 duration-200"}
              onClick={closeEdit}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Model>
      {/* Start Remove Product Model */}
      <Model
        isOpen={isOpenConfirmModel}
        onClose={closeConfirmModel}
        title="Remove this Product "
      >
        <p className="font-semibold text-[16px] text-[#aaacae] my-[10px]">
          this product wilt remove it permanently from your inventory. Any
          associated data, sales history, and other related information will
          also be deleted. Please make sure this is the intended action .
        </p>
        <div className="flex flex-items space-x-3">
          <Button
            className={"bg-indigo-700 hover:bg-indigo-500 duration-200"}
            onClick={removeProductHandler}
          >
            Yes, Remove
          </Button>
          <Button
            className={"bg-gray-500 hover:bg-gray-300 duration-200"}
            onClick={closeConfirmModel}
          >
            Cancel
          </Button>
        </div>
      </Model>

      <Toaster />
    </main>
  );
};

export default App;
