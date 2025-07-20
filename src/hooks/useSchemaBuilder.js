import { useState, useCallback } from 'react';
import { FIELD_TYPES, INITIAL_FIELDS } from '../utils/constants';
import { createNewField } from '../utils/fieldHelpers';

export function useSchemaBuilder() {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [activeTab, setActiveTab] = useState('builder');

  const updateFieldsRecursively = useCallback((fieldList, targetId, updater) => {
    return fieldList.map(field => {
      if (field.id === targetId) {
        return updater(field);
      }
      if (field.children && field.children.length > 0) {
        return {
          ...field,
          children: updateFieldsRecursively(field.children, targetId, updater)
        };
      }
      return field;
    });
  }, []);

  const findAndDeleteField = useCallback((fieldList, targetId) => {
    return fieldList.filter(field => {
      if (field.id === targetId) {
        return false;
      }
      if (field.children && field.children.length > 0) {
        field.children = findAndDeleteField(field.children, targetId);
      }
      return true;
    });
  }, []);

  const addRootField = useCallback(() => {
    const newField = createNewField();
    setFields(prevFields => [...prevFields, newField]);
  }, []);

  const addNestedField = useCallback((parentId) => {
    const newField = createNewField();
    
    setFields(prevFields => 
      updateFieldsRecursively(prevFields, parentId, (field) => ({
        ...field,
        children: [...field.children, newField],
        expanded: true
      }))
    );
  }, [updateFieldsRecursively]);

  const deleteField = useCallback((fieldId) => {
    setFields(prevFields => findAndDeleteField(prevFields, fieldId));
  }, [findAndDeleteField]);

  const updateFieldName = useCallback((fieldId, newName) => {
    setFields(prevFields =>
      updateFieldsRecursively(prevFields, fieldId, (field) => ({
        ...field,
        name: newName
      }))
    );
  }, [updateFieldsRecursively]);

  const updateFieldType = useCallback((fieldId, newType) => {
    setFields(prevFields =>
      updateFieldsRecursively(prevFields, fieldId, (field) => ({
        ...field,
        type: newType,
        children: newType === FIELD_TYPES.NESTED ? field.children : [],
        expanded: newType === FIELD_TYPES.NESTED ? true : false
      }))
    );
  }, [updateFieldsRecursively]);

  const updateFieldRequired = useCallback((fieldId, isRequired) => {
    setFields(prevFields =>
      updateFieldsRecursively(prevFields, fieldId, (field) => ({
        ...field,
        required: isRequired
      }))
    );
  }, [updateFieldsRecursively]);

  const toggleExpanded = useCallback((fieldId) => {
    setFields(prevFields =>
      updateFieldsRecursively(prevFields, fieldId, (field) => ({
        ...field,
        expanded: !field.expanded
      }))
    );
  }, [updateFieldsRecursively]);



  const generateJsonSchema = useCallback((fieldList) => {
  const schema = {};

  fieldList.forEach(field => {
    if (field.name.trim() === '') return;

    if (field.type === FIELD_TYPES.NESTED && field.children.length > 0) {
      schema[field.name] = generateJsonSchema(field.children);
    } else {
      let type;
      switch (field.type) {
        case FIELD_TYPES.STRING:
          type = 'STRING'; // uppercase
          break;
        case FIELD_TYPES.NUMBER:
          type = 'number';
          break;
        case FIELD_TYPES.FLOAT:
          type = 'float';
          break;
        case FIELD_TYPES.BOOLEAN:
          type = 'boolean';
          break;
        case FIELD_TYPES.NAN:
          type = 'nan';
          break;
        default:
          type = 'string';
      }

      schema[field.name] = type;
    }
  });

  return schema;
}, []);


  return {
    fields,
    activeTab,
    setActiveTab,
    addRootField,
    addNestedField,
    deleteField,
    updateFieldName,
    updateFieldType,
    updateFieldRequired,
    toggleExpanded,
    generateJsonSchema
  };
}