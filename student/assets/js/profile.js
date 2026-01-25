// Profile Wizard JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Login email for validation/prefill
  const loginEmail = (localStorage.getItem('ch_email') || '').trim();
  // DOM Elements
  const wizardSteps = document.querySelectorAll('.wizard-steps li');
  const formSteps = document.querySelectorAll('.form-step');
  const prevBtn = document.querySelector('.prev-step');
  const nextBtn = document.querySelector('.next-step');
  const stepInfo = document.querySelector('.current-step');
  const stepTitle = document.querySelector('.step-title');
  const finalActions = document.querySelector('.final-actions');
  const form = document.getElementById('profileForm');
  const saveBtn = form?.querySelector('.save-btn');
  const resetBtn = form?.querySelector('[type="reset"]');
  const overviewBtn = document.getElementById('btn-overview');
  
  // Wizard State
  let currentStep = 1;
  const totalSteps = 8;
  const formData = new Map();
  
  // Step titles mapping
  const stepTitles = {
    1: 'Personal Information',
    2: 'Academic Details',
    3: 'Links & Skills',
    4: 'Demographics',
    5: 'Address Details',
    6: 'Family & Emergency Contact',
    7: 'Identification Details',
    8: 'Placement Preferences'
  };
  
  // Initialize wizard
  function initWizard() {
    if (!form) return;
    
    // Load saved data from localStorage if exists
    loadSavedData();

    // Prefill from previously submitted profile (if available)
    prefillFromSavedProfile();

    // Prefill email with login email (if present) and empty
    const emailInput = form.querySelector('#email');
    if (emailInput && loginEmail && !emailInput.value) {
      emailInput.value = loginEmail;
    }
    // Revalidate on email input to reflect mismatch messages
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        clearFieldError(emailInput);
      });
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize UI
    updateUI();
  }
  
  // Set up all event listeners
  function setupEventListeners() {
    // Navigation buttons
    if (nextBtn) nextBtn.addEventListener('click', goToNextStep);
    if (prevBtn) prevBtn.addEventListener('click', goToPrevStep);
    
    // Step click navigation
    wizardSteps.forEach(step => {
      step.addEventListener('click', function() {
        const stepNum = parseInt(this.dataset.step);
        if (stepNum <= currentStep) {
          goToStep(stepNum);
        }
      });
    });
    
    // Form submission
    if (form) {
      form.addEventListener('submit', handleFormSubmit);
    }
    
    // Form reset
    if (resetBtn) {
      resetBtn.addEventListener('click', handleFormReset);
    }
    
    // Overview button
    if (overviewBtn) {
      overviewBtn.addEventListener('click', goToOverview);
    }
    
    // Auto-save on input change
    form?.addEventListener('input', debounce(saveCurrentStepData, 1000));
    
    // Enter key navigation (except in textareas)
    form?.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (!e.target.closest('.final-actions')) {
          goToNextStep();
        }
      }
    });
  }
  
  // Update UI based on current step
  function updateUI() {
    // Update progress steps
    wizardSteps.forEach(step => {
      const stepNum = parseInt(step.dataset.step);
      step.classList.remove('active', 'completed');
      
      if (stepNum < currentStep) {
        step.classList.add('completed');
      } else if (stepNum === currentStep) {
        step.classList.add('active');
      }
    });
    
    // Show/hide form steps
    formSteps.forEach(step => {
      const stepNum = parseInt(step.dataset.step);
      if (stepNum === currentStep) {
        step.classList.add('active');
        step.removeAttribute('hidden');
      } else {
        step.classList.remove('active');
        step.setAttribute('hidden', 'true');
      }
    });
    
    // Update navigation buttons
    if (prevBtn) prevBtn.disabled = currentStep === 1;
    
    if (nextBtn) {
      if (currentStep === totalSteps) {
        nextBtn.innerHTML = 'Review & Finish <i class="ph ph-check"></i>';
        nextBtn.classList.add('finish-step');
        if (finalActions) finalActions.removeAttribute('hidden');
      } else {
        nextBtn.innerHTML = 'Next <i class="ph ph-arrow-right"></i>';
        nextBtn.classList.remove('finish-step');
        if (finalActions) finalActions.setAttribute('hidden', 'true');
      }
    }
    
    // Update step info
    if (stepInfo) stepInfo.textContent = `Step ${currentStep} of ${totalSteps}`;
    if (stepTitle) stepTitle.textContent = stepTitles[currentStep] || '';
    
    // Load saved data for current step
    loadStepData(currentStep);
    
    // Scroll to top of form
    setTimeout(() => {
      const card = document.querySelector('.card');
      if (card) card.scrollTop = 0;
    }, 100);
  }
  
  // Validate current step
  function validateCurrentStep() {
    const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (!currentStepEl) return true;
    
    const requiredFields = currentStepEl.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      // Clear previous error messages
      clearFieldError(field);
      
      // Validate based on field type
      let fieldValid = true;
      let customMessage = '';
      
      if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        fieldValid = field.value.trim() && emailRegex.test(field.value);
        // Must match login email if we have one
        if (fieldValid && loginEmail) {
          const entered = field.value.trim().toLowerCase();
          const expected = loginEmail.toLowerCase();
          if (entered !== expected) {
            fieldValid = false;
            customMessage = `Email must match your login email (${loginEmail})`;
          }
        }
      } else if (field.type === 'tel') {
        const phoneRegex = /^[0-9]{10}$/;
        fieldValid = field.value.trim() && phoneRegex.test(field.value.replace(/\D/g, ''));
      } else if (field.hasAttribute('pattern')) {
        const pattern = new RegExp(field.getAttribute('pattern'));
        fieldValid = field.value.trim() && pattern.test(field.value);
      } else {
        fieldValid = field.value.trim() !== '';
      }
      
      if (!fieldValid) {
        isValid = false;
        showFieldError(field, customMessage || getFieldErrorMessage(field));
      }
    });
    
    return isValid;
  }
  
  // Show field error message
  function showFieldError(field, message) {
    field.classList.add('invalid');
    
    const errorMsg = document.createElement('span');
    errorMsg.className = 'error-message';
    errorMsg.textContent = message;
    
    const parent = field.parentNode;
    parent.appendChild(errorMsg);
  }
  
  // Clear field error
  function clearFieldError(field) {
    field.classList.remove('invalid');
    
    const parent = field.parentNode;
    const errorMsg = parent.querySelector('.error-message');
    if (errorMsg) errorMsg.remove();
  }
  
  // Get appropriate error message for field type
  function getFieldErrorMessage(field) {
    if (field.type === 'email') return 'Please enter a valid email address';
    if (field.type === 'tel') return 'Please enter a valid 10-digit phone number';
    if (field.id === 'pincode') return 'Please enter a valid 6-digit pincode';
    if (field.id === 'aadharNumber') return 'Please enter a valid Aadhar number';
    if (field.id === 'panNumber') return 'Please enter a valid PAN number';
    return 'This field is required';
  }
  
  // Go to specific step
  function goToStep(stepNum) {
    if (stepNum >= 1 && stepNum <= totalSteps) {
      currentStep = stepNum;
      updateUI();
    }
  }
  
  // Go to next step
  function goToNextStep() {
    if (validateCurrentStep()) {
      saveCurrentStepData();
      
      if (currentStep < totalSteps) {
        currentStep++;
        updateUI();
      } else {
        // Final step - show review modal or confirmation
        showReviewModal();
      }
    } else {
      showNotification('Please fill all required fields correctly before proceeding.', 'error');
    }
  }
  
  // Go to previous step
  function goToPrevStep() {
    if (currentStep > 1) {
      currentStep--;
      updateUI();
    }
  }
  
  // Save current step data
  function saveCurrentStepData() {
    const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (!currentStepEl) return;
    
    const stepData = {};
    const inputs = currentStepEl.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      if (input.name) {
        stepData[input.name] = input.type === 'checkbox' ? input.checked : input.value;
      }
    });
    
    formData.set(`step${currentStep}`, stepData);
    saveToLocalStorage();
  }
  
  // Load data for specific step
  function loadStepData(stepNum) {
    const stepData = formData.get(`step${stepNum}`);
    if (!stepData) return;
    
    const stepEl = document.querySelector(`.form-step[data-step="${stepNum}"]`);
    if (!stepEl) return;
    
    const inputs = stepEl.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      if (input.name && stepData[input.name] !== undefined) {
        if (input.type === 'checkbox') {
          input.checked = stepData[input.name];
        } else {
          input.value = stepData[input.name];
        }
      }
    });
  }
  
  // Save to localStorage
  function saveToLocalStorage() {
    try {
      const data = Object.fromEntries(formData);
      localStorage.setItem('profileWizardData', JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }
  
  // Load from localStorage
  function loadSavedData() {
    try {
      const saved = localStorage.getItem('profileWizardData');
      if (saved) {
        const data = JSON.parse(saved);
        Object.keys(data).forEach(key => {
          formData.set(key, data[key]);
        });
      }
    } catch (e) {
      console.warn('Could not load from localStorage:', e);
    }
  }
  
  // Handle form submission
  async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate all steps first
    let allValid = true;
    for (let i = 1; i <= totalSteps; i++) {
      const stepEl = document.querySelector(`.form-step[data-step="${i}"]`);
      if (!stepEl) continue;
      
      const requiredFields = stepEl.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          allValid = false;
        }
      });
    }
    
    if (!allValid) {
      showNotification('Please complete all required fields before submitting.', 'error');
      
      // Find first incomplete step
      for (let i = 1; i <= totalSteps; i++) {
        const stepEl = document.querySelector(`.form-step[data-step="${i}"]`);
        if (!stepEl) continue;
        
        const requiredFields = stepEl.querySelectorAll('[required]');
        let stepValid = true;
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) stepValid = false;
        });
        
        if (!stepValid) {
          currentStep = i;
          updateUI();
          break;
        }
      }
      return;
    }
    
    // Collect all form data
    const formDataObj = new FormData(form);
    const data = Object.fromEntries(formDataObj.entries());
    
    // Show loading state
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerHTML = '<i class="ph ph-circle-notch spin"></i><span>Saving...</span>';
      saveBtn.classList.add('loading');
    }
    
    try {
      // Here you would typically send data to server
      // For now, simulate API call
      await simulateApiCall(data);

      // Persist a normalized profile for profile-view plus full form data
      const profile = {
        ...data,
        program: data.degree || data.program || ''
      };
      try {
        localStorage.setItem('ch_profile', JSON.stringify(profile));
      } catch (_) {}
      
      showNotification('Profile saved successfully!', 'success');
      
      // Clear wizard cache on successful save
      localStorage.removeItem('profileWizardData');
      formData.clear();
      
      // Redirect to profile view after brief success toast
      setTimeout(() => {
        try { window.location.href = 'profile-view.html'; } catch (_) {}
      }, 1000);
      
    } catch (error) {
      showNotification('Failed to save profile. Please try again.', 'error');
      
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = '<i class="ph ph-floppy-disk"></i><span>Save Profile</span>';
        saveBtn.classList.remove('loading');
      }
    }
  }
  
  // Handle form reset
  function handleFormReset() {
    if (confirm('Are you sure you want to reset all form data? This cannot be undone.')) {
      formData.clear();
      localStorage.removeItem('profileWizardData');
      currentStep = 1;
      updateUI();
      showNotification('Form has been reset.', 'info');
    }
  }
  
  // Go to overview
  function goToOverview() {
    try { window.location.href = 'profile-view.html'; } catch (_) {}
  }
  
  // Show review modal
  function showReviewModal() {
    const modal = document.createElement('div');
    modal.className = 'review-modal';
    modal.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <h3>Review Your Profile</h3>
        <div class="review-summary">
          <p>Please review all your information before submitting.</p>
          <div class="review-steps"></div>
        </div>
        <div class="modal-actions">
          <button class="btn ghost" id="editProfile">Edit Profile</button>
          <button class="btn primary" id="submitProfile">Submit Profile</button>
        </div>
      </div>
    `;
    
    // Populate review steps
    const reviewSteps = modal.querySelector('.review-steps');
    for (let i = 1; i <= totalSteps; i++) {
      const stepData = formData.get(`step${i}`);
      if (stepData) {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'review-step';
        stepDiv.innerHTML = `
          <h4>${stepTitles[i]}</h4>
          <pre>${JSON.stringify(stepData, null, 2)}</pre>
        `;
        reviewSteps.appendChild(stepDiv);
      }
    }
    
    document.body.appendChild(modal);
    
    // Event listeners for modal
    modal.querySelector('#editProfile').addEventListener('click', () => {
      modal.remove();
    });
    
    modal.querySelector('#submitProfile').addEventListener('click', () => {
      form.dispatchEvent(new Event('submit'));
      modal.remove();
    });
    
    modal.querySelector('.modal-backdrop').addEventListener('click', () => {
      modal.remove();
    });
    
    // Add CSS for modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
      .review-modal {
        position: fixed;
        inset: 0;
        z-index: 1000;
      }
      .modal-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
      }
      .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 24px;
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
      }
      .review-summary {
        margin: 16px 0;
      }
      .review-step {
        background: var(--panel-2);
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 12px;
      }
      .review-step h4 {
        margin: 0 0 8px 0;
        font-size: 14px;
        color: var(--text);
      }
      .review-step pre {
        margin: 0;
        font-size: 12px;
        color: var(--muted);
        white-space: pre-wrap;
      }
      .modal-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        margin-top: 20px;
      }
    `;
    document.head.appendChild(modalStyle);
  }
  
  // Show notification
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add CSS for notification
    const style = document.createElement('style');
    style.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 16px;
        border-radius: 8px;
        background: var(--panel);
        border: 1px solid var(--border);
        box-shadow: var(--card-shadow);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
      }
      .notification.success {
        border-color: var(--success);
        background: rgba(76, 175, 80, 0.1);
      }
      .notification.error {
        border-color: var(--error);
        background: rgba(244, 67, 54, 0.1);
      }
      .notification.info {
        border-color: var(--primary);
        background: rgba(33, 150, 243, 0.1);
      }
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // Prefill form fields from saved profile (localStorage 'ch_profile')
  function prefillFromSavedProfile() {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem('ch_profile') || 'null'); } catch (_) {}
    if (!saved || !form) return;

    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const name = input.name;
      if (!name) return;
      let val = saved[name];
      // support alias mapping
      if (val === undefined && name === 'degree') {
        val = saved.program;
      }
      if (val === undefined) return;
      if (input.type === 'checkbox') {
        input.checked = !!val && val !== 'false' && val !== '0';
      } else {
        input.value = val;
      }
    });

    // Update wizard cache to reflect prefilled values
    const originalStep = currentStep;
    for (let i = 1; i <= totalSteps; i++) {
      currentStep = i;
      saveCurrentStepData();
    }
    currentStep = originalStep;
  }
  
  // Debounce function for auto-save
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Simulate API call
  function simulateApiCall(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 500);
    });
  }
  
  // Add spin animation for loading icons
  const spinStyle = document.createElement('style');
  spinStyle.textContent = `
    .ph.spin {
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(spinStyle);
  
  // Initialize the wizard
  initWizard();
});