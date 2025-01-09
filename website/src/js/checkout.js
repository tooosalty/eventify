fetch('/website/src/php/process_payment.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `booking_id=${encodeURIComponent(bookingId)}&amount=${encodeURIComponent(amount)}`,
})
.then(response => {
    if (!response.ok) throw new Error('Payment failed');
    return response.json();
})
.then(data => {
    alert('Payment processed successfully!');
})
.catch(error => {
    console.error('Error processing payment:', error);
    alert('Payment failed: ' + error.message);
});

// Check authentication status
auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = '/src/pages/login.html';
    }
});

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Calculate fees and total
function calculatePrices(basePrice) {
    const serviceFee = basePrice * 0.1; // 10% service fee
    const tax = (basePrice + serviceFee) * 0.08; // 8% tax
    const total = basePrice + serviceFee + tax;

    return {
        basePrice,
        serviceFee,
        tax,
        total
    };
}

async function initializeCheckout() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    if (!eventId) {
        window.location.href = '/src/pages/events.html';
        return;
    }

    try {
        const eventDoc = await getDoc(doc(db, 'events', eventId));
        if (eventDoc.exists()) {
            const event = eventDoc.data();
            displayEventSummary(event);
            setupPaymentForm(event, eventId);
            initializePaymentMethods();
            setupFormValidation();
        } else {
            window.location.href = '/src/pages/events.html';
        }
    } catch (error) {
        console.error('Error initializing checkout:', error);
    }
}

function displayEventSummary(event) {
    const summaryContainer = document.getElementById('eventSummary');
    if (!summaryContainer) return;

    const prices = calculatePrices(event.price);

    summaryContainer.innerHTML = `
        <div class="event-summary">
            <img src="${event.image}" alt="${event.title}" class="event-thumbnail">
            <div class="summary-details">
                <h3>${event.title}</h3>
                <div class="summary-meta">
                    <p>📅 ${new Date(event.date).toLocaleDateString()}</p>
                    <p>📍 ${event.location}</p>
                </div>
            </div>
        </div>
    `;

    // Update price breakdown
    document.getElementById('ticketPrice').textContent = formatCurrency(prices.basePrice);
    document.getElementById('serviceFee').textContent = formatCurrency(prices.serviceFee);
    document.getElementById('tax').textContent = formatCurrency(prices.tax);
    document.getElementById('totalPrice').textContent = formatCurrency(prices.total);
}

function initializePaymentMethods() {
    const methods = document.querySelectorAll('.payment-method');
    methods.forEach(method => {
        method.addEventListener('click', () => {
            methods.forEach(m => m.classList.remove('active'));
            method.classList.add('active');
        });
    });
}

function setupFormValidation() {
    const form = document.getElementById('paymentForm');
    const cardNumber = document.getElementById('cardNumber');
    const expiry = document.getElementById('expiry');
    const cvv = document.getElementById('cvv');

    // Format card number
    cardNumber.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 16);
    });

    // Format expiry date
    expiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });

    // Format CVV
    cvv.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
}

function setupPaymentForm(event, eventId) {
    const form = document.getElementById('paymentForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        button.textContent = 'Processing...';

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Create ticket record
            const ticketRef = doc(collection(db, 'tickets'));
            await setDoc(ticketRef, {
                eventId: eventId,
                userId: auth.currentUser.uid,
                purchaseDate: new Date().toISOString(),
                eventDetails: {
                    title: event.title,
                    date: event.date,
                    price: event.price
                },
                status: 'completed'
            });

            // Show success message and redirect
            alert('Purchase successful! Redirecting to your profile...');
            window.location.href = '/src/pages/profile.html';
        } catch (error) {
            alert('Purchase failed: ' + error.message);
            button.disabled = false;
            button.textContent = 'Complete Purchase';
        }
    });
}

// Initialize checkout page
document.addEventListener('DOMContentLoaded', initializeCheckout);