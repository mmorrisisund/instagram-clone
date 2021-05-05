import { useEffect, useState } from 'react'

const useUploadFile = fileInfo => {
  const [file, setFile] = useState(undefined)

  useEffect(() => {
    const reader = new FileReader()

    reader.onload = e => setFile(e.target.result)

    if (fileInfo) {
      reader.readAsDataURL(fileInfo)
    }
  }, [fileInfo])

  return { file, isLoading: !file }
}

export default useUploadFile
