import { useState, useEffect } from 'react';
import { getUpcomingEvents, getPastEvents } from '../utils/vanillaApi';
import type { FormattedEvent } from '../utils/vanillaApi';

const EventCard = ({ event, isUpcoming }: { event: FormattedEvent, isUpcoming: boolean }) => {
  // Get the user's timezone using Intl.DateTimeFormat
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Format time with abbreviated timezone and IANA identifier
  const formatTimeWithTimezone = (date: Date) => {
    // Get just the time
    const time = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: userTimeZone,
    }).format(date);

    // Get abbreviated timezone name
    const timeZoneName = new Intl.DateTimeFormat('en-US', {
      timeZoneName: 'short',
      timeZone: userTimeZone,
    }).formatToParts(date).find(part => part.type === 'timeZoneName')?.value || '';

    return `${time} ${timeZoneName} (${userTimeZone})`;
  };

  // Enhanced calendar date formatting for multi-day events
  const formatCalendarDate = (startDate: Date, endDate: Date) => {
    const startMonth = startDate.toLocaleString('en-US', { month: 'short' });
    const startDay = startDate.getDate();
    const endMonth = endDate.toLocaleString('en-US', { month: 'short' });
    const endDay = endDate.getDate();
    
    // Check if dates are in different months or years
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    
    // Check if it's a multi-day event
    const isMultiDay = startDay !== endDay || startMonth !== endMonth || startYear !== endYear;
    
    // For single-day events
    if (!isMultiDay) {
      return {
        isMultiDay: false,
        display: {
          topLine: startMonth,
          bottomLine: startDay.toString()
        }
      };
    }
    
    // For multi-day events
    return {
      isMultiDay: true,
      display: {
        // Show month range if different months
        topLine: startMonth === endMonth ? startMonth : `${startMonth}-${endMonth}`,
        // Show day range
        bottomLine: `${startDay}-${endDay}`,
        // If different years, show years
        yearDisplay: startYear !== endYear ? `${startYear}-${endYear}` : undefined
      }
    };
  };

  const calculateDuration = (startDate: Date, endDate: Date) => {
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      return `${diffDays} days`;
    } else if (diffDays === 1) {
      return '1 day';
    } else if (diffHours > 1) {
      return `${diffHours} hours`;
    } else if (diffHours === 1) {
      return '1 hour';
    } else if (diffMins > 1) {
      return `${diffMins} minutes`;
    } else {
      return '1 minute';
    }
  };

  const dateInfo = formatCalendarDate(event.startDate, event.endDate);
  const duration = calculateDuration(event.startDate, event.endDate);
  const startTime = formatTimeWithTimezone(event.startDate);

  // Determine the link for RSVP/More Info
  const rsvpLink = event.ctaUrl || event.url;

  return (
    <div className="mb-8 pb-8 border-b border-gray-700/20 last:border-b-0 last:mb-0 last:pb-0">
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-16">
          <div className="text-center bg-neutral-200 dark:bg-[#1A2942] rounded-lg overflow-hidden">
            <div className="bg-blue-500 dark:bg-blue-600 text-white text-xs uppercase py-1">
              {dateInfo.display.topLine}
            </div>
            <div className="text-xl font-bold py-2 text-gray-900 dark:text-white">
              {dateInfo.display.bottomLine}
            </div>
            {/* Show year range for multi-year events */}
            {dateInfo.isMultiDay && dateInfo.display.yearDisplay && (
              <div className="text-xs text-gray-600 dark:text-gray-400 pb-1">
                {dateInfo.display.yearDisplay}
              </div>
            )}
          </div>
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight">
            <a href={event.url} className="hover:underline">{event.name}</a>
          </h3>

          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium">Start:</span> {startTime} <span className="text-gray-300 dark:text-gray-600 mx-2">•</span> {duration}
          </div>

          {/* RSVP/More Info Button for Upcoming Events */}
          {isUpcoming && (
            <div className="mt-4">
              <a href={rsvpLink} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                RSVP / More Info
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const VanillaEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<FormattedEvent[]>([]);
  const [pastEvents, setPastEvents] = useState<FormattedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching events data...');
        const [upcoming, past] = await Promise.all([
          getUpcomingEvents(),
          getPastEvents()
        ]);
        console.log('Upcoming events:', upcoming);
        console.log('Past events:', past);

        setUpcomingEvents(upcoming);
        setPastEvents(past);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to fetch events');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Past Events */}
      <div className="bg-neutral-100 dark:bg-[#0A1628] rounded-xl shadow-md overflow-hidden mb-10 p-8">
        <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 sm:text-3xl mb-5">
          <span className="text-pink-500 dark:text-pink-400">Past</span> Events
        </h3>

        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-400"></div>
          </div>
        )}

        {error && (
          <div className="text-red-500 font-bold p-4 rounded bg-red-100">
            <p>Error: {error}</p>
          </div>
        )}

        {!isLoading && !error && pastEvents.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400">No past events found</p>
        )}

        {!isLoading && !error && pastEvents.map((event) => (
          <EventCard key={event.id} event={event} isUpcoming={false} />
        ))}

        {/* Follow-up Options */}
        <div className="mt-8">
          <div className="flex space-x-4">
            <a href="/event-recap" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Event Recaps
            </a>
            <a href="https://www.youtube.com/@SprykerSystems/videos" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Watch Recordings
            </a>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-neutral-100 dark:bg-[#0A1628] rounded-xl shadow-md overflow-hidden mb-10 p-8">
        <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 sm:text-3xl mb-5">
          <span className="text-blue-500 dark:text-blue-400">Upcoming</span> Events
        </h3>

        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-400"></div>
          </div>
        )}

        {error && (
          <div className="text-red-500 font-bold p-4 rounded bg-red-100">
            <p>Error: {error}</p>
          </div>
        )}

        {!isLoading && !error && upcomingEvents.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400">No upcoming events scheduled</p>
        )}

        {!isLoading && !error && upcomingEvents.map((event) => (
          <EventCard key={event.id} event={event} isUpcoming={true} />
        ))}
      </div>
    </div>
  );
};

export default VanillaEvents;
