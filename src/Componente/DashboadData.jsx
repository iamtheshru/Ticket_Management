
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [tickets, setTickets] = useState([]);
    const [formData, setFormData] = useState({ customer: '', title: '', sheet: '', position: 'Assigned' });
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const savedTickets = JSON.parse(localStorage.getItem('tickets'));
        if (savedTickets) {
            setTickets(savedTickets);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tickets', JSON.stringify(tickets));
    }, [tickets]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTicket = { ...formData, id: Date.now().toString() };
        setTickets([...tickets, newTicket]);
        setFormData({ customer: '', title: '', sheet: '', position: 'Assigned' });
    };

    // const handleDragOver = (e) => { 
    //     e.preventDefault();
    // };  //drop event ko handla karta hai.

    // const handleDrop = (e, position) => {
    //     const id = e.dataTransfer.getData('text/plain'); 
    //     const updatedTickets = tickets.map((ticket) => {
    //         if (ticket.id === id) {
    //             return { ...ticket, position };
    //         }
    //         return ticket;
    //     });
    //     setTickets(updatedTickets);
    // }; 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleDelete = (id) => {
        const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
        setTickets(updatedTickets);
    };
    return (
        <div className="App">
            <h1>Ticket Management System</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Customer Name:
                    <input type="text" name="customer" value={formData.customer} onChange={handleChange} required />
                </label>
                <label>
                    Title:
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </label>
                <label>
                    Sheet No:
                    <input type="number" name="sheet" value={formData.sheet} onChange={handleChange} required />
                </label>
                <label className='pas'>
                    Position:
                    <select name="position" value={formData.position} onChange={handleChange}>
                        <option value="Assigned">Assigned</option>
                        <option value="In Process">In Process</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Deployed">Deployed</option>
                        <option value="Closed">Closed</option>
                    </select>
                </label>
                <button type="submit">Create Ticket</button>
            </form>
            <div className="filter">
                Filter by Position:
                <label className='pas'>
                    <input type="radio" name="filter" value="All" checked={filter === 'All'} onChange={handleFilterChange} />
                    All
                </label>
                <label className='pas'>
                    <input type="radio" name="filter" value="Assigned" checked={filter === 'Assigned'} onChange={handleFilterChange} />
                    Assigned
                </label>
                <label className='pas'>
                    <input type="radio" name="filter" value="In Process" checked={filter === 'In Process'} onChange={handleFilterChange} />
                    In Process
                </label>
                <label className='pas'>
                    <input type="radio" name="filter" value="Deployed" checked={filter === 'Deployed'} onChange={handleFilterChange} />
                    Deployed
                </label>
                <label className='pas'>
                    <input type="radio" name="filter" value="Resolved" checked={filter === 'Resolved'} onChange={handleFilterChange} />
                    Resolved
                </label>
                <label className='pas'>
                    <input type="radio" name="filter" value="Closed" checked={filter === 'Closed'} onChange={handleFilterChange} />
                    Closed
                </label>
            </div>
            <div className="dashboard">
                {/* <div className="section" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'Assigned')} > */}
                <div className="ticket-table">
                    {tickets.filter((ticket) => filter === 'All' || ticket.position === filter).map((ticket) => (
                        <div key={ticket.id} className='ticket' >
                            <div className="row">
                                <div className="col-30">{ticket.customer}</div>
                                <div className="col-30">{ticket.title}</div>
                                <div className="col-30">{ticket.sheet}</div>
                                <div className="col-30">{ticket.position}</div>
                                <div className="col-30">
                                    <button onClick={() => handleDelete(ticket.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default App;

