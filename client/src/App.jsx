import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import TodoComp from './components/TodoComp';
import axios from 'axios'
import { Button } from '@material-ui/core';

const SERVER_URL = "http://localhost:8000/todo";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const getTodos = async () => {
            try {
                const { data } = await axios.get(SERVER_URL);
                setTodos(data)
            } catch (error) {
                console.log(error)
            }
        };
        getTodos();
    }, [])

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    // add todo
    const addTodo = async (e) => {
        e.preventDefault(); // stop refresh

        if (!input) return; // disable input submit
        console.log("clicked");
        try {
            const { data } = await axios.post(SERVER_URL, {
                item: input,
            });

            setTodos([...todos, data]);
            setInput(""); // clear input upon submit
        } catch (error) {
            console.log(error)
        }
    }

    // delete todo
    const deleteTodo = async (id) => {
        try {
            const filteredTodos = todos.filter((todo) => todo._id !== id);
            setTodos(filteredTodos);
            const { data } = await axios.delete(`${SERVER_URL}/${id}`);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Wrapper className="container">
            <div className="inner">
                <h1 className="fw-bold">
                    Todo-<span className="text-primary">App</span>
                </h1>

                {/* <FormControl>
                    <InputLabel>Add Todo</InputLabel>
                    <Input />
                </FormControl> */}
                <form>
                    <input type="text" className="form-control mb-2" placeholder="Add todo" value={input} onChange={handleChange} />

                    <Button type="submit" onClick={addTodo} variant='contained' color='secondary'>
                        Add now
                    </Button>
                </form>

                <div className="todo">
                    <ul className="todo-list">
                        {
                            todos.length < 1 ? (
                                <p>No todos</p>
                            ) : (
                                todos.map((todo, i) => (
                                    <TodoComp key={i} todo={todo} onDelete={deleteTodo} />
                                ))
                            )
                        }
                    </ul>
                </div>
            </div>

        </Wrapper>
    );
};

export default App;

const Wrapper = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    .inner{
        box-shadow: -1px 4px 20px -6px rgb(0,0,0, 0.75);
        height: 90vh;
        width: 50vw;
        padding: 2rem 3rem;
        box-sizing: border-box;
        .todo{
            box-sizing: border-box;
            margin-top: 2rem;
            height: 60%;
            overflow-y: scroll;
            &-list{
                list-style: none;
                margin:0;
                padding:0;
                li{
                    background-color: #f3f3f3;
                    padding-left:1rem;
                    font-size:1.2rem;
                    display:flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    border-bottom: 1px solid crimson;
                }
            }
        }
    };
`