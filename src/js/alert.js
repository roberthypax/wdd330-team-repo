import alerts from './alerts.json';

class Alert {
    constructor() {
        this.alerts = alerts;
    }

    createAlerts() {
        const section = document.createElement('section');
        section.className = 'alert-list';

        this.alerts.forEach(alert => {
            const p = document.createElement('p');
            p.textContent = alert.message;
            p.style.background = alert.background;
            p.style.color = alert.color;

            section.appendChild(p);
        });

        return section;
    }
}

export default Alert;