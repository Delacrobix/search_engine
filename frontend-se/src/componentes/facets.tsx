import React from "react";
import { Facet } from "@elastic/react-search-ui";
import { FacetViewProps } from "@elastic/react-search-ui-views";

import { getUuidString } from "../utils/functions";

interface FacetsProps {
  field: string;
  label: string;
}

export default function Facets({ field, label }: Readonly<FacetsProps>) {
  return <Facet field={field} label={label} view={FacetsView} />;
}

function FacetsView({
  // values,
  // onChange,
  // onSearch,
  // showMore,
  show,
  label,
  onMoreClick,
  onRemove,
  onSelect,
  options,
}: Readonly<FacetViewProps>) {
  console.log("show", show);

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

  return (
    <div className='mb-6'>
      <h3 className='text-lg text-nowrap font-semibold pb-1'>{label}</h3>
      <ul className=' text-nowrap'>
        {options.map((option) => (
          <li key={getUuidString()} className=''>
            <input
              className='mr-2 cursor-pointer'
              type='checkbox'
              id={getUuidString()}
              checked={option.selected}
              onChange={() => handleSelection(option.value)}
            />
            <label htmlFor={option.value} className=''>
              {option.value} ({option.count})
            </label>
          </li>
        ))}
      </ul>
      {options.length > show && (
        <button onClick={onMoreClick} className=''>
          More
        </button>
      )}
    </div>
  );
}
