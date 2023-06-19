/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

import { Button, Text } from "@chakra-ui/react";

export default function ErrorPage({}) {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="w-full h-screen overflow-hidden grid place-items-center gap-4">
      <div className="flex flex-col gap-4">
        <Text fontSize={"2xl"}>{error?.cause || "Something went wrong"}</Text>
        <Text fontSize={"md"}>{error?.message}</Text>
        <Button
          onClick={() => {
            navigate("/");
          }}
          icon={null}
        >
          Go back to home
        </Button>
      </div>
    </div>
  );
}
