"use client";
import Select from "react-select";
import useCountries from "../hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

type CountrySelectProps = {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
};

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder='Anywhere'
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => {
          return (
            <div className='flex items-center gap-3'>
              <div>{option.flag}</div>
              <div>
                {option.label},
                <span className='text-neutral-500 ml-1'>{option.region}</span>
              </div>
            </div>
          );
        }}
        classNames={{
          control: () => "p-3 border-2 cursor-pointer",
          input: () => "text-lg cursor-pointer",
          option: () => "text-lg cursor-pointer",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
