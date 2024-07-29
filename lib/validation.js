import { z } from "zod";
export const UserFormValidation = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  // phone: z
  //   .string()
  //   .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});
export const LoginUserFormValidation = z.object({
  password: z.string().min(8, "Password is Required"),
  email: z.string().email("Invalid email address"),
});
export const ForgetPasswordUserFormValidation = z.object({
  email: z.string().email("Invalid email address"),
});
export const ResetPasswordUserFormValidation = z.object({
  password: z.string().min(8, "Password is Required"),
  confirmpassword:z.string().min(8, "Confirm Password is Required")
});
export const BasicInformationFormValidations = z.object({
  email: z.string().email("Invalid email address"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});