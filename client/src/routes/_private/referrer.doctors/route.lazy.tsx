import { ReferrerDoctorPage } from '@/pages/referrer/doctor/referrer-doctor.page';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_private/referrer/doctors')({
  component: ReferrerDoctorPage,
});
