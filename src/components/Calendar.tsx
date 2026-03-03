'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CalendarProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
  label?: string;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange, label = "Date of Event *" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handlePrevYear = () => {
    setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1));
  };

  const handleNextYear = () => {
    setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onDateChange(newDate);
    setIsOpen(false);
  };

  const renderDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    
    // Adjust startDay for Monday as first day (0 = Monday, 6 = Sunday)
    // Original: 0=Sun, 1=Mon... 6=Sat
    // Target: 0=Mon, 1=Tue... 6=Sun
    const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;

    const days = [];
    for (let i = 0; i < adjustedStartDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8 sm:h-10 sm:w-10"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const isSelected = selectedDate?.getDate() === day && 
                         selectedDate?.getMonth() === month && 
                         selectedDate?.getFullYear() === year;
      
      const isToday = new Date().getDate() === day && 
                      new Date().getMonth() === month && 
                      new Date().getFullYear() === year;

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateClick(day)}
          className={`h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full text-[10px] sm:text-sm transition-all
            ${isSelected ? 'bg-primary text-black font-bold' : isToday ? 'text-primary font-bold' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="relative w-full" ref={calendarRef}>
      <div className="space-y-3">
        <label className="text-[11px] uppercase tracking-[0.3em] text-primary">
          {label}
        </label>
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-transparent border-b border-white/20 py-3 focus:border-primary outline-none transition-all duration-300 text-white cursor-pointer pl-2 flex justify-between items-center"
        >
          <span>{selectedDate ? formatDate(selectedDate) : "Select Date"}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-2xl p-4 sm:p-6 w-[280px] sm:w-[350px] left-0 sm:left-auto sm:right-0 lg:left-0 border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button type="button" onClick={handlePrevMonth} className="text-gray-400 hover:text-black p-1">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <span className="text-sm sm:text-lg font-medium text-gray-800 w-16 sm:w-24 text-center">
                {months[viewDate.getMonth()]}
              </span>
              <button type="button" onClick={handleNextMonth} className="text-gray-400 hover:text-black p-1">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <button type="button" onClick={handlePrevYear} className="text-gray-400 hover:text-black p-1">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <span className="text-sm sm:text-lg font-medium text-gray-800">
                {viewDate.getFullYear()}
              </span>
              <button type="button" onClick={handleNextYear} className="text-gray-400 hover:text-black p-1">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-1 mb-2 sm:mb-4">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
              <div key={day} className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center text-[10px] sm:text-sm font-semibold text-gray-800">
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {renderDays()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
