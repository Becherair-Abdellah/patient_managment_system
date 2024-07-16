'use client'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function FileUploder({files,onChange}) {
  const onDrop = useCallback(acceptedFiles => {
    onChange(acceptedFiles);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='bg-red-600'>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}
export default FileUploder;