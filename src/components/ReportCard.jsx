import useAlertDialog from "@/pages/hooks/useAlertDialog";
import useIconModal from "@/pages/hooks/useIconModal";
import {
  selectCompanies,
  selectCompanyWithId,
} from "@/store/features/company/selector";
import { deleteReportThunk } from "@/store/features/report/thunk";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  IconButton,
  LinkOverlay,
  Skeleton,
  SkeletonText,
  Text,
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ReportCard = ({ report }) => {
  const isLoaded = !!report;
  const dispatch = useAppDispatch();
  const reportType = report?.reportType;
  const toast = useToast();
  const handleDeleteReport = async () => {
    try {
      toast({
        status: "loading",
        description: "Deleting report...",
      });
      const res = await dispatch(deleteReportThunk(report?._id));
      if (res.payload) {
        toast.closeAll();
        toast({
          status: "success",
          description: "Delete report successfully",
          duration: 1000,
        });
      }
    } catch (err) {
      toast.closeAll();
      toast({
        status: "error",
        description: err.message,
        duration: 1000,
      });
    }
  };

  const DeleteModal = useIconModal({
    icon: <DeleteIcon color={"red.500"} />,
    style: {
      variant: "ghost",
    },
    handleFunc: handleDeleteReport,
    actionText: "Delete",
    description: "Are you sure you want to delete this report?",
    title: "Delete Report",
    color: "red",
  });
  const isApplicationReport = reportType === "application";

  return (
    <>
      <Card>
        <CardBody>
          <SkeletonText isLoaded={isLoaded}>
            <Text>{report?.content}</Text>
          </SkeletonText>
          <SkeletonText isLoaded={isLoaded} noOfLines={1} mt={2}>
            <Text fontSize={"xs"} fontStyle={"italic"}>
              at {moment(report?.createdAt).format("DD-MM-YYYY hh:mm")}
            </Text>
          </SkeletonText>
          <SkeletonText isLoaded={isLoaded} noOfLines={1} mt={2}>
            {!isApplicationReport && (
              <Text fontSize={"xs"} fontStyle={"italic"}>
                Reported {report?.reportType} ID: {report?.objectId}
              </Text>
            )}
          </SkeletonText>
        </CardBody>
        <CardFooter>
          <Flex gap={4} w={"full"} flexDirection={"row-reverse"}>
            <Skeleton isLoaded={isLoaded}>{DeleteModal}</Skeleton>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
};

export default ReportCard;
