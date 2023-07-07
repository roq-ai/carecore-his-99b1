import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getPatientById, updatePatientById } from 'apiSdk/patients';
import { Error } from 'components/error';
import { patientValidationSchema } from 'validationSchema/patients';
import { PatientInterface } from 'interfaces/patient';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function PatientEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PatientInterface>(
    () => (id ? `/patients/${id}` : null),
    () => getPatientById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PatientInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePatientById(id, values);
      mutate(updated);
      resetForm();
      router.push('/patients');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PatientInterface>({
    initialValues: data,
    validationSchema: patientValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Patient
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="medical_record" mb="4" isInvalid={!!formik.errors?.medical_record}>
              <FormLabel>Medical Record</FormLabel>
              <Input
                type="text"
                name="medical_record"
                value={formik.values?.medical_record}
                onChange={formik.handleChange}
              />
              {formik.errors.medical_record && <FormErrorMessage>{formik.errors?.medical_record}</FormErrorMessage>}
            </FormControl>
            <FormControl id="personal_information" mb="4" isInvalid={!!formik.errors?.personal_information}>
              <FormLabel>Personal Information</FormLabel>
              <Input
                type="text"
                name="personal_information"
                value={formik.values?.personal_information}
                onChange={formik.handleChange}
              />
              {formik.errors.personal_information && (
                <FormErrorMessage>{formik.errors?.personal_information}</FormErrorMessage>
              )}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'patient',
    operation: AccessOperationEnum.UPDATE,
  }),
)(PatientEditPage);
