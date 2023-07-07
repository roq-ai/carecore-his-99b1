import { PrescriptionInterface } from 'interfaces/prescription';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PatientInterface {
  id?: string;
  medical_record?: string;
  personal_information?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  prescription?: PrescriptionInterface[];
  user?: UserInterface;
  _count?: {
    prescription?: number;
  };
}

export interface PatientGetQueryInterface extends GetQueryInterface {
  id?: string;
  medical_record?: string;
  personal_information?: string;
  user_id?: string;
}
