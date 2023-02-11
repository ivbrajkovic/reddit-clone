import { Input } from "@/components/Input";
import { TbSearch } from "react-icons/tb";

const SearchInput = () => {
  return (
    <Input
      maw={{ base: "none", md: 960 }}
      radius="xl"
      placeholder="Search Reddit"
      icon={<TbSearch size={16} strokeWidth={1.5} />}
    />
  );
};

export default SearchInput;
