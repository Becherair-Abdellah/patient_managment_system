import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormFieldTypes } from "./forms/PatientForm"
import Image from "next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const RendredFiled = ({field,props})=>{
    const {fieldType,iconSrc,iconAlt,placeholder} = props;
    switch(fieldType){
        case FormFieldTypes.Input :
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
                             <Input
                             value={field.value}
                             placeholder={placeholder}
                             {...field}
                             
                             />
                        </FormControl>

                </div>
            );
        case FormFieldTypes.phone_input:
            return(
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
            )

            

    }
}


function CustomField(props) {
    const {control,fieldType,name,label} = props;
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        {fieldType !== FormFieldTypes.checkbox && label &&  
        <FormLabel>{label}</FormLabel> }
        <RendredFiled field={field} props={props}  />
        <FormDescription>
          This is your public display name.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
  )
}

export default CustomField
