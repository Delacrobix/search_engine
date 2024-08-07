import React from "react";
import { Facet } from "@elastic/react-search-ui";
import { FacetViewProps } from "@elastic/react-search-ui-views";

interface FacetsProps {
  field: string;
  label: string;
  view?: React.ComponentType<FacetViewProps>;
}

export default function Facets({ field, label, view }: Readonly<FacetsProps>) {
  return (
    <div>
      <Facet field={field} label={label} view={view} />
    </div>
  );
}
