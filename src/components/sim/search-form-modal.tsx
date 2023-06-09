import { formatTime } from '@/utilities/formatTime';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DateInput from '../form/DateInput';
import OptionInput from '../form/OptionInput';
import RadioInput from '../form/RadioInput';
import TextInput from '../form/TextInput';
import Svg from '../icon/svg';
import Tab from '../tabs/tabs';
import { SearchFormTabItem, bornTime } from './SearchForm';
import { SimQuery } from '@/constants/sim.constants';

type SearchFormModalProps = {
  handleCloseModal?: () => void;
  isModal?: boolean;
  isSearchByNumerology?: boolean;
  tabs: SearchFormTabItem[];
};

const SearchFormModal = ({ tabs, handleCloseModal, isSearchByNumerology }: SearchFormModalProps) => {
  const [tabId, setTabId] = useState<SimQuery>(SimQuery.Basic);
  const [radioId, setRadioId] = useState<string>('');
  const [selectedDate, setSelectDate] = useState<string>('');
  const [option, setOption] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [name, setName] = useState<string>('');
  const router = useRouter();
  const isMark = tabId === SimQuery.MarkPhone;

  const handleSelectedDate = (date: Dayjs) => {
    const selectedDay = formatTime(date.date());
    const selectedMonth = formatTime(date.month() + 1);
    const selectedYear = date.year();
    setSelectDate(`${selectedDay}/${selectedMonth}/${selectedYear}`);
  };

  const handleClickOptionList = (choice: string) => {
    setOption(choice);
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
    if (handleCloseModal) {
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
    if (handleCloseModal) {
      handleCloseModal();
    }
  };

  return (
    <div className="bg-neutral-100 fixed inset-0 z-50 h-screen">
      <header className="sticky top-0 bg-neutral-0 py-4.5 z-10 ">
        <div className="container flex">
          <div className="flex-1">
            <button type="button" onClick={handleCloseModal}>
              <Svg src="/icons/line/close.svg" width={24} height={24} />
            </button>
          </div>
          <h2 className="flex-1 text-center text-[1.125rem]">
            <b>Đổi tra cứu</b>
          </h2>
          <div className="flex-1"></div>
        </div>
      </header>
      <div className="flex items-center justify-center bg-neutral-0 px-4">
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.label} onClick={() => setTabId(tab.id)} isActive={tabId === tab.id} size="large" />
        ))}
      </div>
      <div className="mt-2 bg-neutral-0 p-4 flex flex-col justify-between" style={{ height: 'calc(100% - 108px)' }}>
        <div className="overflow-auto h-4/5">
          <div className="text-base font-normal text-neutral-500 mb-8">Để tìm số đẹp, vui lòng điền đầy đủ các thông tin bên dưới</div>
          <div className="flex flex-col mt-4 gap-6">
            {!isSearchByNumerology && (
              <div>
                <div className="mb-3 text-base font-medium text-neutral-700">
                  Giới tính <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center justify-start gap-16">
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
              </div>
            )}

            {(isMark || isSearchByNumerology) && (
              <TextInput
                inputLabel="Số điện thoại"
                placeholder="Nhập số điện thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.currentTarget.value)}
              />
            )}
            {isSearchByNumerology && isMark && (
              <TextInput
                inputLabel="Họ và tên"
                placeholder="Nhập họ và tên"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            )}
            <DateInput inputLabel="Ngày sinh dương lịch" handleChooseDay={handleSelectedDate} />
            {!isSearchByNumerology && (
              <OptionInput inputLabel="Giờ sinh" optionList={bornTime} handleChooseOption={handleClickOptionList} />
            )}
          </div>
        </div>
        <div className="w-full px-1.5">
          <button
            className="btn-primary btn w-full rounded-full"
            onClick={isSearchByNumerology ? handleSearchNumerologySim : handleSearchGeoSim}
          >
            Chọn sim hợp tuổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFormModal;
