import { randomUUID } from "@/lib/image";
import {
  selectApplicationReports,
  selectCompanyReports,
  selectRouteReports,
} from "@/store/features/report/selector";
import { useAppSelector } from "@/store/hook";
import {
  Grid,
  GridItem,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";

const ReportDetail = () => {
  const { status: applicationReportStatus, data: applicationReports } =
    useAppSelector(selectApplicationReports);

  const { status: companyReportStatus, data: companyReports } =
    useAppSelector(selectCompanyReports);
  const { status: routeReportStatus, data: routeReports } =
    useAppSelector(selectRouteReports);

  const reports = [
    {
      _id: randomUUID(),
      name: "Route",
      data: routeReports,
      status: routeReportStatus,
    },
    {
      _id: randomUUID(),
      name: "Company",
      data: companyReports,
      status: companyReportStatus,
    },
    {
      _id: randomUUID(),
      name: "Application",
      data: applicationReports,
      status: applicationReportStatus,
    },
  ];
  return (
    <>
      <Heading>Reports</Heading>
      <Tabs>
        <TabList>
          <Tab>Route</Tab>
          <Tab>Company</Tab>
          <Tab>Application</Tab>
        </TabList>
        <TabPanels>
          {reports.map((report) => (
            <TabPanel key={report._id}>
              <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {report.status === State.LOADING ? (
                  <Spinner />
                ) : report.data && report.data.length === 0 ? (
                  <p>No reports</p>
                ) : (
                  report.data?.slice(0, 6).map((r) => (
                    <GridItem w="100%" key={r._id}>
                      <ReportCard report={r} />
                    </GridItem>
                  ))
                )}
              </Grid>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ReportDetail;
