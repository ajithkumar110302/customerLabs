import React, { useState } from 'react';
import SchemaField from './SchemaField';
import AddSchema from './AddSchema';

const selectOptions = [
  { label: "First Name", value: "first_name", traits: "user" },
  { label: "Last Name", value: "last_name", traits: "user" },
  { label: "Gender", value: "gender", traits: "user" },
  { label: "Age", value: "age", traits: "user" },
  { label: "Account Name", value: "account_name", traits: "group" },
  { label: "City", value: "city", traits: "group" },
  { label: "State", value: "state", traits: "group" }
];

const SchemaBuilder = ({handleCancel}) => {
  const [schemaFields, setSchemaFields] = useState([]);
  const [segmentName, setSegmentName] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const addField = (selectedOptions) => {
    setSchemaFields(selectedOptions)
  };

  const removeField = (index) => {
    const updatedFields = schemaFields.filter((_, i) => i !== index);
    setSchemaFields(updatedFields);
    setSelectedOptions(updatedFields);
  };

  const handleFieldChange = (index, value) => {
    const updatedFields = [...schemaFields];
    const option = selectOptions.find(opt => opt.value === value);
    if (option) {
      updatedFields[index] = { value: option.value, label: option.label, traits: option.traits };
      setSchemaFields(updatedFields);
      setSelectedOptions(updatedFields);
    }
  };

  const getAvailableOptions = (currentIndex) => {
    return selectOptions.filter(option => 
      !schemaFields.some((field, index) => 
        index !== currentIndex && field.value === option.value
      )
    );
  };

  const handleSubmit = async () => {
    if (!segmentName) {
      alert('Please enter a segment name');
      return;
    }
    if (schemaFields.length === 0) {
      alert('Please add at least one schema field');
      return;
    }
    const newSchema = schemaFields.map(({ value, label }) => ({
      [value]: label
    }));
    
    const dataToSend = {
      segment_name: segmentName,
      schema: newSchema
    };

    try {
      const response = await fetch('/fdf047eb-2108-44f5-b302-93556e3c59a8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        alert('Segment saved successfully!');
        setSchemaFields([]);
        setSegmentName('');
        setSelectedOptions([]);
      } else {
        alert('Failed to save segment');
      }
    } catch (error) {
      console.error('Error saving segment:', error);
      alert(error);
    }
  };

  return (
    <div className='segment-table-container'>
      <div className="segment-table">
        <div className='segment-input'>
          <label htmlFor="segmentName">
            Enter the Name of the Segment
          </label>
          <input
            id="segmentName"
            type="text"
            className=".segment-input"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="Name of the segment"
          />
        </div>

        <p>
          To save your segment, you need to add the schemas to build the query
        </p>
        <div className='t-head-container'>
          <div className="t-head"><div className="user-traits"></div>User Traits</div>
          <div className="t-head"><div className="group-traits"></div> Group Traits</div>
        </div>
        {
          schemaFields.length > 0 &&
          <div className='blue-box'>
            {schemaFields?.map((field, index) => (
              <SchemaField
                key={index}
                field={field}
                index={index}
                availableOptions={getAvailableOptions(index)}
                onFieldChange={handleFieldChange}
                onRemove={removeField}
              />
            ))}
          </div>
        }
        <AddSchema selectedOptions={selectedOptions} handleSelectedOptions={setSelectedOptions} selectOptions={selectOptions} addSchema={addField} />
      </div>
        <div className="send-cancel-btn-container">
          <button
            onClick={handleSubmit}
            className="send-btn"
          >
            Save the segment
          </button>
          <button
            onClick={() => {
              setSchemaFields([]);
              setSegmentName('');
              handleCancel()
            }}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
    </div>
  );
};

export default SchemaBuilder;