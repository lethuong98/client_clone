import { TfiSearch } from "react-icons/tfi";

const BoxSearch = ({showBoxSearch}) => {
  return (
    <div className={`transition-all duration-500 w-max p-[15px] flex items-center shadow-md bg-white h-[70px] absolute z-[-1] right-1/2 translate-x-1/2 sm:right-[120px] sm:translate-x-0 ${showBoxSearch ? ' top-[73px]': 'top-[-8px]'}`}>
      <input
        type="text"
        className="h-full outline-none border border-main fo px-[15px]"
      />
      <button className="h-full w-[60px] bg-main hover:bg-black px-[21px] transition-all duration-500">
        <TfiSearch className="text-[18px] cursor-pointer text-white" />
      </button>
    </div>
  );
};

export default BoxSearch;
