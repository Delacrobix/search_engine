import { FormEvent } from "react";
import { SearchBox as ElasticSearchBox } from "@elastic/react-search-ui";

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
        placeholder='Try to search...'
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
  return <ElasticSearchBox view={SearchBoxView} />;
}
