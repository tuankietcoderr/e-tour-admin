import ReportCard from "@/components/ReportCard";
import { State } from "@/constants/state";
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

const Reports = ({ isLimitedRender = true }) => {
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

  const renderData = (data) =>
    isLimitedRender
      ? (data || new Array(6).fill()).slice(0, 6)
      : data || new Array(6).fill();

  return (
    <>
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
                {report.data && report.data.length === 0 ? (
                  <p>No reports</p>
                ) : (
                  renderData(report.data)?.map((r) => (
                    <GridItem w="100%" key={r?._id || randomUUID()}>
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

export default Reports;
