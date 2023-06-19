import { Card, CardBody, SkeletonText, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";

const ReportCard = ({ report }) => {
  const isLoaded = !!report;
  return (
    <>
      <Card>
        <CardBody>
          <SkeletonText isLoaded={isLoaded}>
            <Text>{report?.content}</Text>
          </SkeletonText>
          <SkeletonText isLoaded={isLoaded}>
            <Text fontSize={"xs"} fontStyle={"italic"}>
              at {moment(report?.createdAt).format("DD-MM-YYYY hh:mm")}
            </Text>
          </SkeletonText>
        </CardBody>
      </Card>
    </>
  );
};

export default ReportCard;
