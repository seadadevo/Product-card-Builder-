
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/20/solid';
import { categories } from '../../data';
import { ICategory } from '../../interfaces';

interface IProps {
  selected: {name: string, imageURL: string};
  setSelected: (category: ICategory) => void;
}
const Select = ({selected, setSelected}: IProps) => {
    

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Listbox.Label className="block text-sm font-medium text-gray-900">Category</Listbox.Label>
      <div className="relative">
        <Listbox.Button className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <img alt="" src={selected.imageURL} className="size-5 shrink-0 rounded-full" />
            <span className="block truncate">{selected.name}</span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </Listbox.Button>

        <Listbox.Options
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden transition ease-in-out duration-300"
        >
          {categories.map((category) => (
            <Listbox.Option
              key={category.id}
              value={category}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden transition ease-in-out duration-300"
            >
              <div className="flex items-center">
                <img alt="" src={category.imageURL} className="size-5 shrink-0 rounded-full" />
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{category.name}</span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default Select;