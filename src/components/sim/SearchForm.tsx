import { formatTime } from '@/utilities/formatTime';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DateInput from '../form/DateInput';
import OptionInput from '../form/OptionInput';
import RadioInput from '../form/RadioInput';
import TextInput from '../form/TextInput';
import Svg from '../icon/svg';
import Tab from '../tabs/tabs';
import { SimQuery } from '@/constants/sim.constants';

export const bornTime = [
  { id: 1, label: 'Tý (23 giờ đêm - 1 giờ sáng)' },
  { id: 2, label: 'Sửu (1 giờ sáng - 3 giờ sáng)' },
  { id: 3, label: 'Dần (3 giờ sáng - 5 giờ sáng)' },
  { id: 4, label: 'Mão (5 giờ sáng - 7 giờ sáng)' },
  { id: 5, label: 'Thìn (7 giờ sáng - 9 giờ sáng)' },
  { id: 6, label: 'Tỵ (9 giờ sáng - 11 giờ sáng)' },
  { id: 7, label: 'Ngọ (11 giờ sáng - 13 giờ chiều)' },
  { id: 8, label: 'Mùi (13 giờ chiều - 15 giờ chiều)' },
  { id: 9, label: 'Thân (15 giờ chiều - 17 giờ chiều)' },
  { id: 10, label: 'Dậu (17 giờ chiều - 19 giờ tối)' },
  { id: 11, label: 'Tuất (19 giờ tối - 21 giờ tối)' },
  { id: 12, label: 'Hợi (21 giờ tối- 23 giờ đêm)' }
];

export type SearchFormTabItem = {
  id: SimQuery;
  label: string;
};

type SearchFormProps = {
  handleCloseModal?: () => void;
  isModal?: boolean;
  isSearchByNumerology?: boolean;
  tabs: SearchFormTabItem[];
};

const SearchForm = ({ handleCloseModal, isModal, isSearchByNumerology, tabs }: SearchFormProps) => {
  const [tabId, setTabId] = useState<SimQuery>(SimQuery.Basic);
  const [radioId, setRadioId] = useState<string>('');
  const [option, setOption] = useState<string>('');
  const [selectedDate, setSelectDate] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [name, setName] = useState<string>('');
  const router = useRouter();

  const simRateMode = tabId === SimQuery.MarkPhone;

  const handleClickOptionList = (choice: string) => {
    setOption(choice);
  };

  const handleSelectedDate = (date: Dayjs) => {
    const selectedDay = formatTime(date.date());
    const selectedMonth = formatTime(date.month() + 1);
    const selectedYear = date.year();
    setSelectDate(`${selectedDay}/${selectedMonth}/${selectedYear}`);
  };

  const handleSearchGeoSim = () => {
    void router.push({
      pathname: '/sim/geo-sim-result',
      query: {
        phoneNumber: `${phoneNumber}`,
        gender: `${radioId}`,
        option: `${option}`,
        date: `${selectedDate}`,
        mode: `${tabId}`
      }
    });
    if (isModal && handleCloseModal) {
      handleCloseModal();
    }
  };

  const handleSearchNumerologySim = () => {
    void router.push({
      pathname: '/sim/numerology-sim-result',
      query: {
        phoneNumber: `${phoneNumber}`,
        fullName: `${name}`,
        date: `${selectedDate}`,
        mode: `${tabId}`
      }
    });
    if (isModal && handleCloseModal) {
      handleCloseModal();
    }
  };

  return (
    <div className="relative h-full w-full rounded-t-2xl md:rounded-2xl bg-neutral-0 px-6 md:py-8 pt-2 pb-6">
      {isModal && (
        <div
          className="btn-tertiary btn btn-sm btn-circle absolute right-4 top-4 bg-neutral-100 hover:bg-neutral-300"
          onClick={handleCloseModal}
        >
          <Svg src="/icons/bold/cancel.svg" className="inline h-3 w-3" />
        </div>
      )}
      <div className="flex items-center justify-start">
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.label} onClick={() => setTabId(tab.id)} isActive={tabId === tab.id} size="large" />
        ))}
      </div>
      <div className="mb-6 w-full border-b border-b-neutral-300" />
      <div className="text-base font-normal text-neutral-700">{`${
        tabId === SimQuery.Basic
          ? `${
              !isSearchByNumerology
                ? 'Chia sẻ thông tin để iTel xem cho bạn một quẻ nào!'
                : 'Để tìm số đẹp, vui lòng điền đầy đủ các thông tin bên dưới'
            }`
          : 'Để chấm điểm sim, vui lòng điền đầy đủ các thông tin bên dưới'
      }`}</div>
      {!isSearchByNumerology && (
        <>
          <div className="mt-8 text-base font-medium text-neutral-700">
            Giới tính <span className="text-red-500">*</span>
          </div>
          <div className="mt-4 flex items-center justify-start gap-16">
            {['Nam', 'Nữ'].map((item, index) => (
              <RadioInput
                key={`item-${index}`}
                label={item}
                radioId={item}
                onChange={() => setRadioId(item)}
                isChecked={item === radioId}
              />
            ))}
          </div>
        </>
      )}
      <div className="mt-6">
        {simRateMode && (
          <TextInput
            inputLabel="Số điện thoại"
            placeholder="Nhập số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.currentTarget.value)}
          />
        )}
        <div className="mt-6">
          {isSearchByNumerology && (
            <TextInput inputLabel="Họ và tên" placeholder="Nhập họ và tên" value={name} onChange={(e) => setName(e.currentTarget.value)} />
          )}
        </div>
      </div>
      <div
        className={`${
          simRateMode && !isSearchByNumerology ? 'grid md:grid-cols-2 grid-cols-1 gap-4' : 'flex flex-col items-start gap-6'
        } mt-6`}
      >
        <DateInput inputLabel="Ngày sinh dương lịch" handleChooseDay={handleSelectedDate} />
        {!isSearchByNumerology && <OptionInput inputLabel="Giờ sinh" optionList={bornTime} handleChooseOption={handleClickOptionList} />}
      </div>
      <div className="mt-8 flex justify-center gap-6">
        <button
          onClick={isSearchByNumerology ? handleSearchNumerologySim : handleSearchGeoSim}
          className="btn-primary btn md:btn-lg btn-md md:w-[15.5rem] w-full rounded-full"
        >
          {simRateMode ? 'Chấm điểm sim' : `${isModal ? 'Tra cứu' : 'Chọn Sim hợp tuổi'} `}
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
