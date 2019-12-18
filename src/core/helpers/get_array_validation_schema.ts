import * as yup from 'yup';
import { ValidatePermissions } from '../interfaces';
import { TFunction } from '../i18n';

interface ArrayValidationSchemaParams {
  id?: string;
  validatePermissions: ValidatePermissions;
  aggregateName: string;
  action?: string;
  field: string;
  t: TFunction;
  required?: boolean;
}

export const getArrayValidationSchema = <T>(params: ArrayValidationSchemaParams): yup.ArraySchema<T> | undefined => {
  const { id, validatePermissions, t, aggregateName, action = 'updateAny', field, required = false } = params;
  if (!!id && !validatePermissions(aggregateName, action, field)) {
    return undefined;
  }
  let schema = yup.array<T>();
  if (required) {
    schema = schema.required(
      t('common:requiredError', {
        field: t(field),
      }),
    );
  }
  return schema;
};
