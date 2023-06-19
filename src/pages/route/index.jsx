import { AuthState } from "@/constants/state";
import { imageStorage, randomUUID } from "@/lib/image";
import { selectAdmin } from "@/store/features/auth/selector";
import { setRouteWithId } from "@/store/features/route";
import { selectRoutes } from "@/store/features/route/selector";
import { deleteRouteThunk } from "@/store/features/route/thunk";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { DeleteIcon, LockIcon, UnlockIcon, ViewIcon } from "@chakra-ui/icons";
import {
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
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Slide } from "react-slideshow-image";

const RoutePage = () => {
  const { status } = useAppSelector(selectAdmin);
  const { routes, route } = useAppSelector(selectRoutes);
  const isLoaded = status === AuthState.AUTHORIZED;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleDeleteRoute = async (id) => {
    try {
      toast({
        status: "loading",
        description: "Deleting route...",
      });
      const res = await dispatch(deleteRouteThunk(id));
      if (res.payload) {
        toast.closeAll();
        toast({
          status: "success",
          description: "Delete route successfully",
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
        <SkeletonText isLoaded={isLoaded}>Route management</SkeletonText>
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
                <SkeletonText isLoaded={isLoaded}>Route</SkeletonText>
              </Th>
              <Th>
                <SkeletonText isLoaded={isLoaded}>Type</SkeletonText>
              </Th>
              <Th>
                <SkeletonText isLoaded={isLoaded}>Company ID</SkeletonText>
              </Th>
              <Th isNumeric>
                <SkeletonText isLoaded={isLoaded}>Points</SkeletonText>
              </Th>
              <Th>
                <SkeletonText isLoaded={isLoaded}>Actions</SkeletonText>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {routes && routes.length === 0 ? (
              <p>No data</p>
            ) : (
              (routes || new Array(10).fill())?.map((route) => {
                return (
                  <Tr key={route?._id || randomUUID()}>
                    <Td>
                      <SkeletonText noOfLines={1} isLoaded={!!route}>
                        {route?._id.toUpperCase()?.slice(4, 10)}
                      </SkeletonText>
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} isLoaded={!!route}>
                        {route?.name}
                      </SkeletonText>
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} isLoaded={!!route}>
                        {route?.route?.join(" - ") || "No provided"}
                      </SkeletonText>
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} isLoaded={!!route}>
                        {route?.type || "No provided"}
                      </SkeletonText>
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} isLoaded={!!route}>
                        {route?.companyId || "No provided"}
                      </SkeletonText>
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} isLoaded={!!route}>
                        {route?.point}
                      </SkeletonText>
                    </Td>
                    <Td>
                      <Flex gap={2}>
                        <Skeleton isLoaded={!!route}>
                          <Button
                            onClick={() => {
                              dispatch(setRouteWithId(route?._id));
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
                        <Skeleton isLoaded={!!route}>
                          <Button
                            variant={"ghost"}
                            colorScheme="red"
                            onClick={() => handleDeleteRoute(route._id)}
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
      {route && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading>{route.name}</Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Heading size="md">Route information</Heading>
                <Text>{route.description}</Text>
              </Box>
              <Box>
                <Heading size="md">Route detail</Heading>
                <Text>{route.route.join(" - ")}</Text>
                <Text>{route.type.toUpperCase()}</Text>
              </Box>
              <Box>
                <Slide arrows={route?.images?.length > 0}>
                  {route?.images?.map((image) => {
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

export default RoutePage;
