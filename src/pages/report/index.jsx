import ReportCard from "@/components/ReportCard";
import Reports from "@/components/Reports";
import { AuthState, State } from "@/constants/state";
import { randomUUID } from "@/lib/image";
import { selectAdmin } from "@/store/features/auth/selector";
import {
  selectApplicationReports,
  selectCompanyReports,
  selectRouteReports,
} from "@/store/features/report/selector";
import { useAppSelector } from "@/store/hook";
import {
  Grid,
  GridItem,
  Heading,
  Skeleton,
  SkeletonText,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";

const ReportPage = () => {
  const { status } = useAppSelector(selectAdmin);
  const isLoaded = status === AuthState.AUTHORIZED;
  return (
    <>
      <Heading mb={4}>
        <SkeletonText isLoaded={isLoaded} noOfLines={1}>
          Reports
        </SkeletonText>
      </Heading>
      <Reports isLimitedRender={false} />
    </>
  );
};

export default ReportPage;
