import React from "react";
import { EuiCheckbox, useGeneratedHtmlId } from "@elastic/eui";

import { getUuidString } from "../utils/functions";

export default function Options({ optionsList }: Readonly<OptionsViewProps>) {
  return (
    <div className='flex'>
      {optionsList.map((option) => (
        <Option
          key={getUuidString()}
          name={option.name}
          action={option.onClick}
        />
      ))}
    </div>
  );
}

function Option({ name, action }: Readonly<OptionViewProps>) {
  const [checked, setChecked] = React.useState(false);

  const basicCheckboxId = useGeneratedHtmlId({ prefix: "basicCheckbox" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
    action();
  }

  return (
    <EuiCheckbox
      id={basicCheckboxId}
      label={name}
      checked={checked}
      onChange={(e) => handleChange(e)}
    />
  );
}

interface OptionObject {
  name: string;
  onClick: () => void;
}

interface OptionsViewProps {
  optionsList: OptionObject[];
}

interface OptionViewProps {
  name: string;
  action: () => void;
}
