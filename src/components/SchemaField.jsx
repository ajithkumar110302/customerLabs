import React from 'react';

const SchemaField = ({ field, index, availableOptions, onFieldChange, onRemove }) => {
  return (
    <div className="schema">
      <div className={`${field.traits === 'user' ? 'user-traits' : field.traits === 'group' ? 'group-traits': 'normal-traits'}`}></div>
      <select
        value={field.value}
        onChange={(e) => onFieldChange(index, e.target.value)}
      >
        <option value="">Select a field</option>
        {availableOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        onClick={() => onRemove(index)}
        className="remove-btn"
      >
        -
      </button>
    </div>
  );
};

export default SchemaField;