import { ReactNode, createContext, useState } from "react";
interface props{
    children:ReactNode
}
interface ContextData {
    token: string;
    isAuthenticated: () => boolean; // Change the return type to boolean
    updateData: (val: string) => void; // Add the parameter type
  }
const DataContext=createContext<ContextData>({
    token:'',
    isAuthenticated:()=>false,
    updateData:()=>{}
});
const {Provider}=DataContext;
const DataProvider=({children}:props)=>{
    const [token,setToken]=useState(localStorage.getItem('token')||'');
    const isAuthenticated=()=>{
        if(token)
        return true;
        return false;
    }
    const updateData=(val:string)=>{
        setToken(val);
        localStorage.setItem('token',val);
    }
    return <Provider value={{token,isAuthenticated,updateData}}>{children}</Provider>
}
export {DataContext,DataProvider};