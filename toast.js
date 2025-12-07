// Toast Notification System
export class Toast {
  static show(message, type = 'success', duration = 4000) {
    const toastContainer = document.getElementById('toast-container') || this.createContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${this.getIcon(type)}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, duration);
  }

  static createContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  }

  static getIcon(type) {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    return icons[type] || icons.info;
  }

  static success(message, duration = 4000) {
    this.show(message, 'success', duration);
  }

  static error(message, duration = 5000) {
    this.show(message, 'error', duration);
  }

  static warning(message, duration = 4000) {
    this.show(message, 'warning', duration);
  }

  static info(message, duration = 4000) {
    this.show(message, 'info', duration);
  }
}
