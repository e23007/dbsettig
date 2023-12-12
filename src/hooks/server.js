import axios from "axios";


const DataUrl='http://localhost:3100/schedules'

export const getListData=async()=>{
    const response=await axios.get(DataUrl)
    return response.data
}

export const addListData=async (list)=>{
    const response=await axios.post(DataUrl,list)
    return response.data
}

export const deleteListData=async (id)=>{
    await axios.delete(`${DataUrl}/${id}`)
    return id
}

export const updateListData=async(id,list)=>{
    const response=await axios.put(`${DataUrl}/${id}`,list)
    return response.data
}

