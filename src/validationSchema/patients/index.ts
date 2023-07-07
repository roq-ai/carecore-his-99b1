import * as yup from 'yup';

export const patientValidationSchema = yup.object().shape({
  medical_record: yup.string(),
  personal_information: yup.string(),
  user_id: yup.string().nullable(),
});
