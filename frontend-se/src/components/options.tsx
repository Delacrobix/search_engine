import React from "react";
import { Checkbox } from "antd";

import { getUuidString } from "../utils/functions";

export default function Options({ optionsList }: Readonly<OptionsViewProps>) {
  return (
    <div className='flex'>
      {optionsList.map((option) => (
        <Option
          isChecked={option.checked}
          key={getUuidString()}
          name={option.name}
          action={option.onClick}
        />
      ))}
    </div>
  );
}

import { CheckboxChangeEvent } from "antd/lib/checkbox";

function Option({ name, action, isChecked }: Readonly<OptionViewProps>) {
  function onChange() {
    action();
  }

  return (
    <Checkbox checked={isChecked} onChange={onChange}>
      {name}
    </Checkbox>
  );
}

interface OptionObject {
  name: string;
  checked: boolean;
  onClick: () => void;
}

interface OptionsViewProps {
  optionsList: OptionObject[];
}

interface OptionViewProps {
  name: string;
  isChecked: boolean;
  action: () => void;
}
