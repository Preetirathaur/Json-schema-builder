import React from 'react';
import FieldRow from './FieldRow';
import './styles.css';

function FieldEditor({ 
  fields, 
  onDeleteField, 
  onUpdateFieldName, 
  onUpdateFieldType, 
  onUpdateFieldRequired,
  onAddNestedField,
  onToggleExpanded 
}) {
  const renderFields = (fieldList, depth = 0) => {
    return fieldList.map(field => (
      <FieldRow
        key={field.id}
        field={field}
        depth={depth}
        onDelete={() => onDeleteField(field.id)}
        onNameChange={(name) => onUpdateFieldName(field.id, name)}
        onTypeChange={(type) => onUpdateFieldType(field.id, type)}
        onRequiredChange={(required) => onUpdateFieldRequired(field.id, required)}
        onAddNested={() => onAddNestedField(field.id)}
        onToggleExpanded={() => onToggleExpanded(field.id)}
        renderChildren={() => renderFields(field.children || [], depth + 1)}
      />
    ));
  };

  return (
    <div className="field-editor">
      {renderFields(fields)}
    </div>
  );
}

export default FieldEditor;