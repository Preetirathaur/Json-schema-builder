import { FIELD_TYPES } from './constants';

let idCounter = 8;

export function generateUniqueId() {
  return idCounter++;
}

export function createNewField(name = '', type = FIELD_TYPES.STRING) {
  return {
    id: generateUniqueId(),
    name,
    type,
    required: false,
    children: [],
    expanded: type === FIELD_TYPES.NESTED
  };
}

export function isNestedField(field) {
  return field.type === FIELD_TYPES.NESTED;
}

export function hasChildren(field) {
  return field.children && field.children.length > 0;
}

export function canExpand(field) {
  return isNestedField(field);
}