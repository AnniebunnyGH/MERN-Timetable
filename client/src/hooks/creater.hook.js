import { useCallback,useState } from 'react'

export const useCreater = () => {
const [isCreater, setMode] = useState(false);

const setCreaterMode = useCallback((value)=>{
    setMode(value);
},[])

return {isCreater,setCreaterMode}
} 