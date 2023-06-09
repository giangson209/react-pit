import useOnClickOutside from '@/hooks/useOnClickOutside';
import { generateDate, months } from '@/utilities/calendar';
import cn from '@/utilities/cn';
import { formatTime } from '@/utilities/formatTime';
import dayjs, { Dayjs } from 'dayjs';
import { useRef, useState } from 'react';
import Svg from '../icon/svg';
import clsx from 'clsx';

type DateInputProps = {
  handleChooseDay: (date: Dayjs) => void;
  inputLabel: string;
};

const DateInput = ({ handleChooseDay, inputLabel }: DateInputProps) => {
  const currentDate = dayjs();
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState<Dayjs | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setShowCalendar(false));
  const selectedDay = selectDate && formatTime(selectDate.date());
  const selectedMonth = selectDate && formatTime(selectDate.month() + 1);
  const selectedYear = selectDate && selectDate.year();

  const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  return (
    <div ref={ref} className="w-full ">
      <div className="mb-2 text-base font-medium">
        {inputLabel}
        <span className="text-red-500"> *</span>
      </div>
      <div className="relative w-full" onClick={() => setShowCalendar(true)}>
        <input
          readOnly
          placeholder="dd/mm/yyyy"
          className="w-full cursor-pointer rounded-lg border border-neutral-300 bg-transparent p-4 text-base font-medium focus:border-neutral-800"
          value={selectDate ? `${selectedDay}/${selectedMonth}/${selectedYear}` : ''}
        />
        <button>
          <Svg
            src="/icons/line/calendar.svg"
            className={clsx(
              'absolute bottom-4 right-4 inline h-6 w-6 cursor-default hover:text-red-500',
              showCalendar ? 'text-red-500' : ''
            )}
          />
        </button>
      </div>

      {showCalendar && (
        <div className="absolute mt-2 w-max hidden md:block shadow-itel">
          <div className="relative z-10 flex w-full flex-col items-center justify-center gap-10 rounded-lg bg-neutral-0 px-6 py-8 shadow-md">
            <div className="w-full">
              <div className="flex items-center justify-between gap-4">
                <div className="mb-3 flex w-full cursor-pointer items-center justify-between gap-1 rounded-full p-2 hover:bg-neutral-100">
                  <button
                    className="flex h-8 w-8 rotate-180 cursor-pointer items-center justify-center"
                    onClick={() => {
                      setToday(today.year(today.year() - 1));
                    }}
                  >
                    <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2" />
                  </button>
                  <h1
                    className="text-base font-bold text-neutral-900"
                    onClick={() => {
                      setToday(currentDate);
                    }}
                  >
                    Năm {today.year()}
                  </h1>
                  <button
                    className="flex h-8 w-8 cursor-pointer items-center justify-center"
                    onClick={() => {
                      setToday(today.year(today.year() + 1));
                    }}
                  >
                    <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2" />
                  </button>
                </div>
                <div className="mb-3 flex w-full cursor-pointer items-center justify-between gap-1 rounded-full p-2 hover:bg-neutral-100">
                  <button
                    className="flex h-8 w-8 rotate-180 cursor-pointer items-center justify-center"
                    onClick={() => {
                      setToday(today.month(today.month() - 1));
                    }}
                  >
                    <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2" />
                  </button>
                  <h1
                    className="text-base font-bold text-neutral-900"
                    onClick={() => {
                      setToday(currentDate);
                    }}
                  >
                    {months[today.month()]}
                  </h1>
                  <button
                    className="flex h-8 w-8 cursor-pointer items-center justify-center"
                    onClick={() => {
                      setToday(today.month(today.month() + 1));
                    }}
                  >
                    <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2" />
                  </button>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                  return (
                    <h1 key={index} className="grid select-none place-content-center text-center text-base font-semibold text-[#6E797A]">
                      {day}
                    </h1>
                  );
                })}
              </div>
              <div className=" grid grid-cols-7 ">
                {generateDate(today.month(), today.year()).map(({ date, currentMonth }, index) => {
                  return (
                    <div key={index} className="grid h-10 place-content-center gap-4 p-2 text-center text-base font-semibold">
                      <h1
                        className={cn(
                          currentMonth ? '' : 'text-neutral-300',
                          selectDate && selectDate.toDate().toDateString() === date.toDate().toDateString()
                            ? 'bg-red-600 text-neutral-0'
                            : 'hover:border-red-600 hover:text-red-600',
                          'grid h-10 w-10 cursor-pointer select-none place-content-center rounded-full border border-transparent transition-all'
                        )}
                        onClick={() => {
                          setSelectDate(date);
                          setShowCalendar(false);
                          handleChooseDay(date);
                        }}
                      >
                        {date.date()}
                      </h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {showCalendar && (
        <div className="fixed bg-overlay-popup/[.5] inset-0 h-screen z-10 block md:hidden">
          <div className="px-4 py-6 bg-neutral-0 rounded-t-3xl absolute bottom-0 left-0 right-0">
            <div className="w-full flex justify-between items-center">
              <p className="font-bold text-xl text-neutral-800">Chọn ngày sinh</p>
              <button className="btn btn-ghost btn-circle btn-md" onClick={() => setShowCalendar(false)}>
                <Svg src="/icons/bold/cancel.svg" className="w-4 h-4" />
              </button>
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between gap-4">
                <div className="mb-3 flex w-full cursor-pointer items-center justify-between gap-1 rounded-full p-2 hover:bg-neutral-100">
                  <button
                    className="flex h-8 w-8 rotate-180 cursor-pointer items-center justify-center"
                    onClick={() => {
                      setToday(today.year(today.year() - 1));
                    }}
                  >
                    <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2" />
                  </button>
                  <h1
                    className="text-base font-bold text-neutral-900 whitespace-nowrap"
                    onClick={() => {
                      setToday(currentDate);
                    }}
                  >
                    Năm {today.year()}
                  </h1>
                  <button
                    className="flex h-8 w-8 cursor-pointer items-center justify-center"
                    onClick={() => {
                      setToday(today.year(today.year() + 1));
                    }}
                  >
                    <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2" />
                  </button>
                </div>
                <div className="mb-3 flex w-full cursor-pointer items-center justify-between gap-1 rounded-full p-2 hover:bg-neutral-100">
                  <button
                    className="flex h-8 w-8 rotate-180 cursor-pointer items-center justify-center"
                    onClick={() => {
                      setToday(today.month(today.month() - 1));
                    }}
                  >
                    <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2" />
                  </button>
                  <h1
                    className="text-base font-bold text-neutral-900"
                    onClick={() => {
                      setToday(currentDate);
                    }}
                  >
                    {months[today.month()]}
                  </h1>
                  <button
                    className="flex h-8 w-8 cursor-pointer items-center justify-center"
                    onClick={() => {
                      setToday(today.month(today.month() + 1));
                    }}
                  >
                    <Svg src="/icons/bold/right-arrow.svg" className="inline h-4 w-2" />
                  </button>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                  return (
                    <h1 key={index} className="grid select-none place-content-center text-center text-base font-semibold text-[#6E797A]">
                      {day}
                    </h1>
                  );
                })}
              </div>
              <div className=" grid grid-cols-7 ">
                {generateDate(today.month(), today.year()).map(({ date, currentMonth }, index) => {
                  return (
                    <div key={index} className="grid h-10 place-content-center gap-4 p-2 text-center text-base font-semibold">
                      <h1
                        className={cn(
                          currentMonth ? '' : 'text-neutral-300',
                          selectDate && selectDate.toDate().toDateString() === date.toDate().toDateString()
                            ? 'bg-red-600 text-neutral-0'
                            : 'hover:border-red-600 hover:text-red-600',
                          'grid h-10 w-10 cursor-pointer select-none place-content-center rounded-full border border-transparent transition-all'
                        )}
                        onClick={() => {
                          setSelectedDate(date);
                        }}
                      >
                        {date.date()}
                      </h1>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="w-full btn btn-primary btn-md rounded-full mt-5"
              onClick={() => {
                if (selectedDate) {
                  setSelectDate(selectedDate);
                  handleChooseDay(selectedDate);
                  setShowCalendar(false);
                }
              }}
            >
              Xác nhận
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateInput;
