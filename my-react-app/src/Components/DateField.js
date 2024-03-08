import React from 'react';

const DateField = ({ day, month, year, error, onChange }) => {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const months = Array.from({ length: 12 }, (_, index) => {
    const monthNumber = index + 1;
    return { value: monthNumber, label: monthNumber };
  });
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);

  const handleDayChange = (e) => {
    onChange('day', e);
  };

  const handleMonthChange = (e) => {
    onChange('month', e);
  };

  const handleYearChange = (e) => {
    onChange('year', e);
  };

  return (
    <div className="mb-3">
      <label className="form-label">Birthdate</label>
      <div className="d-flex">
        <select className={`form-select me-2 ${error ? 'is-invalid' : ''}`} value={day} onChange={handleDayChange}>
          <option value="">Day</option>
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <select className={`form-select me-2 ${error ? 'is-invalid' : ''}`} value={month} onChange={handleMonthChange}>
          <option value="">Month</option>
          {months.map(month => (
            <option key={month.value} value={month.value}>{month.label}</option>
          ))}
        </select>
        <select className={`form-select ${error ? 'is-invalid' : ''}`} value={year} onChange={handleYearChange}>
          <option value="">Year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default DateField;
