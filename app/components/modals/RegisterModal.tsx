"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useRegisterModal } from "../../hooks/useRegisterModal";
import { useState, useCallback } from "react";
import Modals from "./Modals";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import { useLoginModal } from "../../hooks/useLoginModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to Airbnb' subtitle='Create an account!' />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        errors={errors}
        required
        register={register}
      />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        errors={errors}
        required
        register={register}
      />
      <Input
        id='password'
        type='password'
        label='Password'
        disabled={isLoading}
        errors={errors}
        required
        register={register}
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      {/* <Button outline label="Continue with Github" icon={AiFillGithub} onClick={()=>signIn('github')} /> */}
      <div className='text-neutral-500 text-center mt-4 font-light '>
        <div className='flex items-center justify-center gap-2'>
          <div>Already have an account?</div>
          <div
            className='text-black cursor-pointer hover:underline'
            onClick={onToggle}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modals
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
