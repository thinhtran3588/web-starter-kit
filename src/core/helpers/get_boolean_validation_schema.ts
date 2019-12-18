import * as yup from 'yup';
import { ValidatePermissions } from '../interfaces';
import { TFunction } from '../i18n';

interface BooleanValidationSchemaParams {
  id?: string;
  validatePermissions: ValidatePermissions;
  aggregateName: string;
  action?: string;
  field: string;
  t: TFunction;
  required?: boolean;
}

export const getBooleanValidationSchema = (params: BooleanValidationSchemaParams): yup.BooleanSchema | undefined => {
  const { id, validatePermissions, t, aggregateName, action = 'updateAny', field, required = false } = params;
  if (!!id && !validatePermissions(aggregateName, action, field)) {
    return undefined;
  }

  let schema = yup.boolean();
  if (required) {
    schema = schema.required(
      t('common:requiredError', {
        field: t(field),
      }),
    );
  }
  return schema;
};
