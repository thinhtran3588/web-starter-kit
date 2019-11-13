export const sanitizeFormData = <T>(formData: T): T => {
  if (!formData) {
    return formData;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = {};
  Object.keys(formData).forEach((key: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data[key] = (formData as any)[key] || '';
  });
  return data;
};
