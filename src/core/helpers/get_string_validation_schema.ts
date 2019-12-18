import * as yup from 'yup';
import { config } from '@app/config';
import { ValidatePermissions } from '../interfaces';
import { TFunction } from '../i18n';

interface StringValidationSchemaParams {
  id?: string;
  validatePermissions: ValidatePermissions;
  aggregateName: string;
  action?: string;
  field: string;
  t: TFunction;
  required?: boolean;
  regex?: RegExp;
  regexErrorMessage?: string;
  max?: number;
}

export const getStringValidationSchema = (params: StringValidationSchemaParams): yup.StringSchema | undefined => {
  const {
    id,
    validatePermissions,
    t,
    aggregateName,
    action = 'updateAny',
    field,
    required = false,
    regex,
    regexErrorMessage,
    max,
  } = params;
  if (!!id && !validatePermissions(aggregateName, action, field)) {
    return undefined;
  }

  let schema = yup.string().max(
    max || config.validation.string.maxLength,
    t('common:maxLengthError', {
      field: t(field),
      maxCharacters: max || config.validation.string.maxLength,
    }),
  );
  if (required) {
    schema = schema.required(
      t('common:requiredError', {
        field: t(field),
      }),
    );
  }
  if (regex) {
    schema = schema.matches(
      regex,
      regexErrorMessage ||
        t('common:invalidError', {
          field: t(field),
        }),
    );
  }
  return schema;
};
