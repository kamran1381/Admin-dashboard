// import React,{useState , useEffect} from 'react'

// export default function useLocalstorage(key , initvalue) {
//   const [fileValue , setfileValue] = useState(initvalue)
  
//   const reset = ()=>{
//     setfileValue("")
//   }

//   const FileBinding = {
//     fileValue : fileValue,
//     onChange : (e) =>{
//         setfileValue(e.target.files[0])
//     }
//   }

//   useEffect(()=>{
//     localStorage.setItem(key , JSON.stringify(fileValue))
//   },[fileValue , key])

//   return[fileValue , FileBinding , reset]
// }
