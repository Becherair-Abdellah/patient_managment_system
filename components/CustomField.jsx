import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormFieldTypes } from "./forms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"



import "react-datepicker/dist/react-datepicker.css";
import { Textarea } from "./ui/textarea";
const RendredFiled = ({ field, props }) => {
  const { fieldType, iconSrc, iconAlt, placeholder, renderSkeleton } = props;
  switch (fieldType) {
    case FormFieldTypes.Input:
      return (
        <div className="flex rounded-md border">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input value={field.value} placeholder={placeholder} {...field} />
          </FormControl>
        </div>
      );
    case FormFieldTypes.phone_input:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
          />
        </FormControl>
      );
    case FormFieldTypes.date_picker:
      return (
        <div className="flex rounded-md border">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt}
              className="ml-2"
            />
          )}
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showTimeSelect={props.showTimeSelect ?? false}
            dateFormat={props.dateFormat ?? 'MM/dd/yyyy'}
            />
          </FormControl>
        </div>
      );
    case FormFieldTypes.skeleton:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldTypes.select:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>

                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
             {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldTypes.Textarea:
      return (
        <FormControl>
          <Textarea
          placeholder={placeholder}
          {...field}
          disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldTypes.checkbox:
      return (
      
       <FormControl>
       <div>
       <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange}/>
        <label htmlFor={props.name}>
          {props.label}
        </label>
       </div>
       </FormControl>
         
      )
    
  }
};

function CustomField(props) {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldType !== FormFieldTypes.checkbox && label && (
            <FormLabel>{label }</FormLabel>
          )}
          <RendredFiled field={field} props={props} />
          {/* <FormDescription>
          This is your public display name.
        </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomField;
