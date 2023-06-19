import { AuthState } from "@/constants/state";
import { selectAdmin } from "@/store/features/auth/selector";
import { loginThunk } from "@/store/features/auth/thunk";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import React from "react";

const Authentication = () => {
  const toast = useToast();
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(selectAdmin);

  const handleSubmit = async () => {
    if (loading) return;
    if (!form.username || !form.password) {
      return toast({
        position: "bottom",
        colorScheme: "red",
        description: "Please fill all fields",
        duration: 1000,
      });
    }
    toast({
      position: "bottom",
      colorScheme: "blue",
      description: "Logging in",
      status: "loading",
    });
    dispatch(loginThunk(form))
      .then((res) => {
        toast.closeAll();
        if (res.payload.tokens.accessToken) {
          return toast({
            position: "bottom",
            colorScheme: "green",
            description: "Login success",
            duration: 1000,
            status: "success",
          });
        }
        return toast({
          position: "bottom",
          colorScheme: "red",
          description: "Login failed",
          duration: 1000,
          status: "error",
        });
      })
      .catch((err) => {
        toast.closeAll();
        return toast({
          position: "bottom",
          colorScheme: "red",
          description: "Login failed",
          duration: 1000,
          status: "error",
        });
      });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-slate-400/80 z-[999]">
      <div className="bg-white p-20 rounded-lg">
        <h2 className="text-xl text-center font-bold mb-8">Log in</h2>
        <FormControl
          className="flex flex-col gap-4"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        >
          <div>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Enter admin username"
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value,
                })
              }
              autoFocus
            />
          </div>
          <div>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              enterKeyHint="done"
              placeholder="Enter admin password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
            <FormHelperText>Don't share your password to anyone</FormHelperText>
          </div>
          <Button
            colorScheme={loading ? "gray" : "blue"}
            width={"100%"}
            type="submit"
            onClick={handleSubmit}
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </FormControl>
      </div>
    </div>
  );
};

export default Authentication;
