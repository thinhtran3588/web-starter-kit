import { FieldValueType, PickerDataItem } from '../interfaces';

export const formatWithLookup = (lookup: PickerDataItem<string>[]) => (value: FieldValueType) => {
  if (!value) {
    return '';
  }
  const loginType = lookup.find((m) => m.value === value);
  return loginType ? loginType.label : '';
};
