'use client'
import Image from "next/image";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import '@/styles/outline-none.css'
import { Checkbox } from "./ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import ShowHidePassword from "./ShowHidePassword";
import { IoCalendarSharp } from "react-icons/io5";
import { FileUploader } from "./FileUplaoder";

export const  FormFieldType =  {
    INPUT : "input",
    TEXTAREA : "textarea",
    PHONE_INPUT : "phoneInput",
    CHECKBOX : "checkbox",
    DATE_PICKER : "datePicker",
    SELECT : "select",
    SKELETON : "skeleton",
    PASSWORD: "password",
    FILE_INPUT: 'fileinput'
}

const RenderInput = ({ field, props }) => {
  const [show,setShow] = useState(false);
    switch (props.fieldType) {
      case FormFieldType.INPUT:
        return (
          <div className="flex relative rounded-md bg-dark-400">
            {props.iconSrc && (
              <Image
                src={props.iconSrc}
                height={24}
                width={24}
                alt={props.iconAlt || "icon"}
                className="ml-2 absolute top-[50%] -translate-y-[50%]"
              />
            )}
            <FormControl>
              <Input
                placeholder={props.placeholder}
                {...field}
                className={`border-0 py-4 bg-primaryColor2  pl-9 font-bold`}
              />
            </FormControl>
          </div>
        );
        case FormFieldType.PASSWORD:
          return (
            <>
            <div className="flex relative rounded-md bg-dark-400 ">
              {props.iconSrc && (
                <Image
                  src={props.iconSrc}
                  height={24}
                  width={24}
                  alt={props.iconAlt || "icon"}
                  className="ml-2 absolute top-[50%] -translate-y-[50%]"
                />
              )}
              <FormControl>
            
                <Input
                type={!show?"password":""}
                  placeholder={props.placeholder}
                  {...field}
                  className={`border-0 py-4 bg-primaryColor2  pl-9 font-bold`}
                />
              </FormControl>
              <div className="flex items-center" onClick={()=>{setShow(!show)}}>
              <ShowHidePassword state={show}/>
             </div>
            </div>
             
            </>
          );
      case FormFieldType.TEXTAREA:
        return (
          <FormControl>
            <Textarea
              placeholder={props.placeholder}
              {...field}
              className=" bg-primaryColor2  resize-none"
              disabled={props.disabled}
            />
          </FormControl>
        );
      case FormFieldType.PHONE_INPUT:
        return (
          <FormControl>
            <PhoneInput
              defaultCountry="US"
              placeholder={props.placeholder}
              international
              withCountryCallingCode
              value={field.value}
              onChange={field.onChange}
              className="border-0 bg-primaryColor2 p-2 outline-none  rounded-md font-bold no-focus-outline"
         
            />
          </FormControl>
        );
      case FormFieldType.CHECKBOX:
        return (
          <FormControl>
            <div className="flex items-center gap-4">
              <Checkbox
                id={props.name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label htmlFor={props.name} className="checkbox-label">
                {props.label}
              </label>
            </div>
          </FormControl>
        );
      case FormFieldType.DATE_PICKER:
        return (
          <div className="flex items-center p-1 rounded-md border border-dark-500 bg-dark-400">
<IoCalendarSharp className="text-primaryColor" size={22}
            />
            <FormControl>
              <ReactDatePicker
                showTimeSelect={props.showTimeSelect ?? false}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                timeInputLabel="Time:"
                dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
                wrapperClassName="date-picker"
              />
            </FormControl>
          </div>
        );
      case FormFieldType.SELECT:
        return (
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="">
                  <SelectValue placeholder={props.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white">
                {props.children}
              </SelectContent>
            </Select>
          </FormControl>
        );
      case FormFieldType.SKELETON:
        return props.renderSkeleton ? props.renderSkeleton(field) : null;
        case FormFieldType.FILE_INPUT:
        return (
<FormControl>
          <FileUploader files={field.value} onChange={field.onChange} />
        </FormControl>
        );
        default:
        return null;
    }
  };

  const CustomFormField = (props) => {
    const { control, name, label } = props;
  
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="">
            {props.fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel className="shad-input-label">{label}</FormLabel>
            )}
            <RenderInput field={field} props={props} />
  
            <FormMessage className="text-red-600 mt-4" />
          </FormItem>
        )}
      />
    );
  };
  
  export default CustomFormField;