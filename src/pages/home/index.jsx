import RegistrationCard from "@/components/RegistrationCard";
import Reports from "@/components/Reports";
import { AuthState } from "@/constants/state";
import { selectAdmin } from "@/store/features/auth/selector";
import {
  selectPendingRegistrations,
  selectRegistrations,
  selectRejectedRegistrations,
} from "@/store/features/registration/selector";
import { useAppSelector } from "@/store/hook";
import { Heading, SkeletonText } from "@chakra-ui/react";

const HomePage = () => {
  const { status } = useAppSelector(selectAdmin);
  const { status: registrationStatus, registrations } =
    useAppSelector(selectRegistrations);

  const pendingRegistrations = useAppSelector(selectPendingRegistrations);
  const rejectedRegistrations = useAppSelector(selectRejectedRegistrations);

  const isTitleLoaded = status === AuthState.AUTHORIZED;

  return (
    <>
      <Heading mb={4}>
        <SkeletonText noOfLines={1} isLoaded={isTitleLoaded}>
          Latest registration
        </SkeletonText>
      </Heading>
      <div className="grid grid-cols-2">
        <RegistrationCard
          registration={pendingRegistrations?.[0] || rejectedRegistrations?.[0]}
        />
      </div>
      <Heading my={4}>
        <SkeletonText noOfLines={1} isLoaded={isTitleLoaded}>
          Reports
        </SkeletonText>
      </Heading>
      <Reports />
    </>
  );
};

export default HomePage;
