import * as yup from 'yup';
import { ValidatePermissions } from '../interfaces';
import { TFunction } from '../i18n';

interface NumberValidationSchemaParams {
  id?: string;
  validatePermissions: ValidatePermissions;
  aggregateName: string;
  action?: string;
  field: string;
  t: TFunction;
  required?: boolean;
  integer?: boolean;
  min?: number;
  max?: number;
}

export const getNumberValidationSchema = (params: NumberValidationSchemaParams): yup.NumberSchema | undefined => {
  const {
    id,
    validatePermissions,
    t,
    aggregateName,
    action = 'updateAny',
    field,
    required = false,
    integer = false,
    min,
    max,
  } = params;
  if (!!id && !validatePermissions(aggregateName, action, field)) {
    return undefined;
  }

  let schema = yup.number();
  if (required) {
    schema = schema.required(
      t('common:requiredError', {
        field: t(field),
      }),
    );
  }
  if (integer) {
    schema = schema.integer(
      t('common:integerError', {
        field: t(field),
      }),
    );
  }
  if (min !== undefined) {
    schema = schema.min(
      min,
      t('common:minError', {
        field: t(field),
        min: min.toString(),
      }),
    );
  }
  if (max !== undefined) {
    schema = schema.min(
      max,
      t('common:maxError', {
        field: t(field),
        max: max.toString(),
      }),
    );
  }
  return schema;
};
