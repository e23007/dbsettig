import {useState,useEffect} from 'react'
import { ulid } from 'ulid'
import * as ListData from './server'

export const useList=()=>{
    const [list,setList]=useState([])
    useEffect(()=>{
        ListData.getListData().then((list)=>{
        setList([...list].reverse())     
        })
    },[])
    const ListItemStatus=(id,done)=>{
        const listItem=list.find((item)=>item.id===id)
        const newListItem={...listItem,done:!done}
        ListData.updateListData(id,newListItem).then((updatedList)=>{
            const newList=list.map((item)=>item.id!==updatedList.id ?item:updatedList)
            setList(newList)
        })

    }
    const addListItem=(listContent)=>{
        const newListItem={
            id:ulid(),
            content:listContent,
            done:false
        }
        return ListData.addListData(newListItem).then((addList)=>{
            setList([addList,...list])
        })
    }
    const deleteListItem=(id)=>{
        ListData.deleteListData(id).then((deleteListItemId)=>{
            const newList=list.filter(
                (item)=>item.id !==deleteListItemId
            )
            setList(newList)
        })
    }
    return{
        list,
        ListItemStatus,
        addListItem,
        deleteListItem
    }
}