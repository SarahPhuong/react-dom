import React, { useState, useEffect }  from 'react';
import './App.scss';
import ColorBox from './components/ColorBox';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/Pagination';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: '1'},
    { id: 2, title: '2'},
    { id: 3, title: '3'}
  ]);

  const [ postList , setPostList] = useState([]);

  const [ pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1
  })

  useEffect(() => {
    async function fetchPostList() {
      // ...
      try {
        const requestUrl = "http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });
  
        const { data } = responseJSON;
        setPostList(data);
      } catch (error) {
        console.log(error);
      }
    }
    console.log('POST list effect');
    fetchPostList();
  }, []);


  useEffect(() => {
    console.log('TODO list effect');
    // async function fetchPostList() {
    //   // ...
    //   try {
    //     const requestUrl = "http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1";
    //     const response = await fetch(requestUrl);
    //     const responseJSON = await response.json();
    //     console.log({ responseJSON });
  
    //     const { data } = responseJSON;
    //     setPostList(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    // fetchPostList();
  });

  function handlePageChange(newPage) {

  }

  function handleTodoClick(todo) {
    const index = todoList.findIndex(x => x.id === todo.id);
    if(index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    const newTodo = {
      id: todoList.length + 1, ...formValues
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1 className="title">REACT HOOK </h1>
      <ColorBox />
      <h1 className="title">React Hook TodoList</h1>
      <TodoForm onSubmit={handleTodoFormSubmit}/>
      <TodoList todos={todoList} onTodoClick={handleTodoClick}></TodoList>

      <h1 className="title">React Hook PostList</h1>
      <PostList posts={postList}/>

      <h1 className="title">React Hook Pagination</h1>
      {/* <Pagination pagination={pagination} onPageChange={handlePageChange}/> */}
    </div>
  );
}

export default App;
