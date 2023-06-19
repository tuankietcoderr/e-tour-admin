import { updateRegistration } from "@/api/registration";
import { AuthState } from "@/constants/state";
import { avatarStorage, randomUUID } from "@/lib/image";
import useAlertDialog from "@/pages/hooks/useAlertDialog";
import { ProfileState } from "@/schema/company";
import { selectAdmin } from "@/store/features/auth/selector";
import { updateRegistrationThunk } from "@/store/features/registration/thunk";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  AlertDialog,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { Slide } from "react-slideshow-image";

const RegistrationCard = ({ registration }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const handleOnClickApprove = async () => {
    toast({
      description: "Approving...",
      status: "loading",
    });
    dispatch(
      updateRegistrationThunk({
        isApproveToActive: true,
        id: registration._id,
      })
    )
      .then((res) => {
        console.log({ res });
        toast.closeAll();
        toast({
          description: "Approve success",
          status: "success",
          duration: 1000,
        });
      })
      .catch((err) => {
        toast.closeAll();
        throw err;
      });
  };

  const handleOnClickReject = async () => {
    toast({
      description: "Rejecting...",
      status: "loading",
    });
    dispatch(
      updateRegistrationThunk({
        isApproveToActive: false,
        id: registration._id,
      })
    )
      .then((res) => {
        toast.closeAll();
        toast({
          description: "Reject success",
          status: "success",
          duration: 1000,
        });
      })
      .catch((err) => {
        toast.closeAll();
        throw err;
      });
  };

  const ApproveAlert = useAlertDialog({
    color: "blue",
    title: "Approve",
    header: "Approve this registration?",
    description: "This action cannot be undone",
    actionText: "Approve",
    handleFunc: handleOnClickApprove,
  });

  const RejectAlert = useAlertDialog({
    color: "red",
    title: "Reject",
    header: "Reject this registration?",
    description: "This action cannot be undone",
    actionText: "Reject",
    handleFunc: handleOnClickReject,
    style: {
      variant: "ghost",
    },
  });

  const isLoaded = !!registration;

  return (
    <>
      <Card w="full">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="8" alignItems="center" flexWrap="wrap">
              <SkeletonCircle isLoaded={isLoaded}>
                <Avatar
                  name={registration?.name}
                  src={avatarStorage(registration?.image)}
                />
              </SkeletonCircle>

              <Box>
                <SkeletonText noOfLines={3} isLoaded={isLoaded}>
                  <Heading size="sm">{registration?.name}</Heading>
                  <Text fontSize={"xs"}>{registration?.email}</Text>
                  <Text fontSize={"xs"}>
                    at{" "}
                    {moment(registration?.createdAt).format("DD-MM-YYYY HH:mm")}
                  </Text>
                </SkeletonText>
              </Box>
            </Flex>
            <Badge
              sx={{
                alignSelf: "flex-start",
              }}
              fontSize={"medium"}
              colorScheme={
                registration?.profileState === ProfileState.APPROVED
                  ? "green"
                  : registration?.profileState === ProfileState.REJECTED
                  ? "red"
                  : "blue"
              }
            >
              <Skeleton isLoaded={isLoaded}>
                {registration?.profileState}
              </Skeleton>
            </Badge>
          </Flex>
        </CardHeader>
        <CardBody>
          <SkeletonText noOfLines={4} isLoaded={isLoaded}>
            <Text>{registration?.description}</Text>
          </SkeletonText>
        </CardBody>

        <Skeleton isLoaded={isLoaded}>
          {registration?.previewImages && (
            <Slide
              arrows={registration?.previewImages.length !== 0}
              infinite={false}
              indicators={registration?.previewImages.length !== 0}
            >
              {registration?.previewImages?.map((image) => (
                <Image
                  key={image + randomUUID()}
                  objectFit="cover"
                  src={avatarStorage(image)}
                />
              ))}
            </Slide>
          )}
        </Skeleton>

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          gap={2}
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          {registration?.profileState === ProfileState.PENDING ? (
            <>
              <Skeleton flex={"1"} isLoaded={isLoaded}>
                {ApproveAlert}
              </Skeleton>
              <Skeleton flex={"1"} isLoaded={isLoaded}>
                {RejectAlert}
              </Skeleton>
            </>
          ) : (
            <Skeleton isLoaded={isLoaded} flex={"1"}>
              {!registration?.isApproveToActive ? ApproveAlert : RejectAlert}
            </Skeleton>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default RegistrationCard;
