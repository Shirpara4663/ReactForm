import React from 'react';

const DateField = ({ day, month, year, error, onChange }) => {
  // Generate options for days (1 to 31)
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  // Generate options for months (January to December)
  const months = Array.from({ length: 12 }, (_, index) => {
    const monthNumber = index + 1;
    return { value: monthNumber, label: monthNumber };
  });
  // Generate options for years (current year - 100 to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);

  return (
    <div className="mb-3">
      <label className="form-label">Birthdate</label>
      <div className="d-flex">
        <select className="form-select me-2" value={day} onChange={(e) => onChange('day', e)}>
          <option value="">Day</option>
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <select className="form-select me-2" value={month} onChange={(e) => onChange('month', e)}>
          <option value="">Month</option>
          {months.map(month => (
            <option key={month.value} value={month.value}>{month.label}</option>
          ))}
        </select>
        <select className="form-select" value={year} onChange={(e) => onChange('year', e)}>
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
