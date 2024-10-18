import React, { useState } from 'react'

const AddSchema = ({ selectedOptions, handleSelectedOptions, selectOptions, addSchema }) => {
  const [currentValue, setCurrentValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    if (!value) return;
    
    const selectedOption = selectOptions.find((option) => option.value === value);
    if (selectedOption && !selectedOptions.some((option) => option.value === value)) {
      handleSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        { value: selectedOption.value, label: selectedOption.label, traits: selectedOption.traits }
      ]);
      setCurrentValue(selectedOption); // Update the current value
    }
  };
    // show remaining options
    const availableOptions = selectOptions.filter(
      (option) => !selectedOptions.some((selected) => selected.value === option.value)
    );

    const handleAddSchema = () => {
      if (selectedOptions.length > 0) {
        addSchema(selectedOptions);
        setCurrentValue(''); // Reset current value
      }
    };
  
  return (
    <>
    <div className='schema'>
      <div className={`${currentValue.traits === "user" ? 'user-traits' : currentValue.traits === "group" ? 'group-traits': 'normal-traits'}`} />
      <select
        id="select"
        onChange={(e) => handleChange(e)}
        value={currentValue.value}
      >
        <option value={''}>{`${currentValue ? currentValue.label : 'Add schema to the segment'}`}</option>
        {availableOptions.map((option) => (
          <>
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          </>
        ))}
      </select>
      <button
        className="remove-btn"
      >
        -
      </button>
    </div>
      <div>
        <button className="add-schema-link" onClick={handleAddSchema}>+ Add new schema</button>
      </div>
    </>
  )
}

export default AddSchema