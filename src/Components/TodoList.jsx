import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [headingInput, setHeadingInput] = useState('');
	const [listInputs, setListInputs] = useState({});

	//add to-do
	const handleAddTodo = () => {
		if (headingInput.trim() !== '') {
			setTodos([...todos, { heading: headingInput, lists: [] }]);
			setHeadingInput('');
		}
	};

	// add to-do-list
	// Function to handle adding a new list item to a specific todo heading
	const handleAddList = (index) => {
		// console.log("handleAddList", listInputs, index);
		if (listInputs[index] && listInputs[index].trim() !== '') {
			// Create a copy of the current todos array
			const newTodos = [...todos];
			// console.log("handleAddList1", index, newTodos[index], listInputs[index])
			// Add the new list item to the corresponding heading's list
			newTodos[index].lists.push(listInputs[index]);
			setTodos(newTodos);
			// Clear the input field for that index
			setListInputs({ ...listInputs, [index]: '' });
		}
	};

	// Function to update list input value for a specific heading index
	const handleListInputChange = (index, value) => {
		// console.log("handleListInputChange", index, value);
		setListInputs({ ...listInputs, [index]: value }); // Update the listInputs state for the corresponding index
	};

	//delete to-do
	const haandleDeleteTodo = (index) => {
		// Create a shallow copy of the current todos array
		const newTodos = [...todos];
		// Remove the todo at the specified index
		newTodos.splice(index, 1);
		// Update the state with the new array (without the deleted todo)
		setTodos(newTodos);
	};

	return (
		<>
			<div className="todo-container">
				<h1 className="title">My Todo List</h1>
				<div className="input-container">
					<input
						type="text"
						className="heading-input"
						placeholder="Enter heading"
						value={headingInput}
						// Add onChange event handler to update headingInput state
						onChange={(e) => { setHeadingInput(e.target.value) }}
					/>
					<button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
				</div>
			</div>
			<div className="todo_main">
				{/* Iterate over each todo item in the todos array */}
				{todos.map((todo, index) => (
					<div key={index} className="todo-card">
						<div className="heading_todo">
							{/* Display the heading here */}
							<h3>{todo.heading}</h3>

							{/* Button to delete the current heading by passing its index */}
							<button className="delete-button-heading" onClick={() => haandleDeleteTodo(index)}>
								Delete Heading
							</button>
						</div>

						<ul>
							{/* Iterate over each list item inside the current todo */}
							{todo.lists.map((list, listIndex) => (
								<li key={listIndex} className='todo_inside_list'>
									{/* Display the text content of the list item */}
									<p>{list}</p>
								</li>
							))}
						</ul>

						<div className='add_list'>
							{/* Input field for adding a new item under a specific heading */}
							<input
								type="text"
								className="list-input"
								placeholder="Add List"
								// Use the value from listInputs array based on the current heading index
								value={listInputs[index] || ''}
								onChange={(e) => handleListInputChange(index, e.target.value)} />

							{/* Button to add the list item to the corresponding heading */}
							<button className="add-list-button" onClick={() => handleAddList(index)}>Add List</button>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default TodoList;
