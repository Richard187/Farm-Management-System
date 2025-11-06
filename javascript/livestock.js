// Livestock Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeLivestockMonitoring();
    setupHealthAlerts();
});

function initializeLivestockMonitoring() {
    // Simulate real-time health monitoring
    setInterval(() => {
        updateHealthIndicators();
        updateProductionData();
    }, 3000);
}

function updateHealthIndicators() {
    const healthBars = document.querySelectorAll('.health-bar');
    
    healthBars.forEach(bar => {
        const currentWidth = parseInt(bar.style.width);
        const fluctuation = Math.random() * 4 - 2; // -2% to +2%
        let newWidth = Math.max(75, Math.min(98, (currentWidth || 90) + fluctuation));
        
        bar.style.width = newWidth + '%';
        
        // Update color based on health
        if (newWidth < 80) {
            bar.style.background = 'var(--danger)';
        } else if (newWidth < 90) {
            bar.style.background = 'var(--warning)';
        } else {
            bar.style.background = 'var(--primary)';
        }
    });
}

function updateProductionData() {
    // Simulate production data fluctuations
    const productionItems = document.querySelectorAll('.data-item span:last-child');
    
    productionItems.forEach(item => {
        const currentValue = item.textContent;
        
        if (currentValue.includes('gal/day')) {
            const currentGallons = parseFloat(currentValue);
            const change = (Math.random() * 0.4 - 0.2); // -0.2 to +0.2
            const newGallons = Math.max(5.5, Math.min(7.0, currentGallons + change));
            item.textContent = newGallons.toFixed(1) + ' gal/day';
        }
        else if (currentValue.includes('lbs/day')) {
            const currentWeight = parseFloat(currentValue);
            const change = (Math.random() * 0.3 - 0.15); // -0.15 to +0.15
            const newWeight = Math.max(1.5, Math.min(2.2, currentWeight + change));
            item.textContent = newWeight.toFixed(1) + ' lbs/day';
        }
    });
}

function setupHealthAlerts() {
    // Random health alerts simulation
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance of alert
            showHealthAlert();
        }
    }, 15000);
}

function showHealthAlert() {
    const alertTypes = [
        { type: 'temperature', message: 'Elevated temperature detected in dairy cattle barn', severity: 'warning' },
        { type: 'feeding', message: 'Irregular feeding pattern detected in swine unit', severity: 'warning' },
        { type: 'activity', message: 'Reduced activity levels in poultry house', severity: 'warning' }
    ];
    
    const alert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    
    // Create alert notification
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-status ${alert.severity}`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '100px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '1000';
    alertDiv.style.maxWidth = '300px';
    alertDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${alert.message}</span>
        <button onclick="this.parentElement.remove()" style="margin-left: auto; background: none; border: none; color: inherit; cursor: pointer;">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.remove();
        }
    }, 10000);
}

function showCattleDetails() {
    alert('Dairy Cattle Details:\n\n• Total Head: 42\n• Milking: 38\n• Calves: 4\n• Avg. Milk Production: 6.2 gal/day\n• Health Score: 92%\n• Next Vet Visit: May 15, 2023');
}

function showPoultryDetails() {
    alert('Poultry Details:\n\n• Laying Hens: 125\n• Daily Eggs: 112\n• Production Rate: 89%\n• Feed Consumption: 25 lbs/day\n• Health Score: 95%\n• Next Rotation: April 28, 2023');
}

function showSwineDetails() {
    alert('Swine Details:\n\n• Total Head: 68\n• Sows: 12\n• Piglets: 56\n• Avg. Weight Gain: 1.8 lbs/day\n• Health Score: 88%\n• Next Weaning: May 5, 2023');
}

// Feed scheduling functionality
function scheduleFeeding(animalType, time, amount) {
    const now = new Date();
    const scheduledTime = new Date();
    const [hours, minutes] = time.split(':');
    scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    if (scheduledTime > now) {
        const timeUntilFeeding = scheduledTime - now;
        
        setTimeout(() => {
            alert(`Feeding time for ${animalType}! Dispensing ${amount} of feed.`);
            // In a real application, this would trigger automated feeding systems
        }, timeUntilFeeding);
        
        return `Feeding scheduled for ${animalType} at ${time}`;
    } else {
        return 'Please schedule feeding for a future time';
    }
}