import React from 'react';

import { ChevronRight, ChevronDown, X, Plus } from 'lucide-react';
import { FIELD_TYPES } from '../../utils/constants';
import { canExpand, hasChildren } from '../../utils/fieldHelpers';

function FieldRow({ 
  field, 
  depth, 
  onDelete, 
  onNameChange, 
  onTypeChange, 
  onRequiredChange,
  onAddNested,
  onToggleExpanded,
  renderChildren 
}) {
  const indentLevel = depth * 20;
  const showExpander = canExpand(field);
  const showChildren = field.expanded && hasChildren(field);

  return (
    <div className="field-row-container" style={{ marginLeft: `${indentLevel}px` }}>
      <div className="field-row">
        {showExpander && (
          <button
            className="expand-button"
            onClick={onToggleExpanded}
            aria-label={field.expanded ? 'Collapse' : 'Expand'}
          >
            {field.expanded ? 
              <ChevronDown size={16} /> : 
              <ChevronRight size={16} />
            }
          </button>
        )}
        
        <div className="field-inputs">
          <input
            type="text"
            value={field.name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Field name"
            className="field-name-input"
          />
          
          <select
            value={field.type}
            onChange={(e) => onTypeChange(e.target.value)}
            className="field-type-select"
          >
            <option value={FIELD_TYPES.STRING}>string</option>
            <option value={FIELD_TYPES.NUMBER}>number</option>
            <option value={FIELD_TYPES.NESTED}>nested</option>
           <option value={FIELD_TYPES.BOOLEAN}>Boolean</option> 
            <option value={FIELD_TYPES.FLOAT}>Float</option> 
            <option value={FIELD_TYPES.NAN}>Nan</option> 
        
          </select>
          
          <label className="required-checkbox">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => onRequiredChange(e.target.checked)}
            />
            <span className="checkbox-label">Required</span>
          </label>
        </div>
        
        <button
          className="delete-button"
          onClick={onDelete}
          aria-label="Delete field"
        >
          <X size={16} />
        </button>
      </div>

      {showChildren && (
        <div className="nested-fields">
          {renderChildren()}
        </div>
      )}

      {field.type === FIELD_TYPES.NESTED && field.expanded && (
        <div className="add-nested-button-container" style={{ marginLeft: '20px' }}>
          <button
            className="btn btn-primary add-nested-button"
            onClick={onAddNested}
          >
            <Plus size={16} />
            Add Item
          </button>
        </div>
      )}
    </div>
  );
}

export default FieldRow;