import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, ClipboardList, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';

export default function BookingWizard({ isOpen, onClose, tasker }) {
  const [step, setStep] = useState(1); // 1: Details, 2: Schedule, 3: Review, 4: Success
  
  // State variables
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(2);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('morning'); // 'morning' | 'afternoon' | 'evening'
  const [loading, setLoading] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Auto reset state on open/close
  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setDescription('');
      setAddress('');
      setEstimatedHours(2);
      setDate(new Date().toISOString().split('T')[0]); // Default to today
      setTimeSlot('morning');
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen || !tasker) return null;

  // Constants for invoice calculation
  const hourlyRate = tasker.rate;
  const subtotal = hourlyRate * estimatedHours;
  const trustFee = 4.99;
  const total = subtotal + trustFee;

  const nextStep = () => {
    if (step === 1 && (!description || !address)) {
      alert('Please fill in the task details and location.');
      return;
    }
    if (step === 2 && !date) {
      alert('Please choose a date.');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleConfirm = () => {
    setLoading(true);
    // Simulate booking API request
    setTimeout(() => {
      setLoading(false);
      const code = 'TM-' + Math.floor(100000 + Math.random() * 900000);
      setBookingCode(code);
      setStep(4);
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content booking-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close wizard">
          <X size={20} />
        </button>

        {step < 4 && (
          <div className="wizard-header">
            {/* Tasker Mini Summary */}
            <div className="tasker-mini-summary">
              <div 
                className="tasker-avatar-circle mini"
                style={{ backgroundColor: tasker.avatarColor }}
              >
                {tasker.name.split(' ').map(n => n.charAt(0)).join('')}
              </div>
              <div>
                <h4>Book {tasker.name}</h4>
                <p>{tasker.rating}★ • ${tasker.rate}/hr</p>
              </div>
            </div>

            {/* Stepper Progress */}
            <div className="stepper">
              <div className={`step-dot ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>1</div>
              <div className="step-bar"></div>
              <div className={`step-dot ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>2</div>
              <div className="step-bar"></div>
              <div className={`step-dot ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>3</div>
            </div>
          </div>
        )}

        <div className="wizard-body">
          {/* Step 1: Details */}
          {step === 1 && (
            <div className="wizard-step animate-fade-in">
              <h3 className="step-headline">
                <ClipboardList className="step-header-icon" /> Task Description
              </h3>
              
              <div className="form-group">
                <label className="form-label">What do you need help with?</label>
                <textarea 
                  className="form-control"
                  rows={4}
                  placeholder="Describe your task. E.g. 'I have a 3-drawer IKEA chest that needs assembling. All tools & instructions are ready.'"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Service Address</label>
                <div className="input-with-icon">
                  <MapPin className="input-icon" size={18} />
                  <input 
                    type="text" 
                    placeholder="123 Main St, Apartment 4B" 
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Estimated Hours</label>
                <select 
                  className="form-control select-control"
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(h => (
                    <option key={h} value={h}>{h} {h === 1 ? 'hour' : 'hours'} (Estimated)</option>
                  ))}
                </select>
                <span className="form-input-help">Hourly rate: ${tasker.rate}/hr. You will only pay for actual hours worked.</span>
              </div>
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <div className="wizard-step animate-fade-in">
              <h3 className="step-headline">
                <Calendar className="step-header-icon" /> Date & Time
              </h3>

              <div className="form-group">
                <label className="form-label">Select Date</label>
                <input 
                  type="date" 
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Time of Day</label>
                <div className="time-slots-grid">
                  {[
                    { id: 'morning', label: 'Morning', time: '8:00 AM - 12:00 PM' },
                    { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 4:00 PM' },
                    { id: 'evening', label: 'Evening', time: '4:00 PM - 8:00 PM' }
                  ].map(slot => (
                    <button
                      key={slot.id}
                      type="button"
                      className={`time-slot-btn ${timeSlot === slot.id ? 'active' : ''}`}
                      onClick={() => setTimeSlot(slot.id)}
                    >
                      <Clock size={16} />
                      <div className="slot-title">{slot.label}</div>
                      <div className="slot-subtitle">{slot.time}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review Invoice */}
          {step === 3 && (
            <div className="wizard-step animate-fade-in">
              <h3 className="step-headline">Review Your Booking</h3>

              {/* Invoice Table */}
              <div className="booking-summary-box">
                <div className="summary-row header">
                  <span>Billing Breakdown</span>
                </div>
                <div className="summary-row">
                  <span>{tasker.name} (${tasker.rate}/hr × {estimatedHours} hrs)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Trust & Support Fee</span>
                  <span>${trustFee.toFixed(2)}</span>
                </div>
                <div className="summary-row total-row">
                  <span>Estimated Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Schedule and Address summary card */}
              <div className="booking-details-box">
                <div className="detail-meta">
                  <Calendar size={16} />
                  <span>{date} ({timeSlot.toUpperCase()})</span>
                </div>
                <div className="detail-meta">
                  <MapPin size={16} />
                  <span>{address}</span>
                </div>
              </div>

              <p className="booking-disclaimer">
                By clicking "Confirm Booking", your credit card on file will be pre-authorized. Payment is only processed after your task is complete.
              </p>
            </div>
          )}

          {/* Step 4: Success Screen */}
          {step === 4 && (
            <div className="wizard-success animate-scale-up">
              <div className="success-icon-container">
                <CheckCircle2 size={48} className="success-icon" />
              </div>
              <h2>Booking Scheduled!</h2>
              <p className="success-code">Confirmation: <strong>{bookingCode}</strong></p>
              
              <div className="success-info-panel">
                <p>
                  <strong>{tasker.name}</strong> has been notified of your request for <strong>{date}</strong>. 
                  They will review the details and confirm the appointment within 30 minutes.
                </p>
              </div>

              <button 
                type="button" 
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={onClose}
              >
                Go to My Dashboard
              </button>
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        {step < 4 && (
          <div className="wizard-footer">
            {step > 1 ? (
              <button type="button" className="btn btn-outline" onClick={prevStep}>
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
            )}

            {step < 3 ? (
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button 
                type="button" 
                className="btn btn-primary confirm-btn" 
                onClick={handleConfirm}
                disabled={loading}
              >
                {loading ? <span className="spinner"></span> : 'Confirm Booking'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
