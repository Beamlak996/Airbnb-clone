"use client";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useRegisterModal } from "../hooks/useRegisterModal";
import { useLoginModal } from "../hooks/useLoginModal";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modals from "./Modals";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(()=>{
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log("error")

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };



  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome Back' subtitle='Login to your account!' />
      <Input
        id='email'
        label='Email'
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
        onClick={() => signIn('google')}
      />
      {/* <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => {signIn('github')}}
      /> */}
      <div className='text-neutral-500 text-center mt-4 font-light '>
        <div className='flex items-center justify-center gap-2'>
          <div>First time using airbnb?</div>
          <div
            className='text-black cursor-pointer hover:underline'
            onClick={onToggle}
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modals
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
