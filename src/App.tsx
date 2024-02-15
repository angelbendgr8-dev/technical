//@ts-nocheck
"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  VStack,
  Divider,
  Center,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/react";
import googleLogo from "./assets/google.png";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Firs name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Must be a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required(
      "Password is required and Password must be at least 8 characters long"
    )
    .matches(/^(?=.*[A-Z])/, "One Uppercase")
    .matches(/^(?=.*[a-z])/, "One Lowercase")
    .matches(/^(?=.*[0-9])/, "One Number")
    .matches(/^(?=.*[!@#$%^&*])/, "At least 1 Symbol")
    .matches(/^(?=.{8,})/, "Must Contain 8 Characters"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password Confirmation is required"),
});

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);

  const [Ierrors, setErrors] = useState<string[]>([]);
  const [pErrors] = useState<string[]>([
    "Must Contain 8 Characters",
    "One Uppercase",
    "One Lowercase",
    "One Number",
    "At least 1 Symbol",
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors,values },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  function onSubmit(values: any) {
    console.log(values);
  }

  const formatPasswordError = async (password: string) => {
    // console.log(password);
    console.log(values)
    registerSchema
      .validate(
        {
          password: password,
        },
        { abortEarly: false }
      )
      .then((data) => {
        console.log(data);
        setErrors([]);
      })
      .catch((e) => {
        // console.log(e.errors);
        setErrors(e.errors);
      });
  };

  useEffect(() => {
    console.log(Ierrors);
  }, [Ierrors]);

  return (
    <Flex
      minH={"100vh"}
      width={"100vw"}
      align={"center"}
      justify={"center"}
      flex={1}
      flexDir={"column"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <HStack
        bg={"white"}
        shadow={"sm"}
        w="100vw"
        py={2}
        justifyContent={"center"}
      >
        <Text fontWeight={"700"}>Logo</Text>
      </HStack>
      <Stack spacing={4} mx={"auto"} flex={2} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"2xl"} textAlign={"center"}>
            Create account
          </Heading>
          <Text fontSize={"md"} color={"gray.600"}>
            Get up and running and start booking appointments
          </Text>
        </Stack>
        <Box
          rounded={"2xl"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <VStack w="100%">
              <Button
                boxShadow="xs"
                _hover={{
                  bg: "white",
                  borderWidth: 0,
                  shadow: "md",
                }}
                variant={"ghost"}
                borderColor={"transparent"}
                borderWidth={0}
                leftIcon={<Image src={googleLogo} boxSize={"20px"} />}
                w="full"
                bg="white"
              >
                Sign up with Google
              </Button>
              <Stack
                direction="row"
                alignItems={"center"}
                w="full"
                h="5px"
                py={5}
              >
                <Divider orientation="horizontal" w="full" />
                <Text fontSize={"smaller"}>OR</Text>
                <Divider orientation="horizontal" />
              </Stack>
            </VStack>
            <form
              onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
            >
              <HStack mt={3} spacing={4} alignItems={"center"} justifyContent={'center'}>
                <Box>
                  <FormControl isInvalid={errors.firstName} id="firstName">
                    <FormLabel>First Name</FormLabel>
                    <Input
                      {...register("firstName")}
                      boxShadow={"sm"}
                      focusBorderColor="primary.900"
                      type="text"
                    />
                    <FormErrorMessage>
                      {errors.firstName ? errors.firstName.message: ' '}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isInvalid={errors.lastName} id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      {...register("lastName")}
                      boxShadow={"sm"}
                      focusBorderColor="primary.900"
                      type="text"
                    />
                    <FormErrorMessage>
                      {errors.lastName ? errors.lastName.message: ' '}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl isInvalid={errors?.email!} mt={3} id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  {...register("email")}
                  boxShadow={"sm"}
                  focusBorderColor="primary.900"
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.password!} mt={3} id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    focusBorderColor="primary.900"
                    boxShadow={"sm"}
                    type={showPassword ? "text" : "password"}
                    onChange={(evt) => formatPasswordError(evt.target.value)}
                  />
                  <InputRightElement px={6} h={"full"}>
                    <Button
                      variant={"ghost"}
                      borderWidth={0}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              
              </FormControl>

              {Ierrors.length >= 1 ? (
                <Flex
                  bg="#f9fbfc"
                  p="3"
                  my={2}
                  justifyContent={"start"}
                  boxShadow={"xs"}
                  rounded="md"
                  flexWrap={"wrap"}
                >
                  {pErrors.map((item, index) => (
                    <Text
                      key={index}
                      rounded={"2xl"}
                      mr={2}
                      my={2}
                      px={3}
                      bg={Ierrors.includes(item) ? "#e2e8ef" : "primary.900"}
                      color={Ierrors.includes(item) ? "black" : "white"}
                    >
                      {item}
                    </Text>
                  ))}
                </Flex>
              ) : (
                <Box></Box>
              )}
              <FormControl isInvalid={errors?.confirm!} mt={3} id="password">
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    boxShadow={"sm"}
                    focusBorderColor="primary.900"
                    {...register("confirm")}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement px={6} h={"full"}>
                    <Button
                      variant={"ghost"}
                      borderWidth={0}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.confirm && errors.confirm.message}
                </FormErrorMessage>
              </FormControl>
              <Stack my={6} spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"primary.900"}
                  color={"white"}
                  _hover={{
                    opacity: 0.9,
                  }}
                  type="submit"
                >
                  Create account
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
        <Stack pt={1}>
          <Text align={"center"}>
            Already have an account?{" "}
            <Link
              _hover={{ color: "primary.900", opacity: 0.8 }}
              color={"primary.900"}
            >
              Log in
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
}
