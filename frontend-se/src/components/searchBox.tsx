import { FormEvent } from "react";
import { SearchBox as ElasticSearchBox } from "@elastic/react-search-ui";
import { useOptionsContext } from "../context/optionsContext";

interface SearchBoxViewProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent<Element>) => void;
}

function SearchBoxView({
  value,
  onChange,
  onSubmit,
}: Readonly<SearchBoxViewProps>) {
  return (
    <form className='flex gap-2' onSubmit={onSubmit}>
      <input
        className='w-full p-2 border rounded-md'
        type='text'
        value={value}
        placeholder='Search album...'
        onChange={(e) => onChange(e.target.value)}
      />
      <input
        className='rounded-md px-2 cursor-pointer border border-black'
        type='submit'
        value='Search'
      />
    </form>
  );
}

export default function SearchBox() {
  const { searchAsYouType } = useOptionsContext();

  return (
    <ElasticSearchBox
      searchAsYouType={searchAsYouType}
      debounceLength={50}
      autocompleteMinimumCharacters={2}
      autocompleteSuggestions={true}
      view={SearchBoxView}
    />
  );
}
