import * as yup from 'yup';

export const prescriptionValidationSchema = yup.object().shape({
  medication: yup.string().required(),
  status: yup.string().required(),
  doctor_id: yup.string().nullable(),
  patient_id: yup.string().nullable(),
});
