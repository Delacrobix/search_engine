import { Facet } from "@elastic/react-search-ui";
import { FacetViewProps } from "@elastic/react-search-ui-views";

import { getUuidString } from "../utils/functions";

interface FacetsProps {
  field: string;
  label: string;
  show?: number;
}

export default function Facets({ field, label, show }: Readonly<FacetsProps>) {
  return <Facet field={field} show={show} label={label} view={FacetsView} />;
}

function FacetsView({
  values,
  onChange,
  onSearch,
  showMore,
  label,
  onMoreClick,
  onRemove,
  onSelect,
  options,
}: Readonly<FacetViewProps>) {
  console.log("labels: ", label);

  function handleSelection(value: string) {
    const isSelected = options.find(
      (option) => option.value === value
    )?.selected;
    if (isSelected) {
      onRemove(value);
    } else {
      onSelect(value);
    }
  }

  function getLabelForValue(value: string) {
    if (value === "true") return "Have preview";
    if (value === "false") return "No preview";
    return value;
  }

  return (
    <div className='mb-6'>
      <h3 className='text-lg text-nowrap font-semibold pb-1'>{label}</h3>
      <ul className=' text-nowrap'>
        {options.map((option) => (
          <li key={getUuidString()}>
            <input
              className='mr-2 cursor-pointer'
              type='checkbox'
              id={getUuidString()}
              checked={option.selected}
              onChange={() => handleSelection(option.value as string)}
            />
            <label htmlFor={option.value as string}>
              {getLabelForValue(option.value as string)} ({option.count})
            </label>
          </li>
        ))}
      </ul>
      {showMore && (
        <button
          className='text-blue-500 cursor-pointer'
          onClick={onMoreClick}
          disabled={!showMore}>
          Show more
        </button>
      )}
    </div>
  );
}
