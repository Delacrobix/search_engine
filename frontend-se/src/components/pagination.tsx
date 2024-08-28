import {
  Paging,
  ResultsPerPage as ResultsPerPageSUI,
} from "@elastic/react-search-ui";
import {
  PagingViewProps,
  ResultsPerPageViewProps,
} from "@elastic/react-search-ui-views";
import { Pagination as PaginationAnt, Select } from "antd";

export default function Pagination() {
  return (
    <div className='flex justify-center items-center -mr-8 p-4'>
      <Paging view={PaginationView} />
      <ResultsPerPage />
    </div>
  );
}

function ResultsPerPage() {
  const customOptions = [20, 40, 60, 80, 100];

  return (
    <ResultsPerPageSUI options={customOptions} view={ResultsPerPageView} />
  );
}

function PaginationView({
  current,
  resultsPerPage,
  onChange,
  totalPages,
}: Readonly<PagingViewProps>) {
  if (!resultsPerPage || !current || !totalPages) return null;

  return (
    <PaginationAnt
      defaultCurrent={current}
      current={current}
      total={totalPages}
      onChange={(page) => {
        onChange(page);
      }}
      showSizeChanger={false}
      showQuickJumper={false}
      responsive={true}
    />
  );
}

function ResultsPerPageView({
  options,
  onChange,
  className,
}: ResultsPerPageViewProps) {
  if (!options || !onChange) return null;

  return (
    <Select className={className} defaultValue={options[0]} onChange={onChange}>
      {options.map((option) => (
        <Select.Option key={option} value={option}>
          {option}
        </Select.Option>
      ))}
    </Select>
  );
}
