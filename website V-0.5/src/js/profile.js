import { db, auth } from './firebase-config.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Check authentication status
auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = '/src/pages/login.html';
    } else {
        displayUserInfo(user);
        loadUserTickets(user.uid);
        loadUserStats(user.uid);
    }
});

function displayUserInfo(user) {
    const userInfoContainer = document.getElementById('userInfo');
    if (!userInfoContainer) return;

    const initials = user.email.substring(0, 2).toUpperCase();
    
    userInfoContainer.innerHTML = `
        <div class="profile-avatar">${initials}</div>
        <div class="profile-details">
            <h1>Welcome, ${user.email.split('@')[0]}</h1>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Member since:</strong> ${new Date(user.metadata.creationTime).toLocaleDateString()}</p>
            <div class="profile-stats">
                <div class="stat-item">
                    <div class="stat-value" id="ticketsCount">0</div>
                    <div class="stat-label">Tickets Purchased</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="totalSpent">$0</div>
                    <div class="stat-label">Total Spent</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value" id="upcomingEvents">0</div>
                    <div class="stat-label">Upcoming Events</div>
                </div>
            </div>
        </div>
    `;
}

async function loadUserStats(userId) {
    try {
        const ticketsRef = collection(db, 'tickets');
        const q = query(ticketsRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        let totalSpent = 0;
        let upcomingEvents = 0;
        const today = new Date();

        querySnapshot.forEach((doc) => {
            const ticket = doc.data();
            totalSpent += ticket.eventDetails.price;
            if (new Date(ticket.eventDetails.date) >= today) {
                upcomingEvents++;
            }
        });

        document.getElementById('ticketsCount').textContent = querySnapshot.size;
        document.getElementById('totalSpent').textContent = `$${totalSpent}`;
        document.getElementById('upcomingEvents').textContent = upcomingEvents;
    } catch (error) {
        console.error('Error loading user stats:', error);
    }
}

async function loadUserTickets(userId) {
    const ticketsContainer = document.getElementById('ticketsList');
    if (!ticketsContainer) return;

    try {
        const ticketsRef = collection(db, 'tickets');
        const q = query(ticketsRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        const tickets = [];
        querySnapshot.forEach((doc) => {
            tickets.push({ id: doc.id, ...doc.data() });
        });

        displayTickets(tickets);
    } catch (error) {
        console.error('Error loading tickets:', error);
    }
}

function displayTickets(tickets) {
    const ticketsContainer = document.getElementById('ticketsList');
    if (!ticketsContainer) return;

    if (tickets.length === 0) {
        ticketsContainer.innerHTML = `
            <div class="empty-state">
                <h3>No tickets yet</h3>
                <p>Start exploring events and book your first ticket!</p>
                <a href="/src/pages/events.html" class="ticket-button">Browse Events</a>
            </div>
        `;
        return;
    }

    const today = new Date();
    const upcomingTickets = tickets.filter(ticket => new Date(ticket.eventDetails.date) >= today);
    const pastTickets = tickets.filter(ticket => new Date(ticket.eventDetails.date) < today);

    ticketsContainer.innerHTML = `
        <div class="content-section">
            <div class="section-header">
                <h2 class="section-title">Upcoming Events</h2>
            </div>
            <div class="ticket-grid">
                ${upcomingTickets.map(ticket => createTicketCard(ticket, true)).join('')}
            </div>
        </div>
        
        <div class="content-section">
            <div class="section-header">
                <h2 class="section-title">Past Events</h2>
            </div>
            <div class="ticket-grid">
                ${pastTickets.map(ticket => createTicketCard(ticket, false)).join('')}
            </div>
        </div>
    `;
}

function createTicketCard(ticket, isUpcoming) {
    return `
        <div class="ticket-card">
            <div class="ticket-header">
                <h3>${ticket.eventDetails.title}</h3>
            </div>
            <div class="ticket-body">
                <div class="ticket-info">
                    <p><strong>Date:</strong> ${new Date(ticket.eventDetails.date).toLocaleDateString()}</p>
                    <p><strong>Purchase Date:</strong> ${new Date(ticket.purchaseDate).toLocaleDateString()}</p>
                    <p><strong>Price:</strong> $${ticket.eventDetails.price}</p>
                </div>
            </div>
            <div class="ticket-actions">
                ${isUpcoming ? `
                    <a href="/src/pages/event-details.html?id=${ticket.eventId}" class="ticket-button">View Event</a>
                ` : `
                    <span class="ticket-status">Event Completed</span>
                `}
            </div>
        </div>
    `;
}