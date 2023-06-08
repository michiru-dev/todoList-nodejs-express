import React, { useEffect, useState } from 'react'
import './App.css'
import Button from './component/Button'
import ShowList from './component/ShowList'
import axios from './axios'
import { v4 as uuidv4 } from 'uuid'

// const CustomButton = ({
//   text,
//   onClick,
// }: {
//   text: string;
//   onClick: (text: string) => void;
// }) => {
//   // const cons = (text: string) => console.log(text);

//   const onClick = (text: string) => console.log(text)

//   const handleClick = () => {
//     onClick("asdffasdf"); //(text: string) => console.log(text)
//     // cons("asd");
//   };

//   // const asdfa = (text: string) => {
//   //   console.log(text);
//   // };
//   // asdfa("adsa");
//   return <button onClick={handleClick}>{text}</button>;
// };

function App() {
  const [todoInput, setTodoInput] = useState('')
  const [todoList, setTodoList] = useState<any[]>([])

  const handleOnChange = (e: any) => {
    setTodoInput(e.target.value)
  }

  useEffect(() => {
    console.log('sdf')
    const fetchList = async () => {
      await axios
        .get('/')
        .then((res) => setTodoList(res.data))
        .catch((err) => {
          console.log(err)
        })
    }
    fetchList()
  }, [])

  const handleButtonClick = async (todoInput: string) => {
    //asyncで非同期処理を宣言
    //このheadersはリクエストボディの言語、長さ、コンテンツ形式等を指定するもの
    //axios.tsのconfigファイルに記載することも可能
    //postの第三引数にいれる
    //↓リクエストヘッダー
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }
    //objectならaxiosが勝手にcontent-typeをapplication/jsonにしてくれるから上のconfigは今回はいらない
    const obj = { item: todoInput, id: uuidv4(), createdAt: new Date() }
    const res = await axios.post('/todos', { todoInput: obj })
    console.log(res.data)
    setTodoList(res.data)
    setTodoInput('')
    //そのときに追加した値が入ってないなぜ？？
    console.log(todoList)
  }

  return (
    <div className="App">
      <input
        value={todoInput}
        type="text"
        onChange={(e) => handleOnChange(e)}
      />
      {/* この場に引数がない時(ex;イベントとかコンポーネント側で渡したい時とか)は最初の引数も入れる */}
      <Button text={'追加'} onClick={() => handleButtonClick(todoInput)} />
      <ShowList list={todoList} />
    </div>
  )
}

export default App
