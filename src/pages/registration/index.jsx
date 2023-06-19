import RegistrationCard from "@/components/RegistrationCard";
import { AuthState, State } from "@/constants/state";
import { randomUUID } from "@/lib/image";
import { selectAdmin } from "@/store/features/auth/selector";
import {
  selectPendingRegistrations,
  selectRegistrations,
  selectRejectedRegistrations,
} from "@/store/features/registration/selector";
import { useAppSelector } from "@/store/hook";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  SkeletonText,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const RegistrationPage = () => {
  const { status: registrationStatus, registrations } =
    useAppSelector(selectRegistrations);
  const pendingRegistrations = useAppSelector(selectPendingRegistrations);
  const rejectedRegistrations = useAppSelector(selectRejectedRegistrations);
  const { status } = useAppSelector(selectAdmin);
  const isLoaded =
    registrationStatus === State.IDLE && status === AuthState.AUTHORIZED;

  const regs = [
    {
      _id: randomUUID(),
      name: "All",
      data: registrations,
    },
    {
      _id: randomUUID(),
      name: "Pending",
      data: pendingRegistrations,
    },
    {
      _id: randomUUID(),
      name: "Rejected",
      data: rejectedRegistrations,
    },
  ];

  return (
    <>
      <Heading mb={4}>
        <SkeletonText isLoaded={isLoaded} noOfLines={1}>
          Registration
        </SkeletonText>
      </Heading>
      <Box padding={6}>
        <Tabs>
          <TabList>
            <Tab>All</Tab>
            <Tab>Pending</Tab>
            <Tab>Rejected</Tab>
          </TabList>
          <TabPanels>
            {regs.map((reg) => (
              <TabPanel key={reg._id} onClick={() => navigatio}>
                <div className="grid grid-cols-2 gap-4">
                  {reg.data && reg.data.length === 0 ? (
                    <Text>No data</Text>
                  ) : (
                    (reg.data || new Array(6).fill()).map((registration) => (
                      <div key={registration?._id || randomUUID()}>
                        <RegistrationCard registration={registration} />
                      </div>
                    ))
                  )}
                </div>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default RegistrationPage;
