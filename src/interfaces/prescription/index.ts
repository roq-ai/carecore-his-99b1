import { UserInterface } from 'interfaces/user';
import { PatientInterface } from 'interfaces/patient';
import { GetQueryInterface } from 'interfaces';

export interface PrescriptionInterface {
  id?: string;
  medication: string;
  status: string;
  doctor_id?: string;
  patient_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  patient?: PatientInterface;
  _count?: {};
}

export interface PrescriptionGetQueryInterface extends GetQueryInterface {
  id?: string;
  medication?: string;
  status?: string;
  doctor_id?: string;
  patient_id?: string;
}
