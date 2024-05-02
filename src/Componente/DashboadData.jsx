// App.js

import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    // State to manage tickets
    const [tickets, setTickets] = useState([]);
    // State to manage form data
    const [formData, setFormData] = useState({ customer: '', title: '', position: 'Assigned' });

    // Load tickets from local storage on initial render
    useEffect(() => {
        const savedTickets = JSON.parse(localStorage.getItem('tickets'));
        if (savedTickets) {
            setTickets(savedTickets);
        }
    }, []);

    // Save tickets to local storage whenever tickets state changes
    useEffect(() => {
        localStorage.setItem('tickets', JSON.stringify(tickets));
    }, [tickets]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTicket = { ...formData, id: Date.now().toString() };
        setTickets([...tickets, newTicket]);
        setFormData({ customer: '', title: '', position: 'Assigned' });
    };

    // Handle drag over event
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Handle drop event to update ticket position
    const handleDrop = (e, position) => {
        const id = e.dataTransfer.getData('text/plain');
        const updatedTickets = tickets.map((ticket) => {
            if (ticket.id === id) {
                return { ...ticket, position };
            }
            return ticket;
        });
        setTickets(updatedTickets);
    };

    // Handle form input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('text/plain', id);
    };
    return (
        <div className="App">
            <h1>Ticket Management System</h1>
            {/* Ticket creation form */}
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
            {/* Ticket dashboard */}
            <div className="dashboard">
                <div className="section" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'Assigned')}>
                    <h2>Assigned</h2>
                    {tickets.map((ticket) => {
                        if (ticket.position === 'Assigned') {
                            return (
                                <div key={ticket.id} draggable onDragStart={(e) => handleDragStart(e, ticket.id)}>
                                    <strong>{ticket.title}</strong>
                                    <p>Customer: {ticket.customer}</p>
                                    <p>Position: {ticket.position}</p>

                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="section" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'In Process')}>
                    <h2>In Process</h2>
                    {tickets.map((ticket) => {
                        if (ticket.position === 'In Process') {
                            return (
                                <div key={ticket.id} draggable onDragStart={(e) => handleDragStart(e, ticket.id)}>
                                    <strong>{ticket.title}</strong>
                                    <p>Customer: {ticket.customer}</p>
                                    <p>Position: {ticket.position}</p>

                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="section" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'Resolved')}>
                    <h2>Resolved</h2>
                    {tickets.map((ticket) => {
                        if (ticket.position === 'Resolved') {
                            return (
                                <div key={ticket.id} draggable onDragStart={(e) => handleDragStart(e, ticket.id)}>
                                    <strong>{ticket.title}</strong>
                                    <p>Customer: {ticket.customer}</p>
                                    <p>Position: {ticket.position}</p>

                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="section" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'Deployed')}>
                    <h2>Deployed</h2>
                    {tickets.map((ticket) => {
                        if (ticket.position === 'Deployed') {
                            return (
                                <div key={ticket.id} draggable onDragStart={(e) => handleDragStart(e, ticket.id)}>
                                    <strong>{ticket.title}</strong>
                                    <p>Customer: {ticket.customer}</p>
                                    <p>Position: {ticket.position}</p>

                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="section" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, 'Closed')}>
                    <h2>Closed</h2>
                    {tickets.map((ticket) => {
                        if (ticket.position === 'Closed') {
                            return (
                                <div key={ticket.id} draggable >
                                    <strong>{ticket.title}</strong>
                                    <p>Customer: {ticket.customer}</p>
                                    <p>Position: {ticket.position}</p>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </div >
    );
};

export default App;
