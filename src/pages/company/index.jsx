import { AuthState, State } from "@/constants/state";
import { imageStorage, randomUUID } from "@/lib/image";
import { selectAdmin } from "@/store/features/auth/selector";
import { selectCompanies } from "@/store/features/company/selector";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  AlertDialog,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  SkeletonText,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import useIconModal from "../hooks/useIconModal";
import { DeleteIcon, LockIcon, UnlockIcon, ViewIcon } from "@chakra-ui/icons";
import { setCompanyWithId } from "@/store/features/company";
import DrawerIcon from "@/components/Drawer";
import { Slide } from "react-slideshow-image";
import { ProfileState } from "@/schema/company";
import {
  banCompanyThunk,
  deleteCompanyThunk,
  unbanCompanyThunk,
} from "@/store/features/company/thunk";

const CompanyPage = () => {
  const { status } = useAppSelector(selectAdmin);
  const {
    companies,
    status: companyStatus,
    company,
  } = useAppSelector(selectCompanies);
  const isLoaded = status === AuthState.AUTHORIZED;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleBan = async (id) => {
    try {
      toast({
        status: "loading",
        description: "Ban company...",
      });
      const res = await dispatch(banCompanyThunk(id));
      if (res.payload) {
        toast.closeAll();
        toast({
          status: "success",
          description: "Ban company successfully",
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

  const handleUnban = async (id) => {
    try {
      toast({
        status: "loading",
        description: "Unban company...",
      });
      const res = await dispatch(unbanCompanyThunk(id));
      if (res.payload) {
        toast.closeAll();
        toast({
          status: "success",
          description: "Unban company successfully",
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

  const handleDeleteCompany = async (id) => {
    try {
      toast({
        status: "loading",
        description: "Deleting company...",
      });
      const res = await dispatch(deleteCompanyThunk(id));
      if (res.payload) {
        toast.closeAll();
        toast({
          status: "success",
          description: "Delete company successfully",
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

  return (
    <>
      <Heading mb={4}>
        <SkeletonText isLoaded={isLoaded}>Company management</SkeletonText>
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <SkeletonText isLoaded={isLoaded}>ID</SkeletonText>
              </Th>
              <Th>
                <SkeletonText isLoaded={isLoaded}>Name</SkeletonText>
              </Th>
              <Th>
                <SkeletonText isLoaded={isLoaded}>Address</SkeletonText>
              </Th>
              <Th>
                <SkeletonText isLoaded={isLoaded}>Phone</SkeletonText>
              </Th>
              <Th>
                <SkeletonText isLoaded={isLoaded}>Email</SkeletonText>
              </Th>
              <Th>
                <SkeletonText isLoaded={isLoaded}>Profile state</SkeletonText>
              </Th>
              <Th>
                <SkeletonText isLoaded={isLoaded}>Is activated</SkeletonText>
              </Th>
              <Th>
                <SkeletonText isLoaded={isLoaded}>Actions</SkeletonText>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {companies && companies.length === 0 ? (
              <p>No data</p>
            ) : (
              (companies || new Array(10).fill())?.map((company) => {
                const isBan =
                  company?.profileState === ProfileState.REJECTED &&
                  company?.isApproveToActive === false;

                return (
                  <Tr key={company?._id || randomUUID()}>
                    <Td>
                      <SkeletonText noOfLines={1} isLoaded={!!company}>
                        {company?._id.toUpperCase()?.slice(4, 10)}
                      </SkeletonText>
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} isLoaded={!!company}>
                        {company?.name}
                      </SkeletonText>
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} isLoaded={!!company}>
                        {company?.address || "No provided"}
                      </SkeletonText>
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} isLoaded={!!company}>
                        {company?.phone || "No provided"}
                      </SkeletonText>
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} isLoaded={!!company}>
                        {company?.email || "No provided"}
                      </SkeletonText>
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} isLoaded={!!company}>
                        {company?.profileState}
                      </SkeletonText>
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} isLoaded={!!company}>
                        {company?.isApproveToActive ? "Yes" : "No"}
                      </SkeletonText>
                    </Td>
                    <Td>
                      <Flex gap={2}>
                        <Skeleton isLoaded={!!company}>
                          <Button
                            onClick={() => {
                              dispatch(setCompanyWithId(company?._id));
                              onOpen();
                            }}
                            variant={"ghost"}
                            colorScheme="blue"
                          >
                            <Tooltip label="View">
                              <ViewIcon />
                            </Tooltip>
                          </Button>
                        </Skeleton>
                        <Skeleton isLoaded={!!company}>
                          <Button
                            variant={"ghost"}
                            colorScheme="yellow"
                            onClick={() => {
                              if (
                                company?.profileState === ProfileState.PENDING
                              ) {
                                toast({
                                  status: "warning",
                                  description:
                                    "Company is pending and you can't ban it",
                                  duration: 1000,
                                });
                                return;
                              }
                              isBan
                                ? handleUnban(company?._id)
                                : handleBan(company?._id);
                            }}
                          >
                            {isBan ? (
                              <Tooltip label="Unban">
                                <UnlockIcon />
                              </Tooltip>
                            ) : (
                              <Tooltip label="Ban">
                                <LockIcon />
                              </Tooltip>
                            )}
                          </Button>
                        </Skeleton>
                        <Skeleton isLoaded={!!company}>
                          <Button
                            variant={"ghost"}
                            colorScheme="red"
                            onClick={() => handleDeleteCompany(company._id)}
                          >
                            <Tooltip label="Delete">
                              <DeleteIcon />
                            </Tooltip>
                          </Button>
                        </Skeleton>
                      </Flex>
                    </Td>
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {company && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Flex alignItems={"center"} gap={4}>
                <Image
                  borderRadius={"50%"}
                  w={100}
                  h={100}
                  src={imageStorage(company.image)}
                  alt="logo"
                />
                <Heading>{company.name}</Heading>
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Heading size="md">Company information</Heading>
                <Text>{company.description}</Text>
              </Box>
              <Box>
                <Heading size="md">Company contact</Heading>
                <Text>{company.address}</Text>
                <Text>{company.phone}</Text>
                <Text>{company.email}</Text>
              </Box>
              <Box>
                <Slide>
                  {company?.previewImages?.map((image) => {
                    return (
                      <Image
                        src={imageStorage(image)}
                        alt="image"
                        key={image + randomUUID()}
                      />
                    );
                  })}
                </Slide>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default CompanyPage;
