import React,{useRef,useState} from 'react'
import {useList} from './hooks/useList'
import { Button, Container, } from '@chakra-ui/react';


const ListTitle=({title,as})=>{
    if (as==='h1') return <h1>{title}</h1> 
    if (as==='h2') return <h2>{title}</h2>
    return <p>{title}</p>
}
const ListItem=({ListItemStatus,deleteListItem,schedule})=>{
    const handleChange=()=>ListItemStatus(schedule.id,schedule.done)
    const handleDelete=()=>deleteListItem(schedule.id)
    return(
        <li>
            {schedule.content}
            <Button onClick={handleChange}>{schedule.done ? '未完了リストへ':'完了リストへ'}</Button>
            <Button onClick={handleDelete}>削除</Button>
        </li>
    )
}
const List=({list,ListItemStatus,deleteListItem})=>{
    return(
        <ul>
            {list.map((schedule)=>(
                <ListItem schedule={schedule} key={schedule.id} ListItemStatus={ListItemStatus} deleteListItem={deleteListItem}/>
            ))}
        </ul>
    )
}
const ListAdd=({inputEl,handleListAdd})=>{
    return(
        <>
            <textarea ref={inputEl} />
            <Button  onClick={handleListAdd}>予定を追加</Button>
        </>
    )
}
const Schedule=()=>{
    const [Message,setMessage]=useState(null)
    const{list,addListItem,ListItemStatus,deleteListItem}=useList()
    const inputEl=useRef(null)
    const handleListAdd=()=>{
        if (inputEl.current.value==='')return setMessage('記入してください');
        addListItem(inputEl.current.value);
        inputEl.current.value=''
        setMessage(null)
    }
    const inComplatedList=list.filter((list)=>{
        return !list.done;
    })
    const comlatedList=list.filter((list)=>{
        return list.done;
    })
    return (
        <Container>
            <ListTitle title='予定管理' as='h1' />
            <ListTitle title={Message} as='h3' />
            <ListAdd inputEl={inputEl} handleListAdd={handleListAdd}/>
            <ListTitle title='未完了' as='h2'/>
            <List list={inComplatedList}  ListItemStatus={ListItemStatus} deleteListItem={deleteListItem}/>
            <ListTitle title='完了' as='h2'/>
            <List list={comlatedList} ListItemStatus={ListItemStatus} deleteListItem={deleteListItem}/>
        </Container>
    )
}
export default Schedule