import { TextInput } from "@/components/FormControls";
import { TbSearch } from "react-icons/tb";

const SearchInput = () => {
  return (
    <TextInput
      radius="xl"
      placeholder="Search Reddit"
      icon={<TbSearch size={16} strokeWidth={1.5} />}
    />
  );
};

export default SearchInput;
