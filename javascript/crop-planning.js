// Crop Planning Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
    setupIrrigationControls();
});

// Calendar functionality
let currentDate = new Date();

function initializeCalendar() {
    updateCalendar();
}

function updateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthElement = document.getElementById('currentMonth');
    
    // Clear previous calendar
    calendarGrid.innerHTML = '';
    
    // Set month title
    currentMonthElement.textContent = currentDate.toLocaleString('default', { 
        month: 'long', 
        year: 'numeric' 
    });
    
    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-date';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateElement = document.createElement('div');
        dateElement.className = 'calendar-date';
        dateElement.textContent = day;
        
        // Add planting activities (simulated)
        if (day === 1 || day === 6 || day === 15) {
            dateElement.classList.add('planting');
            const activityTag = document.createElement('span');
            activityTag.className = 'activity-tag';
            activityTag.textContent = 'Plant Tomatoes';
            dateElement.appendChild(activityTag);
        }
        
        // Add harvest activities (simulated)
        if (day === 20 || day === 25) {
            dateElement.classList.add('harvest');
            const activityTag = document.createElement('span');
            activityTag.className = 'activity-tag';
            activityTag.textContent = 'Harvest Wheat';
            dateElement.appendChild(activityTag);
        }
        
        calendarGrid.appendChild(dateElement);
    }
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    updateCalendar();
}

// Planting date calculator
function calculatePlantingDate() {
    const cropType = document.getElementById('cropType').value;
    const plantingDates = document.getElementById('plantingDates');
    
    const recommendations = {
        tomato: {
            dates: 'March 15 - April 10',
            soil: 'Well-drained, pH 6.0-6.8',
            spacing: '24-36 inches between plants'
        },
        corn: {
            dates: 'April 5 - May 1',
            soil: 'Rich, well-drained, pH 6.0-6.8',
            spacing: '8-12 inches between plants'
        },
        wheat: {
            dates: 'October 10 - November 5',
            soil: 'Well-drained, pH 6.0-7.0',
            spacing: '1-2 inches between seeds'
        },
        soybean: {
            dates: 'May 1 - May 20',
            soil: 'Well-drained, pH 6.0-7.0',
            spacing: '2-4 inches between plants'
        }
    };
    
    const crop = recommendations[cropType];
    
    plantingDates.innerHTML = `
        <h4>Optimal Planting Period</h4>
        <p><strong>Dates:</strong> ${crop.dates}</p>
        <p><strong>Soil Requirements:</strong> ${crop.soil}</p>
        <p><strong>Plant Spacing:</strong> ${crop.spacing}</p>
        <div class="alert alert-success">
            <i class="fas fa-check-circle"></i>
            Based on your location and current soil conditions, these dates are optimal for maximum yield.
        </div>
    `;
}

// Irrigation controls
function setupIrrigationControls() {
    // Simulate moisture level changes
    setInterval(() => {
        const moistureValue = document.getElementById('moistureValue');
        const moistureFill = document.querySelector('.moisture-fill');
        
        // Random moisture fluctuation for simulation
        const currentMoisture = parseInt(moistureValue.textContent);
        const change = Math.random() * 10 - 5; // -5 to +5
        let newMoisture = Math.max(30, Math.min(85, currentMoisture + change));
        
        moistureValue.textContent = Math.round(newMoisture) + '%';
        moistureFill.style.width = newMoisture + '%';
        
        // Change color based on moisture level
       if (newMoisture < 40) {
    moistureFill.style.background = getComputedStyle(document.documentElement).getPropertyValue('--danger');
} else if (newMoisture < 60) {
    moistureFill.style.background = getComputedStyle(document.documentElement).getPropertyValue('--warning');
} else {
    moistureFill.style.background = getComputedStyle(document.documentElement).getPropertyValue('--info');
}
    }, 5000);
}

function startIrrigation() {
    alert('Irrigation system started! Watering fields for optimal moisture levels.');
    // In a real application, this would trigger IoT devices
}

function stopIrrigation() {
    alert('Irrigation system stopped.');
    // In a real application, this would stop IoT devices
}